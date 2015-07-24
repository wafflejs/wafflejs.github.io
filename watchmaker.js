import React from 'react';
import { easingTypes, stackBehavior, Mixin } from 'react-tween-state';
import { map, omit, sample, merge, set } from 'lodash';

import Vector from './vector';
import Thing from './thing';
import Person from './person';

import ScaleDrone from './scaledrone';

import css from './watchmaker.css';

const names = [
  'bmo',
  'bubblegum',
  'finn',
  'gunter',
  'iceking',
  'jake',
  'lsp',
  'marceline',
];

const Watchmaker = React.createClass({
  mixins: [ Mixin ],
  
  getInitialState() {
    return {
      channel: new ScaleDrone('TIUMeTMyHoSaabvK'),
      people: {}
    };
  },

  componentDidMount() {
    this.state.channel.on('open', (err) => {
      if (err) return console.error(err);

      this.state.channel.subscribe('watchmaker').on('data', this.onMessage);
      this.announce();
      this.sweep();
    });

    window.addEventListener('click', this.onClick);
    window.addEventListener('touchend', this.onClick);
  },

  componentWillUnmount() {
    this.state.channel.close();

    clearTimeout(this.announceTimeout);
    clearTimeout(this.sweepTimeout);

    window.removeEventListener('click', this.onClick);
    window.removeEventListener('touchend', this.onClick);
  },

  onMessage(message) {
    switch (message.type) {
      case 'announce':
        message.person.ts = Date.now();
        this.setState({
          people: set(this.state.people, message.clientId, message.person)
        });
        break;
      case 'move':
        this.move(message.clientId, message.destination);
        break;
      default:
        console.log('unknown message type', message);
    }
  },

  onClick(e) {
    this.state.channel.publish({
      room: 'watchmaker',
      message: {
        type: 'move',
        clientId: this.state.channel.clientId,
        destination: new Vector(e).minus(new Vector(this.getDOMNode())),
      }
    });
  },

  announce() {
    const clientId = this.state.channel.clientId;
    this.state.channel.publish({
      room: 'watchmaker',
      message: {
        type: 'announce',
        clientId: clientId,
        person: merge({
          name: sample(names),
          direction: 'idle',
          x: Math.random() * 300,
          y: Math.random() * 300,
        }, this.state.people[clientId])
      }
    });

    this.announceTimeout = setTimeout(this.announce, 5000 + Math.random() * 2500);
  },

  sweep() {
    this.setState({
      people: omit(this.state.people, (person) => {
        return person.ts < Date.now() - 10000
      })
    });
    this.sweepTimeout = setTimeout(this.sweep, 5000);
  },

  move(id, destination) {
    destination = new Vector(destination);
    const current = new Vector(this.getTweeningValue(['people', id, 'x']),
                               this.getTweeningValue(['people', id, 'y']));
    const delta = destination.minus(current);
    const options = {
      duration: delta.length * 10,
      easing: easingTypes.linear,
      stackBehavior: stackBehavior.DESTRUCTIVE,
    }
    this.setState({
      people: set(this.state.people, `${id}.direction`, delta.cardinalDirection)
    });
    this.tweenState(['people', id, 'x'], merge({
      beginValue: this.getTweeningValue(['people', id, 'x']),
      endValue: destination.x,
    }, options));
    this.tweenState(['people', id, 'y'], merge({
      beginValue: this.getTweeningValue(['people', id, 'y']),
      endValue: destination.y,
    }, options));
  },

  render() {
    return (
      <div className="watchmaker">
        <Thing name="deadtree" x="60" y="240" />
        <Thing name="livetree" x="25" y="300" />
        <Thing name="livetree" x="45" y="400" />
        {map(this.state.people, (person, id) => {
          let x = this.getTweeningValue(['people', id, 'x']);
          let y = this.getTweeningValue(['people', id, 'y']);
          let direction = x === person.x && y === person.y ? 'idle' : person.direction
          return <Person key={id} name={person.name} x={x} y={y} direction={direction} width="196" />
        })}
      </div>
    );
  }
});

export default Watchmaker;

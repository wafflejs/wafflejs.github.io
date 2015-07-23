import React from 'react';
import { easingTypes, Mixin } from 'react-tween-state';
import { sample } from 'lodash';

import Vector from './vector';
import Thing from './thing';
import Person from './person';

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
    return { x: -40, y: 210, direction: 'idle', name: sample(names) };
  },

  componentDidMount() {
    window.addEventListener('click', this.onClick);
    window.addEventListener('touchend', this.onClick);
  },

  componentWillUnmount() {
    window.removeEventListener('click', this.onClick);
    window.removeEventListener('touchend', this.onClick);
  },

  onClick(e) {
    const origin = new Vector(this.getDOMNode());
    const destination = new Vector(e).minus(origin);
    const delta = destination.minus(new Vector(this.state));
    const duration = delta.length * 16;
    this.state.direction = delta.cardinalDirection;
    this.tweenState('x', {
      endValue: destination.x,
      duration: duration,
      easing: easingTypes.linear,
      onEnd: () => {
        if (this.state.tweenQueue.length === 2)
          this.state.direction = 'idle'
      }
    });
    this.tweenState('y', {
      endValue: destination.y,
      duration: duration,
      easing: easingTypes.linear,
    });
  },

  render() {
    let x = this.getTweeningValue('x');
    let y = this.getTweeningValue('y');
    return (
      <div className="watchmaker">
        <Thing name="deadtree" x="60" y="240" />
        <Thing name="livetree" x="25" y="300" />
        <Thing name="livetree" x="45" y="400" />
        <Person name={this.state.name} x={x} y={y} direction={this.state.direction} width="196" />
      </div>
    );
  }
});

export default Watchmaker;

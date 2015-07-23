import React from 'react';
import Vector from './vector';
import Thing from './thing';
import Person from './person';
import { easingTypes, Mixin } from 'react-tween-state';
import css from './watchmaker.css';

const Watchmaker = React.createClass({
  mixins: [ Mixin ],
  
  getInitialState() {
    return { x: 0, y: 2520, direction: 'idle' };
  },

  componentDidMount() {
    window.addEventListener('click', this.onClick);
  },

  componentWillUnmount() {
    window.removeEventListener('click', this.onClick);
  },

  onClick(e) {
    const delta = (new Vector(e)).minus(new Vector(this.state));
    const duration = delta.length * 8;
    this.state.direction = delta.cardinalDirection;
    this.tweenState('x', { endValue: e.pageX, duration: duration, easing: easingTypes.linear, onEnd: () => { this.state.direction = 'idle' } });
    this.tweenState('y', { endValue: e.pageY, duration: duration, easing: easingTypes.linear });
  },

  render() {
    let x = this.getTweeningValue('x');
    let y = this.getTweeningValue('y');
    return (
      <div className="watchmaker">
        <Thing name="livetree" x="70" y="2600" />
        <Thing name="deadtree" x="140" y="2480" />
        <Thing name="livetree" x="110" y="2800" />
        <Person name="iceking" x={x} y={y} direction={this.state.direction} width="196" />
      </div>
    );
  }
});

export default Watchmaker;

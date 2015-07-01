import React from 'react';
import Vector from './vector';
import Thing from './thing';
import Person from './person';

const Watchmaker = React.createClass({
  mixins: [ require('react-tween-state').Mixin ],
  
  getInitialState() {
    return { x: 400, y: 540, direction: 'idle' };
  },
  
  onClick(e) {
    const delta = (new Vector(e.nativeEvent)).minus(new Vector(this.state));
    this.state.direction = delta.cardinalDirection;
    this.tweenState('x', { duration: delta.length * 10, endValue: e.nativeEvent.pageX, onEnd: () => { this.state.direction = 'idle' } });
    this.tweenState('y', { duration: delta.length * 10, endValue: e.nativeEvent.pageY });
  },
  
  render() {
    let x = this.getTweeningValue('x');
    let y = this.getTweeningValue('y');
    return (
      <div className="watchmaker" onClick={this.onClick}>
        <Thing name="livetree" x="20" y="1800" />
        <Thing name="deadtree" x="90" y="1680" />
        <Thing name="livetree" x="60" y="2000" />
        <Person name="iceking" x={x} y={y} direction={this.state.direction} width="196" />
      </div>
    );
  }
});

export default Watchmaker;

import React from 'react';
import Thing from './thing';
import Person from './person';

class Watchmaker extends React.Component {
  render() {
    return (
      <div className="watchmaker">
        <Thing name="livetree" x="20" y="1800" />
        <Thing name="deadtree" x="90" y="1680" />
        <Thing name="livetree" x="60" y="2000" />
        <Person name="littleguy" x="400" y="540" />
      </div>
    );
  }
}

export default Watchmaker;

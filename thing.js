import React from 'react';
import cx from 'classnames';
import Vector from './vector';

class Thing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pos: new Vector(props),
      size: new Vector(props.size/2)
    };

    this.img = new Image();
    this.img.src = `/images/${props.name}.png`;
    this.img.onload = (event) => {
      let img = event.target;
      this.setState({ size: new Vector(img.width/2, img.height/2) });
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ pos: new Vector(nextProps) });
  }

  get styles() {
    let offset = new Vector(-this.state.size.x/2, -this.state.size.y+20);
    let transform = `translate(${offset})`;
    return {
      background: `url(${this.img.src})`,
      backgroundSize: 'auto 100%',
      position: 'absolute',
      left: this.state.pos.x,
      top: this.state.pos.y,
      width: this.state.size.x,
      height: this.state.size.y,
      zIndex: Math.floor(this.state.pos.y),
      msTransform: transform,
      MozTransform: transform,
      WebkitTransform: transform,
      transform: transform,
    };
  }

  render() {
    let classes = cx('thing', this.props.name);

    return (
      <div className={classes} style={this.styles} />
    );
  }
}

export default Thing;

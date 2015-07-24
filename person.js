import Vector from './vector'
import Thing from './thing'
import { merge } from 'lodash';

const frameOffset = { w: 0, e: 2, s: 4, n: 6, idle: 8 };

class Person extends Thing {
  constructor(props) {
    super(props);

    this.state.frame = 0;

    this.img.onload = (event) => {
      const width = props.width || 80;
      this.setState({
        size: new Vector(width/2, event.target.height/2),
        idleFrames: (event.target.width - (width*8)) / width
      });
      this.animate();
    };

    this.animate = this.animate.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.animateTimeout);
  }

  get frames() {
    return this.props.direction === 'idle' ? this.state.idleFrames : 2;
  }

  get styles() {
    const frame = frameOffset[this.props.direction] + (this.state.frame % this.frames);
    return merge(super.styles, {
      backgroundPosition: `-${frame * this.state.size.x}px 0`,
    });
  }

  animate() {
    this.setState({ frame: (this.state.frame + 1) % this.frames });
    this.animateTimeout = setTimeout(this.animate, 400);
  }
}

export default Person;

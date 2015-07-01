import Vector from './vector'
import Thing from './thing'

const frameOffset = { w: 0, e: 2, s: 4, n: 6, idle: 8 };

class Person extends Thing {
  constructor(props) {
    super(props);

    this.frame = 0;
    this.state.frame = frameOffset.idle + this.frame;

    this.img.onload = (event) => {
      const width = props.width || 80;
      this.setState({
        size: new Vector(width, event.target.height),
        idleFrames: (event.target.width - (width*8)) / width
      });
      this.animate();
    };
  }

  animate() {
    const frames = this.props.direction === 'idle' ? this.state.idleFrames : 2;
    this.frame = (this.frame + 1) % frames;
    this.setState({
      frame: frameOffset[this.props.direction] + this.frame
    });
    setTimeout(this.animate.bind(this), 400);
  }
}

export default Person;

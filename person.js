import Vector from './vector'
import Thing from './thing'

const frameOffset = { w: 0, e: 2, s: 4, n: 6, idle: 8 };

class Person extends Thing {
  constructor(props) {
    super(props);

    this.state.frame = 8;
    this.state.direction = 'idle';

    this.img.onload = (event) => {
      this.setState({ size: new Vector(80, event.target.height) });
      this.animate();
    };
  }

  animate() {
    this.setState({ frame: this.state.frame === 8 ? 9 : 8 });
    setTimeout(this.animate.bind(this), 400);
  }
}

export default Person;

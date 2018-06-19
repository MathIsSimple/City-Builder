class Train {
  constructor(x, y) {
    this.position = new p5.Vector(x, y); this.velocity = new p5.Vector(1, 0);
  }
  render() {
    image(train_img, camera.getx(this.position.x), camera.gety(this.position.y), 2.5*scl, scl);
  }
  update() {
    this.position.add(this.velocity);
    if(this.position.x <= -50*5 || this.position.x + 2.5*scl >= 1000+5*50) {this.velocity.mult(-1);}
  }
}

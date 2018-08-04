class Particle {
  constructor(x, y, hu, seed) {
    this.pos = createVector(x, y);
    this.seed = seed;
    this.lifespan = 255;
    this.hu = hu;
    if (this.seed) {
      this.vel = createVector(0, random(-20, -12));
    } else {
      this.vel = p5.Vector.random2D();
      if (this.vel.y >= 0) {
        this.vel.y = -this.vel.y;
      }
      this.vel.mult(random(0, 8));
    }
    this.acc = createVector(0, 0);
  }
  done() {
    if (this.lifespan <= 0) {
      return true;
    } else {
      return false;
    }
  }
  applyForce(force) {
    this.acc.add(force);
  }
  update() {
    if (!this.seed) {
      // this.vel.mult(0.95);
      if (this.lifespan >= 0) {
        this.lifespan -= 5;
      }
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  show() {
    if (!this.seed) {
      strokeWeight(2);
      stroke(this.hu, 255, 255, this.lifespan);
    } else {
      strokeWeight(4);
      stroke(this.hu, 255, 255);
    }
    point(this.pos.x, this.pos.y);
  }
}
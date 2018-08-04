class Firework {
  constructor() {
    this.hu = random(255);
    this.oneof = new Particle(random(width), height, this.hu, true);
    this.exploded = false;
    this.other = [];
  }
  show() {
    if (!this.exploded) {
      this.oneof.show();
    } else {
      for (let each of this.other) {
        each.show();
      }
    }
  }
  done() {
    if (this.exploded && this.other.length == 0) {
      return true;
    } else {
      return false;
    }
  }
  explode() {
    for (let i = 0; i < 100; i++) {
      let after = new Particle(this.oneof.pos.x, this.oneof.pos.y, this.hu, false);
      this.other.push(after);
    }
  }
  update() {
    if (!this.exploded) {
      this.oneof.applyForce(gravity);
      this.oneof.update();
      if (this.oneof.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    } else {
      for (let i = this.other.length - 1; i >= 0; i--) {
        this.other[i].applyForce(gravity);
        this.other[i].update();
        if (this.other[i].done()) {
          this.other.splice(i, 1);
        }
      }
    }
  }
}
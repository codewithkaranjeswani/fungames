class Blob {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.radius = 40;
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(10, 15));
  }
  show() {
    noFill();
    stroke(0);
    strokeWeight(2);
    ellipse(this.pos.x, this.pos.y, this.radius * 2);
  }
  update() {
    this.pos.add(this.vel);
    if (this.pos.x >= width - this.radius - 5 || this.pos.x <= this.radius + 5) {
      this.vel.x = -this.vel.x;
      if (this.pos.x >= width - this.radius - 5) {
        this.pos.x = width - this.radius - 5;
      }
      if (this.pos.x <= this.radius + 5) {
        this.pos.x = this.radius + 5;
      }
    }
    if (this.pos.y >= height - this.radius - 5 || this.pos.y <= this.radius + 5) {
      this.vel.y = -this.vel.y;
      if (this.pos.y >= height - this.radius - 5) {
        this.pos.y = height - this.radius - 5;
      }
      if (this.pos.y <= this.radius + 5) {
        this.pos.y = this.radius + 5;
      }
    }
  }
}
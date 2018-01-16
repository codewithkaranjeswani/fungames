class Ant {
  constructor(position) {
    this.x = position;
    this.xspeed = 0;
  }
  colour(codered, codeblue, codegreen)
  {
    this.codered = codered;
    this.codeblue = codeblue;
    this.codegreen = codegreen;

  }
  provide_speeds() {
    if (random(1) < 0.5)
      this.xspeed = -0.5;
    else {
      this.xspeed = 0.5;
    }
  }
  pleaseappear() {
    stroke(this.codered, this.codeblue, this.codegreen);
    line(this.x, 200, this.x, 100);
  }
  pleasemove() {
    this.x = this.x + this.xspeed;
  }
  pos_x() {
    return this.x;
  }
  reverse_speed() {
    this.xspeed = -this.xspeed;
  }
}

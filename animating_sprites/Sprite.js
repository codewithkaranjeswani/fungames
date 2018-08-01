class Sprite {
  constructor(speed, pos, animation) {
    this.speed = speed;
    this.animation = animation;
    this.index = 0;
    this.pos = pos;
  }

  show() {
    let i = floor(this.index) % this.animation.length;
    image(this.animation[i], this.pos.x, this.pos.y);
  }
  update() {
    this.index += this.speed;
    this.pos.x += this.speed * 15;

    if (this.pos.x > width) {
      this.pos.x = -this.animation[0].width;
    }
  }
}
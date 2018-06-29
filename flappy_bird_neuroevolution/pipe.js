class Pipe {
  constructor() {
    this.gap = 125 + random(-height / 30, height / 30);
    this.ytop = random(height / 6, 4 * height / 6);
    this.ybottom = this.ytop + this.gap;
    if (this.ybottom > height - 2 * BORDER) {
      this.ybottom = height - 2 * BORDER;
    }
    this.thick = width / 10;
    this.speed = 5;
    this.x = width + this.thick;
  }

  show() {
    fill(100, 255, 100, 100);
    noStroke();
    rect(this.x, BORDER, this.thick, this.ytop);
    rect(this.x, this.ybottom + BORDER, this.thick, height - this.ybottom - 2 * BORDER);
  }

  update() {
    this.x -= this.speed;
  }

  collides(birdy) {
    if (birdy.x <= birdy.size / 2 + BORDER) {
      birdy.x = birdy.size / 2 + BORDER;
      return true;
    }
    if (birdy.x >= width - birdy.size / 2 - BORDER) {
      birdy.x = width - birdy.size / 2 - BORDER;
      birdy.speed = 0;
      return true;
    }
    if (birdy.y <= birdy.size / 2 + BORDER) {
      birdy.y = birdy.size / 2 + BORDER;
      birdy.speed = 0;
      return true;
    }
    if (birdy.y >= height - birdy.size / 2 - BORDER) {
      birdy.y = height - birdy.size / 2 - BORDER;
      birdy.speed = 0;
      return true;
    }

    let d = this.x - birdy.x;
    if (d < birdy.size / 2 && (birdy.y - birdy.size / 2 <= this.ytop + BORDER ||
        birdy.y + birdy.size / 2 >= this.ybottom + BORDER)) {
      // birdy.x = this.x - birdy.size / 2;
      return true;
    } else {
      return false;
    }
  }
}
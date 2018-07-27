class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.col = true; // true: white, false: black
  }

  show() {
    // stroke(0);
    noStroke();
    if (this.col) {
      // fill(255);
    } else {
      fill(51);
      // noFill();
      ellipseMode(CORNER);
      ellipse(this.i * b + 5, this.j * h + 5, b, h);
    }
    // ellipse(this.i * b + 5, this.j * h + 5, b, h);
  }
}

class Ant {
  constructor(i, j) {
    this.pos = createVector(i, j)
    this.angle = PI; // initial direction (0, 1, 2, 3): (0, 90, 180, 270).
  }
  move() {
    let i = this.pos.x;
    let j = this.pos.y;
    let currentAngle = this.angle;
    if (grid[i][j].col) {
      // if cell color == white
      this.angle = this.angle - PI / 2;
      if (this.angle < 0) {
        this.angle += TWO_PI;
      }
      // console.log(this.angle * 180 / PI);
    } else {
      // if cell color == black
      this.angle = this.angle + PI / 2;
      if (this.angle > TWO_PI) {
        this.angle -= TWO_PI;
      }
      // console.log(this.angle * 180 / PI);
    }
    grid[i][j].col = !grid[i][j].col;

    if (this.angle == 0 || this.angle == TWO_PI) {
      // move right
      this.pos.x = (i + 1 + cols) % cols;
    } else if (this.angle == PI) {
      // move left
      this.pos.x = (i - 1 + cols) % cols;
    } else if (this.angle == 3 * PI / 2) {
      // move down
      this.pos.y = (j - 1 + rows) % rows;
    } else if (this.angle == PI / 2) {
      // move up
      this.pos.y = (j + 1 + rows) % rows;
    } else {
      console.log("error, value of this.angle is not 0, PI / 2, PI, 3 * PI / 2 or TWO_PI");
    }
  }
  show() {
    fill(150, 0, 200);
    noStroke();
    ellipse(this.pos.x * b + 5 + b / 2, this.pos.y * h + 5 + h / 2, b, h);
  }
}
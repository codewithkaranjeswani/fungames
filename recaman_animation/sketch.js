let sequence, arcs;
let index, check, count;
let angle, animationIndex;

class Arc {
  constructor(start, end, dir) {
    this.start = start;
    this.end = end;
    this.dir = dir;
  }

  show(angle) {
    let diameter = abs(this.end - this.start);
    noFill();
    stroke(255);
    strokeWeight(1);
    if (this.dir) {
      // draw on the bottom
      if (this.end > this.start) {
        // CCW direction
        arc((this.start + this.end) / 2, 0, diameter, diameter, 180, 180 + angle);
      } else {
        // CW direction
        translate((this.start + this.end) / 2, 0);
        scale(-1, 1);
        translate(-(this.start + this.end) / 2, 0);
        arc((this.start + this.end) / 2, 0, diameter, diameter, 180, 180 + angle);
        translate((this.start + this.end) / 2, 0);
        scale(-1, 1);
        translate(-(this.start + this.end) / 2, 0);
      }
    } else {
      // draw on the top
      if (this.end > this.start) {
        // CW direction
        translate((this.start + this.end) / 2, 0);
        scale(-1, 1);
        translate(-(this.start + this.end) / 2, 0);
        arc((this.start + this.end) / 2, 0, diameter, diameter, 0, angle);
        translate((this.start + this.end) / 2, 0);
        scale(-1, 1);
        translate(-(this.start + this.end) / 2, 0);
      } else {
        // CCW direction
        arc((this.start + this.end) / 2, 0, diameter, diameter, 0, angle);
      }
    }
  }
  completeArc() {
    let diameter = abs(this.end - this.start);
    noFill();
    stroke(255);
    strokeWeight(1);
    if (this.dir) {
      arc((this.start + this.end) / 2, 0, diameter, diameter, 180, 360);
    } else {
      arc((this.start + this.end) / 2, 0, diameter, diameter, 0, 180);
    }
  }

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  angleMode(DEGREES);
  arcs = [];
  sequence = [];
  check = [];
  index = 0; // value of the sequence
  count = 1;
  check[index] = true;
  sequence.push(index);
  animationIndex = 0;
  angle = 0;
  while (true) {
    step();
    if (index >= width) {
      break;
    }
  }
}

function step() {
  // generate the sequence
  let next = index - count * 10;
  if (next < 0 || check[next]) {
    next = index + count * 10;
  }
  sequence.push(next / 10);
  check[next] = true;

  let a = new Arc(index, next, count % 2);
  arcs.push(a);
  index = next;
  count++;
}

function draw() {
  background(0);
  translate(10, height / 2);
  scale(1, -1);

  // animating the arcs
  for (let i = 0; i < animationIndex; i++) {
    arcs[i].completeArc();
  }
  angle += 10;
  arcs[animationIndex].show(angle);
  if (angle >= 180) {
    angle = 0;
    animationIndex++;
  }
  if (animationIndex >= arcs.length - 1) {
    noLoop();
  }
  // drawing the number line
  translate(-10, 0);
  stroke(150, 100);
  strokeWeight(1);
  line(0, 0, width, 0);
  stroke(255, 100);
  strokeWeight(4);
  for (let i = 1; i < width; i++) {
    point(i * 10, 0);
  }
}
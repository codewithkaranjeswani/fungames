let sequence;
let index;
let count;
let check;
let biggest;
let scl;
let arcs;

class Arc {
  constructor(start, end, dir) {
    this.start = start;
    this.end = end;
    this.dir = dir;
  }

  show() {
    let diameter = abs(this.end - this.start);
    noFill();
    stroke(255);
    strokeWeight(2 / scl);
    if (this.dir == 0) {
      arc((this.start + this.end) / 2, 0, diameter, diameter, PI, 0);
    } else {
      arc((this.start + this.end) / 2, 0, diameter, diameter, 0, PI);
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  sequence = [];
  check = [];
  count = 1; // increments by 1 every step
  index = 0; // value of the sequence
  arcs = [];
  biggest = 0;
  scl = 0;
  sequence.push(index);
  check[index] = true;
}

function step() {
  // generate the sequence
  let next = index - count;
  if (next < 0 || check[next]) {
    next = index + count;
  }
  sequence.push(next);
  check[next] = true;

  let a = new Arc(index, next, count % 2);
  arcs.push(a);
  index = next;
  if (index > biggest) {
    biggest = index;
  }
  count++;
}

function mousePressed() {
  noLoop();
}

function draw() {
  step();
  background(0);
  translate(50, height - 150);
  scale(1, -1);
  scl = lerp(scl, width / (biggest), 0.5);
  scale(scl);

  rotate(atan((height - 300) / width));
  for (a of arcs) {
    a.show();
  }
  // draw 1/ 4th  of the last arc
  let dia = arcs[arcs.length - 1].start - arcs[arcs.length - 1].end;
  let x = (arcs[arcs.length - 1].start + arcs[arcs.length - 1].end) / 2;
  noFill();
  stroke(255, 0, 100);
  strokeWeight(1 / scl);
  if (arcs[arcs.length - 1].dir == 0) {
    arc(x, 0, dia, dia, PI, PI / 4);
  } else {
    arc(x, 0, dia, dia, 0, PI / 4);
  }

  // if (count > windowWidth) {
  //   noLoop();
  // }
}
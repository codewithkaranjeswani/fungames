let r1 = 180;
let r2 = 180;
let a1 = 0;
let a2 = 0;
let x1, x2, px2, y1, y2, py2;
let angVel1 = 0;
let angVel2 = 0;
let m1 = 10;
let m2 = 10;
let m = 10;
let g = 1;
let history = [];
// let buffer;

function setup() {
  createCanvas(1366, 768);
  a1 = PI / 2;
  a2 = PI / 2;
  buffer = createGraphics(width, height);
  buffer.background(0);
  buffer.translate(width / 2, height / 2);
}

function draw() {
  background(0);
  // imageMode(CORNER);
  // image(buffer, 0, 0, width, height);

  translate(width / 2, height / 2);
  let denom = 2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2);
  let angAcc1 = (-g * (2 * m1 + m2) * sin(a1) - m2 * g * sin(a1 - 2 * a2) - 2 * m2 * sin(a1 - a2) * (angVel2 * angVel2 * r2 + angVel1 * angVel1 * r1 * cos(a1 - a2))) / (r1 * denom);
  let angAcc2 = (2 * sin(a1 - a2) * (angVel1 * angVel1 * r1 * (m1 + m2) + g * (m1 + m2) * cos(a1) + angVel2 * angVel2 * r2 * m2 * cos(a1 - a2))) / (r2 * denom);

  angVel1 += angAcc1;
  angVel2 += angAcc2;

  // angVel1 *= 0.999;
  // angVel2 *= 0.999;

  a1 += angVel1;
  a2 += angVel2;

  x1 = r1 * sin(a1);
  y1 = r1 * cos(a1);

  x2 = x1 + r2 * sin(a2);
  y2 = y1 + r2 * cos(a2);

  let v = createVector(x2, y2);
  history.push(v);

  noFill();
  stroke(90, 190, 255, 200);
  beginShape();
  for (let i = 0; i < history.length - 1; i++) {
    vertex(history[i].x, history[i].y);
  }
  endShape();

  // buffer.stroke(90, random(190, 255), 255);
  // buffer.strokeWeight(2);
  // if (frameCount > 1) {
  //   buffer.line(px2, py2, x2, y2);
  // }

  // px2 = x2;
  // py2 = y2;
  // if (history.length > 700) {
  //   history.splice(0, 1);
  // }

  stroke(0, 255, 200, 200);
  strokeWeight(2);
  line(0, 0, x1, y1);
  line(x1, y1, x2, y2);
  fill(255);
  ellipse(0, 0, m, m)
  ellipse(x1, y1, m1, m1);
  ellipse(x2, y2, m2, m2);
}

// function mousePressed() {
//   fullscreen(true);
// }
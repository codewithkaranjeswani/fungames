// p5.js bug!!!, buffer.translate does not work!!!! {where buffer is a p5.Graphics object}
let r1, r2, a1, a2, x1, x2, y1, y2, angVel1, angVel2, m1, m2, m, g;
let prev, buffer;

function setup() {
  createCanvas(1536, 860);
  background(0);

  buffer = createGraphics(width, height);

  r1 = 180, r2 = 180;
  x1 = r1, x2 = r1 + r2, y1 = 0, y2 = 0;
  angVel1 = 0, angVel2 = 0;
  m1 = 10, m2 = 10;
  m = 10;
  a1 = PI / 2, a2 = PI / 2;
  g = 1;
  prev = createVector(x2, y2);
}

function draw() {
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

  background(0);

  // buffer.translate(width / 2, height / 2);
  // can't use buffer.translate function // bug!!!!
  x2 += width / 2;
  y2 += height / 2;
  prev.x += width / 2;
  prev.y += height / 2;

  buffer.strokeWeight(3);
  buffer.stroke(0, 200, 255);
  buffer.line(prev.x, prev.y, x2, y2);

  prev.x -= width / 2;
  prev.y -= height / 2;
  x2 -= width / 2;
  y2 -= height / 2;
  // remember the buffer is transparent, it does not have any background!
  image(buffer, 0, 0);

  translate(width / 2, height / 2);

  stroke(200, 100, 20);
  strokeWeight(2);
  line(0, 0, x1, y1);
  line(x1, y1, x2, y2);
  fill(255);
  ellipse(0, 0, m, m)
  ellipse(x1, y1, m1, m1);
  ellipse(x2, y2, m2, m2);

  translate(-width / 2, -height / 2);

  prev.set(x2, y2);
}

function keyPressed() {
  let once = true;
  if (key == ' ' && once) {
    loop();
    once = !once;
  } else if (key == 'c' || key == 'C') {
    noLoop();
    once = !once;
  }
}

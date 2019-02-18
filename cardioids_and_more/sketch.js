let points, r, theta, dtheta, n, nSlider, index;

function setup() {
  createCanvas(1535, 750);
  background(200);
  points = [];
  r = 350;
  nSlider = createSlider(10, 500, 160);
  nSlider.position(80, height - 70);
  index = 0;
  frameRate(20);
}

function draw() {
  theta = 0; // angle is in radians by default
  n = nSlider.value(); // number of points
  dtheta = TWO_PI / n;
  index += 1;
  if (index % 100 == 0) {
    setTimeout(1000);
    console.log("here" + index % n);
    for (let i = 0; i < 7e08; i++) {}
  }
  let count = 0;
  points = [];
  for (theta = 0; theta < TWO_PI; theta += dtheta, count++) {
    let x = r * cos(theta);
    let y = r * sin(theta);
    points.push(new Point(x, y));
  }

  background(200);

  stroke(0);
  strokeWeight(3);
  noFill();
  rect(75, height - 72, 140, 30);
  textSize(20);
  textAlign(CENTER, CENTER);
  strokeWeight(1);
  stroke(0);
  fill(0);
  text(n, 210, height - 92);
  text("Number of points : ", 100, height - 92);

  stroke(51);
  strokeWeight(1);
  line(0, height / 2, width, height / 2);
  line(width / 2, 0, width / 2, height);
  textAlign(CENTER, CENTER);
  textSize(10);
  noFill();
  text("X - axis", width - 20, height / 2 - 10);
  push();
  translate(width / 2, height / 2);
  rotate(-PI / 2);
  text("Y - axis", height / 2 - 20, -10);
  pop();

  translate(width / 2, height / 2);
  stroke(100, 20, 200);
  noFill();
  strokeWeight(2);
  circle(0, 0, r);

  strokeWeight(8);
  for (one of points) {
    one.show();
  }

  strokeWeight(1);

  for (let i = 0; i < n; i++) {
    let a = getV(i);
    let b = getV((i * index / 100) % n);
    line(a.x, a.y, b.x, b.y);
  }
}

function getV(i) {
  let angle = i * TWO_PI / n;
  let x = r * cos(angle);
  let y = r * sin(angle);
  let ans = createVector(x, y);
  return ans;
}

function keyPressed() {
  if (key == 'r' || key == 'R') {
    loop();
  } else if (key == 's' || key == 'S' || key == ' ') {
    noLoop();
  }
}
let points;
let current;
const sc = 10;

function setup() {
  createCanvas(500, 500);
  background(51);
  points = [];

  points[0] = createVector(sc, height - sc);
  points[1] = createVector(width - sc, height - sc);
  points[2] = createVector(width / 2, sc);
  current = createVector(floor(random(sc, width - sc)), floor(random(sc, height - sc)));

  stroke(255);
  strokeWeight(4);
  // for (let i = 0; i < points.length; i++) {
  //   point(points[i].x, points[i].y);
  // }

  for (one of points) {
    point(one.x, one.y);
  }
}

function draw() {
  for (let i = 0; i < 1000; i++) {
    let r = floor(random(3));
    if (r == 0) {
      current.x = lerp(current.x, points[0].x, 0.5);
      current.y = lerp(current.y, points[0].y, 0.5);
      stroke(255, 0, 255);
    } else if (r == 1) {
      current.x = lerp(current.x, points[1].x, 0.5);
      current.y = lerp(current.y, points[1].y, 0.5);
      stroke(0, 255, 255);
    } else if (r == 2) {
      current.x = lerp(current.x, points[2].x, 0.5);
      current.y = lerp(current.y, points[2].y, 0.5);
      stroke(0, 255, 0);
    } else {
      console.log("Error, value of r is not 0,1,2; r = " + r);
    }
    point(current.x, current.y);
  }
}
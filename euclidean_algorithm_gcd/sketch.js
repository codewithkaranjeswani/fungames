// euclidean algorithm
let x, y;

function setup() {
  createCanvas(400, 400);
  // x = floor(width / 3) + floor((width / 3) * Math.random());
  // y = floor(height / 3) + floor((height / 3) * Math.random());
  x = 17 * 12;
  y = 17 * 7;
  console.log(x, y);
  background(51);
  EuclideangcdVisualised(x, y);
}

// Euclidean algorithm
function Eucildeangcd(a, b) {
  a = abs(a);
  b = abs(b);
  while (a > 0 && b > 0) {
    if (a > b) {
      a = a % b;
    } else {
      b = b % a;
    }
  }
  return a != 0 ? a : b;
}

// Recursive method
function Anothergcd(a, b) {
  a = abs(a);
  b = abs(b);
  return a == 0 ? b : Anothergcd(a, b);
}

// if you divide the rectangle formed by the 2 numbers
// into minimum number of squares, then
// the size of the smallest square will be the gcd
function EuclideangcdVisualised(a, b) {
  translate(0, height);
  scale(1, -1);
  rectMode(CORNER);
  strokeWeight(2);
  stroke(0);
  noFill();
  translate(width / 2 - a / 2, height / 2 - b / 2);
  rect(0, 0, a, b);

  while (a > 0 && b > 0) {
    if (a > b) {
      let color = new Array(3);
      for (let i = 0; i < color.length; i++) {
        color[i] = ceil(255 * Math.random());
      }
      noStroke();
      fill(color[0], color[1], color[2]);
      rect(0, 0, b, b);
      translate(b, 0);
      a = a - b;
    } else {
      let color = new Array(3);
      for (let i = 0; i < color.length; i++) {
        color[i] = ceil(255 * Math.random());
      }
      noStroke();
      fill(color[0], color[1], color[2]);
      rect(0, 0, a, a);
      translate(0, a);
      b = b - a;
    }
  }
  console.log(b != 0 ? b : a);
}
let count = 0;
let condition = [];

function drawCircles() {

  let w = width / 11;
  noStroke();
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      fill(255);
      ellipse(i * w, j * w, w - 10, w - 10);
    }
  }
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      textAlign(CENTER);
      textSize(20);
      fill(100, 90, 255);
      text((j - 1) * 10 + i, i * w, j * w + 8);
    }
  }
}

function setup() {
  createCanvas(600, 600);
  background(51);
  drawCircles();
  for (let i = 1; i <= 100; i++) {
    condition[i] = true;
  }
  frameRate(0.5);
}

function flipmultiplesof(y) {
  let w = width / 11;
  noStroke();
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      if (((j - 1) * 10 + i) % y == 0) {
        if (condition[((j - 1) * 10 + i)]) {
          fill(0);
          condition[((j - 1) * 10 + i)] = false;
          ellipse(i * w, j * w, w - 10, w - 10);
        } else {
          fill(255);
          condition[((j - 1) * 10 + i)] = true;
          ellipse(i * w, j * w, w - 10, w - 10);
        }
      }
    }
  }
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      textAlign(CENTER);
      textSize(20);
      fill(100, 90, 255);
      text((j - 1) * 10 + i, i * w, j * w + 8);
    }
  }
}

function draw() {
  count++;
  for (let i = 2; i <= 100; i++) {
    if (count == i) {
      flipmultiplesof(i);
    }
  }
}

// function mousePressed() {
//   redraw();
// }

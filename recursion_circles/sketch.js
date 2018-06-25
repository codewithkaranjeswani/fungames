// how do I get the perpetual zoom!
let going;
let value;
let val;

function setup() {
  createCanvas(1536, 860);
  // dia = 300;
  going = 300;
  value = true;
  val = 1;
  m = 0;
}

function draw() {
  background(0);
  push();
  DrawCircle(width / 2, height / 2, going);
  if (value) {
    going += 50;
    if (going > 2 * width) {
      going = going / 2;
    }
  }
}

function keyPressed() {
  if (key == ' ') {
    if (value == true) {
      value = false;
    } else {
      value = true;
    }
  }
}

function DrawCircle(x, y, dia) {
  stroke(255);
  noFill();
  if (dia > 2) {
    if (dia < width) {
      ellipse(x, y, dia);
      DrawCircle(x + 0.5 * dia, y, 0.5 * dia);
      DrawCircle(x - 0.5 * dia, y, 0.5 * dia);
      // DrawCircle(x, y + 0.5 * dia, 0.5 * dia);
      // DrawCircle(x, y - 0.5 * dia, 0.5 * dia);
    } else if (dia >= width) {
      DrawCircle(x + 0.5 * dia, y, 0.5 * dia);
      DrawCircle(x - 0.5 * dia, y, 0.5 * dia);
      // DrawCircle(x, y + 0.5 * dia, 0.5 * dia);
      // DrawCircle(x, y - 0.5 * dia, 0.5 * dia);
    }
  }
}
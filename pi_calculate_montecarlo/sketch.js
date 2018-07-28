const DIA = 1000;
let val;
let total;
let inside;

function setup() {
  createCanvas(1280, 1280);
  background(200);
  val = 0;
  total = 0;
  inside = 0;
}

function draw() {
  translate(width / 2, height / 2);
  rectMode(CENTER);
  noStroke();
  fill(50, 100, 250, 100);
  // rect(0, 0, DIA, DIA);
  fill(0, 250, 50, 100);
  // ellipse(0, 0, DIA, DIA);

  let x;
  let y;
  for (let i = 0; i < 1200; i++) {
    y = random(-DIA / 2, DIA / 2);
    x = random(-DIA / 2, DIA / 2);
    strokeWeight(2);
    let d = dist(0, 0, x, y);
    if (d < DIA / 2) {
      stroke(255, 0, 155);
      inside++;
    } else {
      stroke(50, 150, 255);
    }
    total++;
    strokeWeight(1);
    point(x, y);
  }
  val = inside / total * 4;
  let error = Math.PI - val;

  fill(200);
  noStroke();
  rect(0, -height / 4 - DIA / 4, DIA, height / 2 - DIA / 2);
  textSize(30);
  textAlign(CENTER, CENTER);
  noStroke();
  fill(0);
  text('Approximate Value of PI = ' + nf(val, 1, 6), 0, -height / 4 - DIA / 4);


  fill(200);
  noStroke();
  rect(0, height / 4 + DIA / 4, DIA, height / 2 - DIA / 2);
  textSize(30);
  textAlign(CENTER, CENTER);
  noStroke();
  fill(0);
  text('Error = ' + nf(error, 1, 6), 0, height / 4 + DIA / 4);
}
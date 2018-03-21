let crank = 100;
let angle = 0;
let conn = 300;

function setup() {
  createCanvas(800, 600);

}

function draw() {
  background(51);

  textSize(50);
  strokeWeight(4);
  stroke(200, 0, 150, 100);
  fill(255);
  text('SLIDER CRANK MECHANISM', 25, 70);

  translate(200, height / 2);

  stroke(10, 100, 150, 100);
  noFill();
  strokeWeight(2);
  ellipse(0, 0, 2 * crank, 2 * crank);
  stroke(100, 200, 0, 100);
  strokeWeight(4);
  let x_cr = crank * cos(angle);
  let y_cr = crank * sin(angle);
  line(0, 0, x_cr, y_cr);
  let variable = x_cr + sqrt(conn * conn - y_cr * y_cr);
  line(x_cr, y_cr, variable, 0);

  stroke(50, 20, 60, 50);
  strokeWeight(4);
  line(0, 0, variable, 0);
  rectMode(CENTER);
  fill(255);
  stroke(100, 200, 0, 100);
  rect(variable, 0, 30, 20);


  angle += 0.05;

  stroke(255);
  strokeWeight(8);
  point(0, 0);
  point(x_cr, y_cr);
  point(variable, 0);

}
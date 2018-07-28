let k = 5 / 8;
let slider;

function setup() {
  createCanvas(880, 600);
  slider = createSlider(1, 10, 4, 0.1);
}

function draw() {
  k = slider.value();
  background(51);
  translate(width / 2, height / 2);
  scale(1, -1);
  stroke(255);
  noFill();
  strokeWeight(1);
  beginShape();
  for (let i = 0; i < TWO_PI * 10; i += 0.01) {
    let r = 200 * cos(k * i);
    let x = r * cos(i);
    let y = r * sin(i);
    vertex(x, y);
  }
  endShape();
}
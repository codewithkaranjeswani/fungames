let one;
let gravity;

function setup() {
  createCanvas(1536, 860);
  colorMode(HSB);
  gravity = createVector(0, 0.2);
  one = [];
  one.push(new Firework(random(width), height));
  background(0);
}

function draw() {
  colorMode(RGB);
  background(0, 0, 0, 25);
  if (random(1) < 0.15) {
    one.push(new Firework(random(width), height));
  }
  colorMode(HSB);
  for (let i = one.length - 1; i >= 0; i--) {
    one[i].update();
    one[i].show();
    if (one[i].done()) {
      one.splice(i, 1);
    }
  }
}

function keyPressed() {
  if (key == ' ') {
    saveFrames('currentFrame', 'png', 1, 60);
  }

}
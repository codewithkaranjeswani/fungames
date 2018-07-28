let pos;
let prev

function setup() {
  createCanvas(800, 600);
  pos = createVector(width / 2, height / 2);
  background(100, 50, 255);
  prev = pos.copy();
}

function draw() {
  for (let i = 0; i < 100; i++) {
    prev.set(pos);
    let step = p5.Vector.random2D(); // it gives a unit vector
    let r = random(1);
    if (r < 0.0005) {
      step.setMag(200);
    }
    pos.add(step);

    if (pos.x > (width - 20)) pos.x = width - 21;
    if (pos.x < 20) pos.x = 21;
    if (pos.y > (height - 20)) pos.y = height - 21;
    if (pos.y < 20) pos.y = 21;
    stroke(255);
    strokeWeight(2);
    line(pos.x, pos.y, prev.x, prev.y);
  }
}
let cutie;

function setup() {
  createCanvas(800, 600);
  let boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
  cutie = new QuadTree(boundary, 4);
  background(0);
  // for (let i = 0; i < 500; i++) {
  //   let p = new Point(width * Math.random(), height * Math.random());
  //   cutie.insert(p);
  // }
  // background(51);
  // cutie.show();
  // console.log(cutie);
  for (let i = 0; i < 350; i++) {
    let x = randomGaussian(width / 2, width / 8);
    let y = randomGaussian(height / 2, height / 8);
    let m = new Point(x, y);
    cutie.insert(m);
  }
}

function draw() {
  background(0);
  cutie.show();
  let range = new Rectangle(mouseX, mouseY, 25, 25);
  strokeWeight(2);
  stroke(0, 255, 0);
  rectMode(CENTER);
  rect(range.x, range.y, range.w * 2, range.h * 2);
  let points = cutie.query(range);
  // console.log(points);
  strokeWeight(4);
  stroke(0, 255, 0);
  for (one of points) {
    point(one.x, one.y);
  }
}

// function mouseDragged() {
//   let m = new Point(mouseX, mouseY);
//   cutie.insert(m);
// }

// function draw() {
//   background(0);
//   cutie.show();
//   let range = new Rectangle(250, 250, 107, 75);
//   strokeWeight(2);
//   stroke(0, 255, 0);
//   rectMode(CENTER);
//   rect(range.x, range.y, range.w * 2, range.h * 2);
//   let points = cutie.query(range);
// }
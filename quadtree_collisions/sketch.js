let particles;

function setup() {
  createCanvas(600, 400);
  particles = [];
  for (let i = 0; i < 1000; i++) {
    particles[i] = new Particle(random(2, width - 2), random(2, height - 2));
  }
}

function draw() {
  background(0);
  let boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
  let cutie = new QuadTree(boundary, 4);
  for (one of particles) {
    let point = new Point(one.x, one.y, one);
    cutie.insert(point);
    one.move();
    one.render();
    one.setHighlight(false);
  }
  for (let one of particles) {
    let range = new Circle(one.x, one.y, one.r * 2);
    let otherpoints = cutie.query(range);
    for (let single of otherpoints) {
      let other = single.userData;
      // for (let other of particles) {
      if (one != other && one.intersects(other)) {
        one.setHighlight(true);
      }
    }
  }
}
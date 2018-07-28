let particles = [];

function setup() {
  createCanvas(1536, 860); // my screen size
}

function draw() {
  background(200);
  let p = new Particle();
  particles.push(p);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
  }
  frameCheck(particles);
}

function frameCheck(particles) {
  for (let i = particles.length - 1; i >= 0; i--) {
    if (particles[i].x > width || particles[i].x < 0 || particles[i].y > height ||
      particles[i].y < 0) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor() {
    this.x = width / 2;
    this.y = height - height / 10;
    this.vx = 3 * random(-1, 1);
    this.vy = -11 + random(-1, 1);
    this.ax = 0;
    this.ay = 0.0981;
    this.alpha = 200;
  }

  update() {
    this.vx += this.ax;
    this.vy += this.ay;

    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.5;
  }

  show() {
    noStroke();
    fill(0, 0, 255, this.alpha);
    ellipse(this.x, this.y, 8);
  }
}
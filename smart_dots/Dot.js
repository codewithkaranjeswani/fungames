class Dot {
  constructor() {
    this.pos = createVector(100, height / 2);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.genome = new Brain(lifespan);
    this.dead = false;
    this.reachedGoal = false;
    this.isBest = false;
    this.fitness = 0;
  }
  move() {
    if (this.genome.step < this.genome.directions.length) {
      this.acc = this.genome.directions[this.genome.step];
      this.genome.step++;
    } else {
      this.dead = true;
    }
    if (!this.dead) {
      this.vel.add(this.acc);
      this.vel.limit(5);
      this.pos.add(this.vel);
    }
  }
  update() {
    if (this.pos.x <= 8 || this.pos.x >= width - 8 || this.pos.y <= 8 || this.pos.y >= height - 8) {
      if (this.pos.x >= width - 8) {
        this.pos.x = width - 8;
      }
      if (this.pos.x <= 8) {
        this.pos.x = 8;
      }
      if (this.pos.y >= height - 8) {
        this.pos.y = height - 8;
      }
      if (this.pos.y <= 8) {
        this.pos.y = 8;
      }
      this.dead = true;
    }
    // collision simulation
    // rectMode(CORNER);
    // rect(width * 0.33, 0, width / 50, height - 200);
    // rect(width * 0.66, 200, width / 50, height - 200);
    if (this.pos.y >= 100 && this.pos.y <= height) {
      if (this.pos.x >= width * 0.33 - 8 && this.pos.x <= width * 0.33 + width / 50 + 8) {
        this.dead = true;
      }
    }
    if (this.pos.y >= 0 && this.pos.y <= height - 100) {
      if (this.pos.x >= width * 0.66 - 8 && this.pos.x <= width * 0.66 + width / 50 + 8) {
        this.dead = true;
      }
    }
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if (d <= 24) {
      this.reachedGoal = true;
      this.dead = true;
      let along = createVector(0, 0);
      along = p5.Vector.sub(this.pos, target)
      along.setMag(24);
      this.pos = along.add(target);
    }
    if (!this.dead && !this.reachedGoal) {
      this.move();
    }
  }
  calculateFitness() {
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness = 1.0 / (d * d);
    if (this.reachedGoal) {
      this.fitness = 1 + 1.0 / (this.genome.step * this.genome.step);
    }
  }
  getChild() {
    let baby = new Dot();
    baby.genome = this.genome.clone();
    return baby;
  }
  show() {
    if (!this.reachedGoal) {
      if (this.isBest) {
        stroke(255);
        strokeWeight(1);
        fill(200, 0, 0);
      } else {
        noStroke();
        fill(0, 200, 155);
      }
    } else {
      noStroke();
      noFill();
    }
    ellipse(this.pos.x, this.pos.y, 16, 16);
  }
}
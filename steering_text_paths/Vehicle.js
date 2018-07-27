class Vehicle {
  constructor(x, y) {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.target = createVector(x, y);
    this.maxspeed = 10;
    this.maxForce = 1;
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  show() {
    stroke(255);
    strokeWeight(8);
    point(this.pos.x, this.pos.y);
  }
  applyForce(f) {
    this.acc.add(f); // mass = 1; thus acc = F / m.
  }
  flee(target) {
    let desired = p5.Vector.sub(target, this.pos);
    let d = desired.mag();
    if (d < 50) {
      desired.setMag(this.maxspeed);
      desired.mult(-1);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }
  arrive(target) {
    let desired = p5.Vector.sub(target, this.pos);
    let d = desired.mag();
    let speed = this.maxspeed;
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxspeed);
    }
    desired.setMag(speed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }
  behaviors() {
    // let seekingForce = this.seek(this.target);
    let arriveForce = this.arrive(this.target);
    let mouse = createVector(mouseX, mouseY);
    let flee = this.flee(mouse);

    arriveForce.mult(1);
    flee.mult(5);

    this.applyForce(arriveForce);
    this.applyForce(flee);
  }
}
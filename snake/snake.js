function Snake() {
  this.x = snap;
  this.y = snap;
  this.yspeed = 0 * snap;
  this.xspeed = 1 * snap;
  this.total = 0;
  this.tail = [];
  this.temp = [];
  this.update = function() {
    if (this.tail.length != 0) {
      this.temp = this.tail[0];
    }
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x += this.xspeed;
    this.y += this.yspeed;

    this.x = constrain(this.x, snap - 0.00001, width - 2 * snap + 0.00001);
    this.y = constrain(this.y, snap - 0.00001, height - 2 * snap + 0.00001);
  }

  this.show = function() {
    fill(255);
    stroke(0.1);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, snap, snap);
    }
    fill(200);
    rect(this.x, this.y, snap, snap);
  }

  this.dir = function(here, there) {
    this.xspeed = here * snap;
    this.yspeed = there * snap;
  }

  this.eatsfood = function(foodx, foody) {
    if (dist(this.x, this.y, foodx, foody) < snap) {
      this.total++;
      return true;
    } else
      return false;
  }
  this.defeated = function() {
    if (this.tail.length === 1) {
      if (dist(this.x, this.y, this.temp.x, this.temp.y) < snap - 0.00001) {
        fill(200);
        rect(this.tail[0].x, this.tail[0].y, snap, snap);
        fill(255);
        rect(this.x, this.y, snap, snap);
        return true;
      }
    }
    if (this.tail.length > 1) {
      if (dist(this.x, this.y, this.tail[this.tail.length - 2].x, this.tail[this.tail.length - 2].y) < snap - 0.00001) {
        fill(200);
        rect(this.tail[this.tail.length - 1].x, this.tail[this.tail.length - 1].y, snap, snap);
        fill(255);
        rect(this.temp.x, this.temp.y, snap, snap);
        rect(this.x, this.y, snap, snap);
        return true;
      }
    }
    if (this.x < snap - 0.000001 || this.x > width - 2 * snap + 0.000001 || this.y < snap - 0.000001 || this.y > height - 2 * snap + 0.000001) {
      fill(255);
      rect(this.temp.x, this.temp.y, snap, snap);
      return true;
    }
    for (let i = 0; i < this.tail.length; i++) {
      if (dist(this.x, this.y, this.tail[i].x, this.tail[i].y) < snap - 0.00001) {
        fill(200);
        rect(this.tail[this.tail.length - 1].x, this.tail[this.tail.length - 1].y, snap, snap);
        fill(255);
        rect(this.tail[i].x, this.tail[i].y, snap, snap);
        rect(this.temp.x, this.temp.y, snap, snap);
        return true;
      }
    }
    return false;
  }
}
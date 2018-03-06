function Food() {
  this.x = floor(random(1, width / snap - 1)) * snap;
  this.y = floor(random(1, height / snap - 1)) * snap;

  this.show = function() {
    fill(255, 0, 0);
    noStroke();
    rect(this.x, this.y, snap, snap);
  }
  this.changelocation = function(snaketail) {
    this.x = floor(random(1, width / snap - 1)) * snap;
    this.y = floor(random(1, height / snap - 1)) * snap;
    for (let i = 0; i < snaketail.length; i++) {
      if (this.x === snaketail[i].x && this.y === snaketail[i].y)
        this.changelocation(snaketail);
    }
  }
}
function Food()
{
  this.x = floor(random(snap, width/snap)) * snap;
  this.y = floor(random(snap, height/snap)) * snap;

  this.show = function()
  {
    fill(255, 0, 0);
    noStroke();
    rect(this.x, this.y, snap, snap);
  }
  this.changelocation = function()
  {
    this.x = floor(random(1, width/snap - 2)) * snap;
    this.y = floor(random(1, height/snap - 2)) * snap;
  }
}

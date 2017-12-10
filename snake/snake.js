function Snake()
{
  this.x = 20;
  this.y = 20;
  this.yspeed = 0*snap;
  this.xspeed = 1*snap;
  this.total = 0;
  this.tail = [];

  this.update = function()
  {
    if(this.total === this.tail.length)
    {
      for(var i = 0; i < this.tail.length - 1; i++)
      {
        this.tail[i] = this.tail[i+1];
      }
    }
    this.tail[this.total-1] = createVector(this.x, this.y);

    this.x += this.xspeed;
    this.y += this.yspeed;

    this.x = constrain(this.x, snap, width - 2*snap);
    this.y = constrain(this.y, snap, height - 2*snap);
  }

  this.show = function()
  {
    fill(255);
    stroke(0);
    for(var i = 0; i < this.tail.length; i++)
    {
      rect(this.tail[i].x, this.tail[i].y, snap, snap);
    }
    rect(this.x, this.y, snap, snap);
  }

  this.dir = function(here, there)
  {
    this.xspeed = here*snap;
    this.yspeed = there*snap;
  }

  this.eatsfood = function(foodx, foody)
  {
    if(dist(this.x, this.y, foodx, foody) < 1)
      {
        this.total++;
        return true;
      }
    else
      return false;
  }
}

// the snake game
var cobra;
var snap;
var apple;
function setup()
{
  frameRate(10);
  createCanvas(600, 600);
  snap = 20;
  cobra = new Snake();
  apple = new Food();
}

function draw()
{
  background(80, 20, 180);
  makeBorder();
  apple.show();
  cobra.update();
  cobra.show();
  if(cobra.eatsfood(apple.x, apple.y))
  {
    apple.changelocation();
  }
}

 function makeBorder()
{
  fill(0, 25, 75);
  noStroke();
  rect(0, 0 ,20, height);
  rect(width - 20, 0, 20, height);
  rect(0, 0, width, 20);
  rect(0, height - 20, width, 20);
}

function keyPressed()
{
  if(keyCode === RIGHT_ARROW)
    cobra.dir(1, 0);
  else if(keyCode === LEFT_ARROW)
    cobra.dir(-1, 0);
  else if(keyCode === UP_ARROW)
    cobra.dir(0, -1);
  else if(keyCode === DOWN_ARROW)
    cobra.dir(0, 1);
}

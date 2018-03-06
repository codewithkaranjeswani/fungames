// the snake game
let snap = 20;
let apple, cobra;
let score = 0;

function setup() {
  createCanvas(600, 600);
  frameRate(10);
  apple = new Food();
  cobra = new Snake();
}

function draw() {
  background(80, 20, 180);
  makeBorder();
  apple.show();
  cobra.update();
  cobra.show();
  if (cobra.eatsfood(apple.x, apple.y)) {
    apple.changelocation(cobra.tail);
    score++;
    console.log(score);
  }
  if (cobra.defeated()) {
    console.log("game over! final score = ", score, "!");
    exit();
  }
}

function makeBorder() {
  fill(0, 25, 75);
  noStroke();
  rect(0, 0, snap, height);
  rect(width - snap, 0, snap, height);
  rect(0, 0, width, snap);
  rect(0, height - snap, width, snap);
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW)
    cobra.dir(1, 0);
  else if (keyCode === LEFT_ARROW)
    cobra.dir(-1, 0);
  else if (keyCode === UP_ARROW)
    cobra.dir(0, -1);
  else if (keyCode === DOWN_ARROW)
    cobra.dir(0, 1);
}
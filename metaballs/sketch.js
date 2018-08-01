let balls;

function setup() {
  pixelDensity(1);
  createCanvas(400, 400);
  balls = new Array(4);
  for (let i = 0; i < balls.length; i++) {
    balls[i] = new Blob(random(width), random(height));
  }
}

function draw() {
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let index = (x + y * width) * 4;
      let sum = 0;
      for (let ball of balls) {
        let d = dist(x, y, ball.pos.x, ball.pos.y);
        let col = 25 * ball.radius / d;
        sum += col;
      }
      pixels[index + 0] = sum;
      pixels[index + 1] = sum;
      pixels[index + 2] = 0;
      pixels[index + 3] = 255;
    }
  }
  updatePixels();
  for (let ball of balls) {
    // ball.show();
    ball.update();
  }
}
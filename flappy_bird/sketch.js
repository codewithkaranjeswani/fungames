// working on the collision function and restart game when its over
let birdy;
let pipy = [];
let score = 0;
let allowed = true;
let previndex = 0;
let gameover = false;
let BORDER;

function setup() {
  createCanvas(800, 600);
  BORDER = height / 40;
  birdy = new Bird();
  pipy.push(new Pipe());
  frameRate(60);
}

function draw() {
  // game logic
  for (let i = pipy.length - 1; i >= 0; i--) {
    pipy[i].update();
  }
  if (frameCount % 75 == 0) {
    pipy.push(new Pipe());
  }
  birdy.update();

  let index = closestPipe(pipy, birdy);
  if (pipy[index].collides(birdy)) {
    gameover = true;
    noLoop();
  }
  if (pipy[index].x < birdy.x && allowed) {
    score++;
    allowed = false;
  }
  if (index == 1) {
    allowed = true;
  }
  // deleting stuff from the array
  for (let i = pipy.length - 1; i >= 0; i--) {
    if (pipy[i].x + pipy[i].thick < -5) {
      pipy.splice(i, 1);
    }
  }
  // drawing stuff
  background(51);
  birdy.show();
  for (let i = pipy.length - 1; i >= 0; i--) {
    pipy[i].show();
  }
  textAlign(CENTER);
  textSize(32);
  strokeWeight(4);
  stroke(50, 0, 100);
  fill(50, 50, 150);
  text("FLAPPY BIRD", width / 2, height / 10);
  stroke(50, 0, 100);
  fill(50, 50, 150);
  text("SCORE : " + score, width / 2, height / 10 + 64);
  if (gameover) {
    stroke(50, 0, 100);
    fill(255, 0, 0);
    text("GAME OVER", width / 2, height / 10 + 128);
  }
  // drawing borders
  fill(0);
  noStroke();
  rect(0, 0, width, BORDER);
  rect(0, height - BORDER, width, BORDER);
  rect(0, BORDER, BORDER, height - 2 * BORDER);
  rect(width - BORDER, BORDER, BORDER, height - 2 * BORDER);
}

function keyPressed() {
  if (key == ' ' && frameCount == 1) {
    birdy.jump();
    loop();
  }
  if (key == ' ') {
    birdy.jump();
  }
  // if (key == ' ' && gameover) {
  // pipy.length = 0;
  // pipy.push(new Pipe());
  // score = 0;
  // allowed = true;
  // previndex = 0;
  // loop();
  // gameover = false;
  // }
}

function mousePressed() {
  if (frameCount == 1) {
    birdy.jump();
    loop();
  }
  birdy.jump();
}

function closestPipe(pipy, birdy) {
  let minIndex = 0;
  let min_d = width;
  for (let i = 0; i < pipy.length; i++) {
    let d = pipy[i].x + pipy[i].thick - birdy.x;
    if (d < min_d && d >= 0) {
      min_d = d;
      minIndex = i;
    }
  }
  return minIndex;
}

class Pipe {
  constructor() {
    this.gap = 170 + random(-height / 30, height / 30);
    this.ytop = random(height / 6, 4 * height / 6);
    this.ybottom = this.ytop + this.gap;
    this.thick = width / 10;
    this.speed = 5;
    this.x = width + this.thick;
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    fill(100, 255, 100);
    noStroke();
    rect(this.x, BORDER, this.thick, this.ytop);
    rect(this.x, this.ybottom + BORDER, this.thick, height - this.ybottom - 2 * BORDER);
  }

  collides(birdy) {
    if (birdy.x <= birdy.size / 2 + BORDER) {
      birdy.x = birdy.size / 2 + BORDER;
      return true;
    }
    if (birdy.x >= width - birdy.size / 2 - BORDER) {
      birdy.x = width - birdy.size / 2 - BORDER;
      birdy.speed = 0;
      return true;
    }
    if (birdy.y <= birdy.size / 2 + BORDER) {
      birdy.y = birdy.size / 2 + BORDER;
      birdy.speed = 0;
      return true;
    }
    if (birdy.y >= height - birdy.size / 2 - BORDER) {
      birdy.y = height - birdy.size / 2 - BORDER;
      birdy.speed = 0;
      return true;
    }

    let d = this.x - birdy.x;
    if (d < birdy.size / 2 && (birdy.y - birdy.size / 2 <= this.ytop + BORDER || birdy.y + birdy.size / 2 >= this.ybottom + BORDER)) {
      // birdy.x = this.x - birdy.size / 2;
      return true;
    } else {
      return false;
    }
  }
};

class Bird {
  constructor() {
    this.size = 40;
    this.speed = 0;
    this.x = width / 3;
    this.y = height / 2;
    this.speed = 0;
    this.acc = 0.5;
  }

  show() {
    noStroke();
    fill(200, 100, 200);
    ellipse(this.x, this.y, this.size, this.size);
  }

  update() {
    this.speed += this.acc;
    this.y += this.speed;
  }

  jump() {
    this.speed = -10;
  }

  // collides(pipy) {
  //   if (this.x <= this.size / 2) {
  //     this.x = this.size / 2;
  //     return true;
  //   }
  //   if (this.x >= width - this.size / 2) {
  //     this.x = width - this.size / 2;
  //     this.speed = 0;
  //     return true;
  //   }
  //   if (this.y <= this.size / 2) {
  //     this.y = this.size / 2;
  //     this.speed = 0;
  //     return true;
  //   }
  //   if (this.y >= height - this.size / 2) {
  //     this.y = height - this.size / 2;
  //     this.speed = 0;
  //     return true;
  //   }
  //   // error in inside top and inside bottom, please check
  //   for (let pip of pipy) {
  //
  //
  //
  //     // if (this.x + this.size / 2 >= pip.x && this.x + this.size / 2 <= pip.x + 5 && ((this.y - this.size / 2 <= pip.ytop) || (this.y + this.size / 2 >= pip.ybottom))) {
  //     //   this.x = pip.x - this.size / 2;
  //     //   console.log('edge');
  //     //   return true;
  //     // } else {
  //     //   if (this.x + this.size / 2 >= pip.x && this.x + this.size / 2 <= pip.x + pip.thick && ((this.y - this.size / 2 <= pip.ytop) || (this.y + this.size / 2 >= pip.ybottom))) {
  //     //     if (this.y - this.size / 2 <= pip.ytop) {
  //     //       this.y = pip.ytop + this.size / 2;
  //     //       console.log('inside top');
  //     //     } else if (this.y + this.size / 2 >= pip.ybottom) {
  //     //       this.y = pip.ybottom - this.size / 2;
  //     //       console.log('inside bottom');
  //     //     }
  //     //     return true;
  //     //   } else {
  //     //     return false;
  //     //   }
  //     // }
  //   }
  // }
};
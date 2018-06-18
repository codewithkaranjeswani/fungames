// working on fullScreen version: done! test on phone!
// working on the collision function
// also work on restarting the game! done!
let birdy;
let pipy = [];
let gameover = false;
let BORDER;
let widthdef;
let heightdef;
let score = 0;
let d;
let dprev;
let counter;

function setup() {
  widthdef = window.screen.width - 3;
  heightdef = window.screen.height - 3.7;
  dprev = widthdef;
  counter = 0;
  createCanvas(widthdef, heightdef);
  BORDER = height / 40;
  birdy = new Bird();
  pipy.push(new Pipe());
}

function draw() {
  counter += 1;
  // console.log(counter);
  drawingStuff();
  if (counter == 1) {
    noLoop();
  }
  if (counter >= 1) {
    // game logic
    updateScore(pipy, birdy);
    for (let i = pipy.length - 1; i >= 0; i--) {
      pipy[i].update();
    }
    if (counter % 75 == 0) {
      pipy.push(new Pipe());
    }
    birdy.update();

    let index = closestPipe(pipy, birdy);
    if (pipy[index].collides(birdy)) {
      gameover = true;
      noLoop();
    }
    // deleting stuff from the pipy array
    for (let i = pipy.length - 1; i >= 0; i--) {
      if (pipy[i].x + pipy[i].thick < -5) {
        pipy.splice(i, 1);
      }
    }
    drawingStuff();
  }
}

function updateScore(pipy, birdy) {
  // use different distances for keeping score and checking collision
  let scoreIndex = 0;
  let min_s = width;

  for (let i = 0; i < pipy.length; i++) {
    // bird-end to pipe-start distance is d, used for keeping score!
    let scoredis = pipy[i].x - birdy.x - birdy.size / 2;
    if (scoredis < min_s && scoredis >= 0) {
      min_s = scoredis;
      d = scoredis;
      scoreIndex = i;
    }
  }
  if (d > dprev) {
    score += 1;
  }
  dprev = d;
}

function closestPipe(pipy, birdy) {
  // a pipe is said to be closest to the bird as long as
  // the bird's start passes through the end of the pipe.
  // use different distances for keeping score and checking collision
  let minIndex = 0;
  let min_d = width;
  for (let i = 0; i < pipy.length; i++) {
    // pipe-end to bird-start distance is dis, used for collision detection!
    let dis = pipy[i].x + pipy[i].thick - (birdy.x - birdy.size / 2);
    if (dis < min_d && dis >= 0) {
      min_d = dis;
      minIndex = i;
    }
  }
  return minIndex;
}

function drawingStuff() {
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
  if (key == ' ' && counter == 1) {
    birdy.jump();
    loop();
  }
  if (key == ' ') {
    birdy.jump();
  }
  if (key == 'R') {
    birdy = new Bird();
    pipy = [];
    pipy.push(new Pipe());
    dprev = widthdef;
    score = 0;
    counter = 0;
    // console.log(counter);
    if (!gameover) {
      noLoop();
    } else {
      loop();
    }
    gameover = false;
    drawingStuff();
  }
}

function mousePressed() {
  if (frameCount == 1) {
    birdy.jump();
    loop();
  }
  birdy.jump();
}

class Pipe {
  constructor() {
    this.gap = 170 + random(-height / 30, height / 30);
    this.ytop = random(height / 6, 4 * height / 6);
    this.ybottom = this.ytop + this.gap;
    this.thick = width / 20;
    this.speed = 5;
    this.x = width + this.thick;
  }

  show() {
    fill(100, 255, 100, 100);
    noStroke();
    rect(this.x, BORDER, this.thick, this.ytop);
    rect(this.x, this.ybottom + BORDER, this.thick, height - this.ybottom - 2 * BORDER);
  }

  update() {
    this.x -= this.speed;
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
    if (d < birdy.size / 2 && (birdy.y - birdy.size / 2 <= this.ytop + BORDER ||
        birdy.y + birdy.size / 2 >= this.ybottom + BORDER)) {
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
};

///////////////////////////////////////////////////////////////////////////////
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
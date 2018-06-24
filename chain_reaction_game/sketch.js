// introduce players and player colours...!

let spots = [];
let num;
let b;
let angle;
let chance;
let count;

function setup() {
  createCanvas(860, 860);
  num = 10; // (num - 2) x (num - 2) grid
  b = width / num;
  angle = 0;
  count = 0;
  chance = 'green';
  angleMode(DEGREES);
  for (let i = 0; i < num - 2; i++) {
    spots[i] = [];
    for (let j = 0; j < num - 2; j++) {
      spots[i][j] = new Spot(b + j * height / num, b + i * width / num);
    }
  }
  background(75, 200, 75);
}

function draw() {
  if (count == 2) {
    background(51);
    textSize(20);
    noStroke();
    text('GAME OVER!, Click to restart.', 300, 50);
    for (let i = 0; i < spots.length; i++) {
      for (let j = 0; j < spots[i].length; j++) {
        spots[i][j].show();
      }
    }
    // textSize(50);
    // text('GAME OVER!', width / 2 - 150, height / 2 - height / 10);
    // text('Click to Restart!', width / 2 - 150, height / 2 + height / 10);
  } else {
    if (chance == 'green') {
      background(75, 200, 75);
      textSize(20);
      noStroke();
      text('Green\'s Turn', 370, 50);
    } else if (chance == 'blue') {
      background(75, 75, 200);
      textSize(20);
      noStroke();
      text('Blue\'s Turn', 370, 50);
    } else {
      console.log('error in variable chance, as it is taking values other than green and blue');
    }
    // drawing stuff here!
    for (let i = 0; i < spots.length; i++) {
      for (let j = 0; j < spots[i].length; j++) {
        spots[i][j].show();
      }
    }
    angle += 1;
    if (angle >= 360) {
      angle = 0;
    }
  }
}

function mousePressed() {
  if (count == 2) {
    console.log('restarting...');
    for (let i = 0; i < spots.length; i++) {
      for (let j = 0; j < spots[i].length; j++) {
        spots[i][j].value = 0;
        spots[i][j].team = 'none';
        spots[i][j].show();
      }
    }
    count = 0;
    chance = 'green';
    loop();
  } else {
    let d = Infinity;
    let something;
    let i_ = -1;
    let j_ = -1;
    for (let i = 0; i < spots.length; i++) {
      for (let j = 0; j < spots[i].length; j++) {
        something = dist(mouseX, mouseY, spots[i][j].x, spots[i][j].y);
        if (something < d && mouseX - spots[i][j].x > 0 && mouseY - spots[i][j].y > 0) {
          d = something;
          i_ = i;
          j_ = j;
        }
      }
    }
    if (!(i_ == -1 && j_ == -1)) {
      if (spots[i_][j_].team == 'none' || spots[i_][j_].team == chance) {
        spots[i_][j_].value++;
        spots[i_][j_].team = chance;
        if (chance == 'green') {
          chance = 'blue';
        } else if (chance == 'blue') {
          chance = 'green';
        } else {
          console.log('error chance taking values other than green and blue');
        }
      }
      // corner cases
      if ((i_ == 0 && j_ == 0) || (i_ == 0 && j_ == spots.length - 1) ||
        (i_ == spots.length - 1 && j_ == 0) ||
        (i_ == spots.length - 1 && j_ == spots.length - 1)) {
        if (spots[i_][j_].value > 1) {
          spots[i_][j_].value = 0;
          blast(spots, i_, j_);
          if (spots[i_][j_].value == 0)
            spots[i_][j_].team = 'none';
        }
      }
      // edge cases
      else if ((i_ == 0) || (j_ == 0) || (i_ == spots.length - 1) || (j_ == spots.length - 1)) {
        if (spots[i_][j_].value > 2) {
          spots[i_][j_].value = 0;
          blast(spots, i_, j_);
          if (spots[i_][j_].value == 0)
            spots[i_][j_].team = 'none';
        }
      }
      // middle case
      else {
        if (spots[i_][j_].value > 3) {
          spots[i_][j_].value = 0;
          blast(spots, i_, j_);
          if (spots[i_][j_].value == 0)
            spots[i_][j_].team = 'none';
        }
      }
      // draw stuff (drawing in draw method)!
      // for (let i = 0; i < spots.length; i++) {
      //   for (let j = 0; j < spots[i].length; j++) {
      //     spots[i][j].show();
      //   }
      // }
      console.log(checkGameOver(spots));
    } else {
      console.log('clicked outside!');
    }
  }
}

function checkGameOver(spots) {
  let greenCount = 0;
  let blueCount = 0;
  let noneCount = 0;
  for (let i = 0; i < spots.length; i++) {
    for (let j = 0; j < spots[i].length; j++) {
      if (spots[i][j].team == 'green')
        greenCount++;
      else if (spots[i][j].team == 'blue')
        blueCount++;
      else
        noneCount++;
    }
  }
  if (greenCount == 0 || blueCount == 0)
    count++;
  if (count == 2) {
    console.log('GAME OVER!');
    // for (let i = 0; i < spots.length; i++) {
    //   for (let j = 0; j < spots[i].length; j++) {
    //     spots[i][j].value = 0;
    //   }
    // }
    noLoop();
  }
  return [greenCount, blueCount, noneCount];
}

function blast(spots, i, j) {
  // corner cases
  if (i == 0 && j == 0) {
    spots[i + 1][j].value++;
    spots[i + 1][j].team = spots[i][j].team;
    if (spots[i + 1][j].value > 2) {
      spots[i + 1][j].value = 0;
      blast(spots, i + 1, j);
      if (spots[i + 1][j].value == 0)
        spots[i + 1][j].team = 'none';
    }
    spots[i][j + 1].value++;
    spots[i][j + 1].team = spots[i][j].team;
    if (spots[i][j + 1].value > 2) {
      spots[i][j + 1].value = 0;
      blast(spots, i, j + 1);
      if (spots[i][j + 1].value == 0)
        spots[i][j + 1].team = 'none';
    }
  } else if (i == 0 && j == spots.length - 1) {
    spots[i + 1][j].value++;
    spots[i + 1][j].team = spots[i][j].team;
    if (spots[i + 1][j].value > 2) {
      spots[i + 1][j].value = 0;
      blast(spots, i + 1, j);
      if (spots[i + 1][j].value == 0)
        spots[i + 1][j].team = 'none';
    }
    spots[i][j - 1].value++;
    spots[i][j - 1].team = spots[i][j].team;
    if (spots[i][j - 1].value > 2) {
      spots[i][j - 1].value = 0;
      blast(spots, i, j - 1);
      if (spots[i][j - 1].value == 0)
        spots[i][j - 1].team = 'none';
    }
  } else if (i == spots.length - 1 && j == 0) {
    spots[i - 1][j].value++;
    spots[i - 1][j].team = spots[i][j].team;
    if (spots[i - 1][j].value > 2) {
      spots[i - 1][j].value = 0;
      blast(spots, i - 1, j);
      if (spots[i - 1][j].value == 0)
        spots[i - 1][j].team = 'none';
    }
    spots[i][j + 1].value++;
    spots[i][j + 1].team = spots[i][j].team;
    if (spots[i][j + 1].value > 2) {
      spots[i][j + 1].value = 0;
      blast(spots, i, j + 1);
      if (spots[i][j + 1].value == 0)
        spots[i][j + 1].team = 'none';
    }
  } else if (i == spots.length - 1 && j == spots.length - 1) {
    spots[i - 1][j].value++;
    spots[i - 1][j].team = spots[i][j].team;
    if (spots[i - 1][j].value > 2) {
      spots[i - 1][j].value = 0;
      blast(spots, i - 1, j);
      if (spots[i - 1][j].value == 0)
        spots[i - 1][j].team = 'none';
    }
    spots[i][j - 1].value++;
    spots[i][j - 1].team = spots[i][j].team;
    if (spots[i][j - 1].value > 2) {
      spots[i][j - 1].value = 0;
      blast(spots, i, j - 1);
      if (spots[i - 1][j].value == 0)
        spots[i][j - 1].team = 'none';
    }
  }
  // edge cases
  else if (i == 0) {
    spots[i + 1][j].value++;
    spots[i + 1][j].team = spots[i][j].team;
    if (spots[i + 1][j].value > 3) {
      spots[i + 1][j].value = 0;
      blast(spots, i + 1, j);
      if (spots[i + 1][j].value == 0)
        spots[i + 1][j].team = 'none';
    }
    spots[i][j - 1].value++;
    spots[i][j - 1].team = spots[i][j].team;
    if (((j - 1 == 0) && (spots[i][j - 1].value > 1)) ||
      ((j - 1 != 0) && (spots[i][j - 1].value > 2))) {
      spots[i][j - 1].value = 0;
      blast(spots, i, j - 1);
      if (spots[i - 1][j].value == 0)
        spots[i][j - 1].team = 'none';
    }
    spots[i][j + 1].value++;
    spots[i][j + 1].team = spots[i][j].team;
    if (((j + 1 == spots.length - 1) && (spots[i][j + 1].value > 1)) ||
      ((j + 1 != spots.length - 1) && (spots[i][j + 1].value > 2))) {
      spots[i][j + 1].value = 0;
      blast(spots, i, j + 1);
      if (spots[i][j + 1].value == 0)
        spots[i][j + 1].team = 'none';
    }
  } else if (i == spots.length - 1) {
    spots[i - 1][j].value++;
    spots[i - 1][j].team = spots[i][j].team;
    if (spots[i - 1][j].value > 3) {
      spots[i - 1][j].value = 0;
      blast(spots, i - 1, j);
      if (spots[i - 1][j].value == 0)
        spots[i - 1][j].team = 'none';
    }
    spots[i][j - 1].value++;
    spots[i][j - 1].team = spots[i][j].team;
    if (((j - 1 == 0) && (spots[i][j - 1].value > 1)) ||
      ((j - 1 != 0) && (spots[i][j - 1].value > 2))) {
      spots[i][j - 1].value = 0;
      blast(spots, i, j - 1);
      if (spots[i - 1][j].value == 0)
        spots[i][j - 1].team = 'none';
    }
    spots[i][j + 1].value++;
    spots[i][j + 1].team = spots[i][j].team;
    if (((j + 1 == spots.length - 1) && (spots[i][j + 1].value > 1)) ||
      ((j + 1 != spots.length - 1) && (spots[i][j + 1].value > 2))) {
      spots[i][j + 1].value = 0;
      blast(spots, i, j + 1);
      if (spots[i][j + 1].value == 0)
        spots[i][j + 1].team = 'none';
    }
  } else if (j == 0) {
    spots[i + 1][j].value++;
    spots[i + 1][j].team = spots[i][j].team;
    if (((i + 1 == spots.length - 1) && (spots[i + 1][j].value > 1)) ||
      ((i + 1 != spots.length - 1) && (spots[i + 1][j].value > 2))) {
      spots[i + 1][j].value = 0;
      blast(spots, i + 1, j);
      if (spots[i + 1][j].value == 0)
        spots[i + 1][j].team = 'none';
    }
    spots[i - 1][j].value++;
    spots[i - 1][j].team = spots[i][j].team;
    if (((i - 1 == 0) && (spots[i - 1][j].value > 1)) ||
      ((i - 1 != 0) && (spots[i - 1][j].value > 2))) {
      spots[i - 1][j].value = 0;
      blast(spots, i - 1, j);
      if (spots[i - 1][j].value == 0)
        spots[i - 1][j].team = 'none';
    }
    spots[i][j + 1].value++;
    spots[i][j + 1].team = spots[i][j].team;
    if (spots[i][j + 1].value > 3) {
      spots[i][j + 1].value = 0;
      blast(spots, i, j + 1);
      if (spots[i][j + 1].value == 0)
        spots[i][j + 1].team = 'none';
    }
  } else if (j == spots.length - 1) {
    spots[i + 1][j].value++;
    spots[i + 1][j].team = spots[i][j].team;
    if (((i + 1 == spots.length - 1) && (spots[i + 1][j].value > 1)) ||
      ((i + 1 != spots.length - 1) && (spots[i + 1][j].value > 2))) {
      spots[i + 1][j].value = 0;
      blast(spots, i + 1, j);
      if (spots[i + 1][j].value == 0)
        spots[i + 1][j].team = 'none';
    }
    spots[i - 1][j].value++;
    spots[i - 1][j].team = spots[i][j].team;
    if (((i - 1 == 0) && (spots[i - 1][j].value > 1)) ||
      ((i - 1 != 0) && (spots[i - 1][j].value > 2))) {
      spots[i - 1][j].value = 0;
      blast(spots, i - 1, j);
      if (spots[i - 1][j].value == 0)
        spots[i - 1][j].team = 'none';
    }
    spots[i][j - 1].value++;
    spots[i][j - 1].team = spots[i][j].team;
    if (spots[i][j - 1].value > 3) {
      spots[i][j - 1].value = 0;
      blast(spots, i, j - 1);
      if (spots[i - 1][j].value == 0)
        spots[i][j - 1].team = 'none';
    }
  }
  // middle case
  else {
    spots[i + 1][j].value++;
    spots[i + 1][j].team = spots[i][j].team;
    if (((i + 1 == spots.length - 1) && (spots[i + 1][j].value > 2)) ||
      ((i + 1 != spots.length - 1) && (spots[i + 1][j].value > 3))) {
      spots[i + 1][j].value = 0;
      blast(spots, i + 1, j);
      if (spots[i + 1][j].value == 0)
        spots[i + 1][j].team = 'none';
    }
    spots[i - 1][j].value++;
    spots[i - 1][j].team = spots[i][j].team;
    if (((i - 1 == 0) && (spots[i - 1][j].value > 2)) ||
      ((i - 1 != 0) && (spots[i - 1][j].value > 3))) {
      spots[i - 1][j].value = 0;
      blast(spots, i - 1, j);
      if (spots[i - 1][j].value == 0)
        spots[i - 1][j].team = 'none';
    }
    spots[i][j - 1].value++;
    spots[i][j - 1].team = spots[i][j].team;
    if (((j - 1 == 0) && (spots[i][j - 1].value > 2)) ||
      ((j - 1 != 0) && (spots[i][j - 1].value > 3))) {
      spots[i][j - 1].value = 0;
      blast(spots, i, j - 1);
      if (spots[i - 1][j].value == 0)
        spots[i][j - 1].team = 'none';
    }
    spots[i][j + 1].value++;
    spots[i][j + 1].team = spots[i][j].team;
    if (((j + 1 == spots.length - 1) && (spots[i][j + 1].value > 2)) ||
      ((j + 1 != spots.length - 1) && (spots[i][j + 1].value > 3))) {
      spots[i][j + 1].value = 0;
      blast(spots, i, j + 1);
      if (spots[i][j + 1].value == 0)
        spots[i][j + 1].team = 'none';
    }
  }
}

class Spot {
  constructor(x_, y_) {
    this.x = x_;
    this.y = y_;
    this.size = width / num;
    this.value = 0;
    this.team = 'none';
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(255);
    rect(this.x, this.y, this.size, this.size);
    ellipseMode(CENTER);
    if (this.value < 0 || this.value > 3) {
      console.log('error, value in a cell is not between 0 and 3');
    }
    switch (this.value) {
      case 0:
        // stroke(0);
        // strokeWeight(2);
        // fill(255);
        // rect(this.x, this.y, this.size, this.size);
        break;
      case 1:
        if (this.team == 'blue') {
          fill(0, 0, 200, 150);
        } else if (this.team == 'green') {
          fill(0, 200, 0, 150);
        } else if (this.team == 'none') {
          console.log('team = none');
        } else {
          console.log('error in team');
        }
        noStroke();
        ellipse(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, this.size / 2);
        break;
      case 2:
        push();
        if (this.team == 'blue') {
          fill(0, 0, 200, 150);
        } else if (this.team == 'green') {
          fill(0, 200, 0, 150);
        } else if (this.team == 'none') {
          console.log('team = none');
        } else {
          console.log('error in team');
        }
        noStroke();
        translate(this.x + this.size / 2, this.y + this.size / 2);
        rotate(angle);
        ellipse(-this.size / 6, 0, this.size / 2, this.size / 2);
        ellipse(this.size / 6, 0, this.size / 2, this.size / 2);
        pop();
        break;
      case 3:
        push();
        if (this.team == 'blue') {
          fill(0, 0, 200, 150);
        } else if (this.team == 'green') {
          fill(0, 200, 0, 150);
        } else {
          console.log('error in team');
        }
        noStroke();
        translate(this.x + this.size / 2, this.y + this.size / 2);
        rotate(angle + 45);
        ellipse(0, -this.size / 6, this.size / 2, this.size / 2);
        ellipse(-1.732 * this.size / 12, this.size / 12, this.size / 2, this.size / 2);
        ellipse(1.732 * this.size / 12, this.size / 12, this.size / 2, this.size / 2);
        pop();
        break;
    }
  }
}
const SQ_SIZE = 120, WD_SIZE = 80, SP = 10, ADJX = 25, ADJY = 40, BG_COLOR = 35, BTN_CLRY = 80, BTN_CLRX = 100, BTN_WIDTH = 150, BTN_HEIGHT = 50;
const answer = ['a', 'l', 'i', 'g', 'n'];
let ROW_NUM = 1;
let current_word = [], current_color = [], all_words = [];
let all_colors;
let win, CLRX, CLRY;

function makeGrid(given_word, all_words, all_colors) {
  textSize(50)
  fill(255);
  stroke(0);
  strokeWeight(2);
  textAlign(CENTER, CENTER);
  text("WORDLE - 1 Answer Only!", width / 2, 50);
  noFill();
  stroke(61);
  strokeWeight(2);
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      fill(all_colors[i][j]);
      rect(CLRX + j * (SQ_SIZE + SP), CLRY + i * (SQ_SIZE + SP), SQ_SIZE, SQ_SIZE);
    }
  }
  for (let i = 0; i < all_words.length; i++) {
    each_word = all_words[i]
    if (each_word.length > 0 && each_word.length < 6) {
      noStroke();
      textSize(WD_SIZE);
      textAlign(LEFT, BASELINE);
      fill(200);
      strokeWeight(2);
      for (let j = 0; j < each_word.length; j++) {
        text(each_word[j].toUpperCase(), CLRX + ADJX + j * (SQ_SIZE + SP), CLRY - ADJY + (i+1) * (SQ_SIZE + SP));
      }
    }
  }
  row = all_words.length + 1
  if (given_word.length > 0 && given_word.length < 6) {
    textSize(WD_SIZE);
    textAlign(LEFT, BASELINE);
    fill(200);
    strokeWeight(2);
    for (let j = 0; j < given_word.length; j++) {
      oneLetter = given_word[j]
      text(oneLetter.toUpperCase(), CLRX + ADJX + j * (SQ_SIZE + SP), CLRY - ADJY + row * (SQ_SIZE + SP));
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(BG_COLOR);
  win = false;
  CLRX = width / 2  - (SQ_SIZE + SP) * 5 / 2;
  CLRY = 100;
  all_colors = new Array(6);
  for (let i = 0; i < 6; i++) {
    all_colors[i] = new Array(5);
    for (let j = 0; j < 5; j++) {
      all_colors[i][j] = color(BG_COLOR);
    }
  }
  strokeWeight(10);
  makeGrid(given_word='', all_words=all_words, all_colors=all_colors);
  frameRate(5);
  button = createButton('Enter');
  button.position(width - BTN_CLRX - BTN_WIDTH, height - BTN_CLRY);
  button.size(BTN_WIDTH, BTN_HEIGHT);
  button.mousePressed(enterHandler);
  button = createButton('Backspace');
  button.position(BTN_CLRX, height - BTN_CLRY);
  button.size(BTN_WIDTH, BTN_HEIGHT);
  button.mousePressed(backHandler);
}

function draw() {
  background(BG_COLOR);
  makeGrid(given_word=current_word, all_words=all_words, all_colors=all_colors);
  if (win == true) {
    console.log("You Win!")
    makeGrid(given_word=current_word, all_words=all_words, all_colors=all_colors);
    noLoop();
  }
}

function keyPressed() {
  let y = keyCode;
  if (y == 8) {
    backHandler();
  } else if (y == 13) {
    enterHandler();
  } else if (y > 64 && y < 91) {
    // console.log(y);
    k = key
    if (current_word.length < 6) {
      current_word.push(k.toLowerCase());
      // console.log(join(current_word, ''));
    } else {
      current_word = []
    }
  }
}

function enterHandler() {
  if (ROW_NUM < 7) {
    if (current_word.length != 5) {
      current_word = [];
      return;
    }
    // check current_word with answer
    let count = 0;
    for (let i = 0; i < answer.length; i++) {
      if (current_word[i] == answer[i]) {
        all_colors[ROW_NUM-1][i] = color(50, 150, 50);
        count += 1;
      } else if (current_word[i] != answer[i] && answer.includes(current_word[i])) {
        all_colors[ROW_NUM-1][i] = color(200,150,0);
      } else {
        all_colors[ROW_NUM-1][i] = color(61);
      }
    }
    if (count == 5) {
      win = true;
    }
    all_words.push(current_word)
    current_word = []
    ROW_NUM += 1;
  }
}

function backHandler() {
  current_word.pop();
}

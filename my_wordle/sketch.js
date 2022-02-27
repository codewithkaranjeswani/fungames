const SQ_SIZE = 80, WD_SIZE = 40, SP = 5, ADJX = 20, ADJY = 25, BG_COLOR = 35, BTN_CLRY = 80, BTN_CLRX = 100, BTN_WIDTH = 150, BTN_HEIGHT = 50
const KEY_SZ = 50, KEY_SP = 2;
const qwerty = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M']
let current_word, current_color, all_words, keylocs, allowed_words, answer_words;
let ROW_NUM, all_colors, win, CLRX, CLRY, KEY_CLRX, KEY_CLRY, answer, in_allowed;

function makeGrid(given_word, all_words, all_colors, in_allowed) {
  textSize(50)
  fill(255);
  stroke(0);
  strokeWeight(2);
  textAlign(CENTER, CENTER);
  text("WORDLE", width / 2, 50);
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
    if (in_allowed == false) {
      stroke(200, 0, 0);
      fill(200, 0, 0);
    } else {
      noStroke();
      fill(200);
    }
    textSize(WD_SIZE);
    textAlign(LEFT, BASELINE);
    strokeWeight(2);
    for (let j = 0; j < given_word.length; j++) {
      oneLetter = given_word[j]
      text(oneLetter.toUpperCase(), CLRX + ADJX + j * (SQ_SIZE + SP), CLRY - ADJY + row * (SQ_SIZE + SP));
    }
  }
  // making keyboard ui
  strty = KEY_CLRY
  for (let i = 0; i < 10; i++) {
    noStroke();
    fill(150);
    rect(KEY_CLRX + i*(KEY_SZ + KEY_SP), strty, KEY_SZ, KEY_SZ);
    noStroke();
    fill(255);
    textSize(25);
    textAlign(LEFT, BASELINE);
    text(qwerty[i], KEY_CLRX + i*(KEY_SZ + KEY_SP) + 10, strty + 33);
  }
  strty += 70;
  for (let i = 0; i < 9; i++) {
    noStroke();
    fill(150);
    rect(KEY_CLRX + i*(KEY_SZ + KEY_SP) + 30, strty, KEY_SZ, KEY_SZ);
    noStroke();
    fill(255);
    textSize(25);
    textAlign(LEFT, BASELINE);
    text(qwerty[10+i], KEY_CLRX + i*(KEY_SZ + KEY_SP) + 40, strty + 33);
  }
  strty += 70;
  for (let i = 0; i < 7; i++) {
    noStroke();
    fill(150);
    rect(KEY_CLRX + i*(KEY_SZ + KEY_SP) + 70, strty, KEY_SZ, KEY_SZ);
    noStroke();
    fill(255);
    textSize(25);
    textAlign(LEFT, BASELINE);
    text(qwerty[19+i], KEY_CLRX + i*(KEY_SZ + KEY_SP) + 80, strty + 33);
  }
}

function preload() {
  allowed_words = []; answer_words =[];
  loadStrings('wordle-answers-alphabetical.txt', assignAnswer);
  loadStrings('wordle-allowed-guesses.txt', assignAllowed);
}

function assignAnswer(official_wordle_answers) {
  answer_words = official_wordle_answers;
  idx = floor(random(0, answer_words.length));
  answer = answer_words[idx];
  console.log(answer)
}

function assignAllowed(official_wordle_allowed) {
  allowed_words = official_wordle_allowed;
  allowed_words = allowed_words.concat(answer_words);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(BG_COLOR);
  current_word = []; current_color = []; all_words = []; keylocs = [];
  ROW_NUM = 1;
  win = false;
  in_allowed = true;
  CLRX = width / 2  - (SQ_SIZE + SP) * 5 / 2;
  CLRY = 100;
  KEY_CLRX = width / 2 - (KEY_SZ + KEY_SP) * 10 / 2;
  KEY_CLRY = 700;
  all_colors = new Array(6);
  for (let i = 0; i < 6; i++) {
    all_colors[i] = new Array(5);
    for (let j = 0; j < 5; j++) {
      all_colors[i][j] = color(BG_COLOR);
    }
  }
  strokeWeight(10);
  makeGrid(given_word='', all_words=all_words, all_colors=all_colors, in_allowed=in_allowed);
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
  makeGrid(given_word=current_word, all_words=all_words, all_colors=all_colors, in_allowed=in_allowed);
  if (win == true) {
    console.log("You Win!")
    makeGrid(given_word=current_word, all_words=all_words, all_colors=all_colors, in_allowed=in_allowed);
    noLoop();
  }
}

function handleKey(given_key) {
  if (current_word.length < 5) {
    current_word.push(given_key.toLowerCase());
    // console.log(join(current_word, ''));
  } else {
    current_word = []
  }
  let count = 0;
  if (current_word.length == 5) {
    joined_current_word = join(current_word, '')
    // console.log(joined_current_word)
    for (let one_allowed_word of allowed_words) {
      if (joined_current_word == one_allowed_word) {
        count += 1;
        break;
      } 
    }
    if (count == 0) {
      in_allowed = false;
      // console.log("not in allowed words")
    } else {
      in_allowed = true;
    }
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
    handleKey(given_key=key);
  }
}

function enterHandler() {
  if (ROW_NUM < 7) {
    if (current_word.length != 5) {
      current_word = [];
      in_allowed = true;
      return;
    }
    if (in_allowed == false) {
      current_word = []
      in_allowed = true;
      return
    }
    in_allowed = true;
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
  in_allowed = true;
}

function mousePressed() {
  mx = mouseX; my = mouseY;
  // handling keyboard ui
  strty = KEY_CLRY
  for (let i = 0; i < 10; i++) {
    if (mx > KEY_CLRX + i*(KEY_SZ + KEY_SP) && mx < KEY_CLRX + i*(KEY_SZ + KEY_SP) + KEY_SZ && my > strty && my < strty + KEY_SZ) {
      handleKey(given_key=qwerty[i]);
    }
  }
  strty += 70;
  for (let i = 0; i < 9; i++) {
    if (mx > KEY_CLRX + i*(KEY_SZ + KEY_SP) + 30 && mx < KEY_CLRX + i*(KEY_SZ + KEY_SP) + 30 + KEY_SZ && my > strty && my < strty + KEY_SZ) {
      handleKey(given_key=qwerty[10+i]);
    }
  }
  strty += 70;
  for (let i = 0; i < 7; i++) {
    if (mx > KEY_CLRX + i*(KEY_SZ + KEY_SP) + 70 && mx < KEY_CLRX + i*(KEY_SZ + KEY_SP) + 70 + KEY_SZ && my > strty && my < strty + KEY_SZ) {
      handleKey(given_key=qwerty[19+i]);
    }
  }
}
// NeuralNet Gameplay!

const TOTAL = 500;
let birds = [];
let savedBirds = [];
let pipy = [];
let BORDER;
let score = 0;
let d;
let dprev;
let counter;
let num_gen;
let maxScore = 0;
let slider;
let button;
let savebutton;
let loadbutton;
let loadfilebutton;
let total_score;
let normalizedScores = [];
let bestBird;
let toggle;
let speedpara;
let brainJSON;
let godbird;

function preload() {
  brainJSON = loadJSON('bestBird.json');
}

function setup() {
  createCanvas(640, 480);
  createP('');
  button = createButton('hide');
  button.mousePressed(toggleDisplay);
  savebutton = createButton('save bestbird (.json file) from previous gen');
  savebutton.mousePressed(savefile);
  speedpara = createP('speed: ');
  slider = createSlider(1, 1000, 1);
  toggle = false;
  createP('');
  loadbutton = createButton('load bestBird from previous gens');
  loadbutton.mousePressed(playBird);
  loadfilebutton = createButton('load bird.json file from server');
  loadfilebutton.mousePressed(loadbird);
  total_score = 0;
  pos = 0;
  num_gen = 1;
  counter = 0;
  dprev = width;
  BORDER = height / 40;
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
  bestBird = new Bird();
  pipy.push(new Pipe());
  let birdbrain = NeuralNetwork.deserialize(brainJSON);
  godbird = new Bird(birdbrain);
}

function draw() {
  for (let n = 0; n < slider.value(); n++) {
    speedpara.html('speed : ' + slider.value());
    counter++;
    // game logic
    updateScore(pipy, birds);
    for (let i = pipy.length - 1; i >= 0; i--) {
      pipy[i].update();
    }
    if (counter % 75 == 0) {
      pipy.push(new Pipe());
    }
    for (let j = birds.length - 1; j >= 0; j--) {
      birds[j].think(pipy);
      birds[j].update();
      let index = closestPipe(pipy, birds[j]);
      if (pipy[index].collides(birds[j])) {
        savedBirds.push(birds.splice(j, 1)[0]);
      }
    }
    if (birds.length == 0) {
      ResetGame();
      nextGeneration();
      num_gen++;
      if (toggle) {
        background(51);
        textAlign(CENTER);
        textSize(16);
        strokeWeight(4);
        stroke(50, 0, 100);
        fill(50, 50, 150);
        text("FLAPPY BIRD", width / 2, height / 10);
        stroke(50, 0, 100);
        fill(50, 150, 50);
        text("SCORE : " + score, 1.5 * width / 10, height / 5);
        text("AVG SCORE : " + nf(total_score / (num_gen - 1), 0, 1), 4.5 * width / 10, height / 5);
        text("MAX SCORE : " + maxScore, 8 * width / 10, height / 5);
        fill(50, 150, 50);
        text("Generation : " + num_gen, width / 2, 3 * height / 10);
        // graphing stuff
        stroke(255, 50);
        strokeWeight(1);
        let pos = 0;
        for (let i = 0; i < width; i++) {
          pos += 1;
          if (normalizedScores.length > width) {
            normalizedScores.splice(0, 1);
          }
          line(pos, height, pos, height - normalizedScores[i]);
        }
        let avg = map(total_score / (num_gen - 1), 0, 1000, 0, height - 50);
        let max = map(maxScore, 0, 1000, 0, height - 50);
        stroke(200, 0, 0, 255);
        line(0, height - avg, BORDER + 5, height - avg);
        line(0, height - max, BORDER + 5, height - max);
      }
    }
    // deleting stuff from the pipy array
    for (let i = pipy.length - 1; i >= 0; i--) {
      if (pipy[i].x + pipy[i].thick < -5) {
        pipy.splice(i, 1);
      }
    }
    if (!toggle) {
      drawingStuff();
    }
  }
}

function updateScore(pipy, birds) {
  // use different distances for keeping score and checking collision
  let scoreIndex = 0;
  let min_s = width;

  for (let i = 0; i < pipy.length; i++) {
    // bird-end to pipe-start distance is d, used for keeping score!
    for (birdy of birds) {
      let scoredis = pipy[i].x - birdy.x - birdy.size / 2;
      if (scoredis < min_s && scoredis >= 0) {
        min_s = scoredis;
        d = scoredis;
        scoreIndex = i;
      }
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

function loadbird() {
  birds = [];
  pipy = [];
  pipy.push(new Pipe());
  dprev = width;
  score = 0;
  counter = 0;
  birds.push(godbird);
}

function playBird() {
  birds = [];
  pipy = [];
  pipy.push(new Pipe());
  dprev = width;
  score = 0;
  counter = 0;
  birds.push(bestBird);
  // num_gen = 0;
  // normalizedScores = [];
}

function toggleDisplay() {
  toggle = !toggle;
  if (toggle) {
    background(51);
    textAlign(CENTER);
    textSize(16);
    strokeWeight(4);
    stroke(50, 0, 100);
    fill(50, 50, 150);
    text("FLAPPY BIRD", width / 2, height / 10);
    stroke(50, 0, 100);
    fill(50, 150, 50);
    text("SCORE : " + score, 1.5 * width / 10, height / 5);
    text("AVG SCORE : " + nf(total_score / (num_gen - 1), 0, 1), 4.5 * width / 10, height / 5);
    text("MAX SCORE : " + maxScore, 8 * width / 10, height / 5);
    fill(50, 150, 50);
    text("Generation : " + num_gen, width / 2, 3 * height / 10);
    // graphing stuff
    stroke(255, 50);
    strokeWeight(1);
    let pos = 0;
    for (let i = 0; i < width; i++) {
      pos += 1;
      if (normalizedScores.length > width) {
        normalizedScores.splice(0, 1);
      }
      line(pos, height, pos, height - normalizedScores[i]);
    }
    let avg = map(total_score / (num_gen - 1), 0, 1000, 0, height - 50);
    let max = map(maxScore, 0, 1000, 0, height - 50);
    stroke(200, 0, 0, 255);
    line(0, height - avg, BORDER + 5, height - avg);
    line(0, height - max, BORDER + 5, height - max);
    button.html('show');
  } else {
    button.html('hide');
  }
}

function savefile() {
  save(bestBird.brain, 'bestBird.json');
}

function drawingStuff() {
  background(51);
  for (birdy of birds) {
    birdy.show();
  }
  for (let i = pipy.length - 1; i >= 0; i--) {
    pipy[i].show();
  }
  textAlign(CENTER);
  textSize(16);
  strokeWeight(4);
  stroke(50, 0, 100);
  fill(50, 50, 150);
  text("FLAPPY BIRD", width / 2, height / 10);
  stroke(50, 0, 100);
  fill(50, 150, 50);
  text("SCORE : " + score, 1.5 * width / 10, height / 5);
  text("AVG SCORE : " + nf(total_score / (num_gen - 1), 0, 1), 4.5 * width / 10, height / 5);
  text("MAX SCORE : " + maxScore, 8 * width / 10, height / 5);
  fill(50, 150, 50);
  text("Generation : " + num_gen, width / 2, 3 * height / 10);
  // drawing borders
  fill(0, 50);
  noStroke();
  rect(0, 0, width, BORDER);
  rect(0, height - BORDER, width, BORDER);
  rect(0, BORDER, BORDER, height - 2 * BORDER);
  rect(width - BORDER, BORDER, BORDER, height - 2 * BORDER);
}
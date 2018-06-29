function nextGeneration() {
  normalizeFitness();
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = pickOne();
  }
  // select best bird from savedBirds
  for (let i = 0; i < savedBirds.length; i++) {
    if (savedBirds[i].score > bestBird.score) {
      bestBird = new Bird(savedBirds[i].brain);
      bestBird.score = savedBirds[i].score;
    }
  }
  savedBirds = [];
}

function pickOne() {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r = r - savedBirds[index].fitness;
    index++;
  }
  index--;
  let bird = savedBirds[index];
  let child = new Bird(bird.brain);
  child.mutate(); // mutates by 0.1 by default, check mutate function in Bird class
  return child;
}

function normalizeFitness() {
  let sum = 0;
  for (let bird of savedBirds) {
    sum += bird.score;
  }
  for (let bird of savedBirds) {
    bird.fitness = bird.score / sum;
  }
}

function ResetGame() {
  pipy = [];
  pipy.push(new Pipe());
  dprev = width;
  // following stuff for analytics
  total_score += score;
  normalizedScores.push(map(score, 0, 1000, 0, height - 50));
  if (score > maxScore) {
    maxScore = score;
  }
  score = 0;
  counter = 0;
  //  drawingStuff();
}
let many, target, lifespan, mutationRate, popsize;

function setup() {
  createCanvas(1536, 755);
  lifespan = 1000;
  popsize = 200;
  mutationRate = 0.05;
  many = new Population(popsize);
  target = createVector(width - 100, height / 2);
}

function draw() {
  for (let i = 0; i < 11; i++) {
    if (many.allDotsDead()) {
      // genetic algorithm
      many.calculateFitness();
      many.naturalSelection();
      many.mutate(mutationRate);
      // noLoop();
    }
    many.update();
    // drawing text
    background(200);
    noStroke();
    textSize(20);
    fill(100, 175, 255);
    text("Population Size : " + popsize, width - 300, 50);
    text("Generation        : " + many.gen, width - 300, 70);
    text("Mutation Rate   : " + mutationRate, width - 300, 90);
    text("Min Steps to reach goal : " + nf(many.minSteps, 2, 0), width - 300, 110);
    // drawing obstacles
    fill(0);
    noStroke();
    rect(width * 0.33, 0, width / 50, height - 100);
    rect(width * 0.66, 100, width / 50, height - 100);
    translate(0, height);
    scale(1, -1);
    many.show();
    // drawing target
    fill(175, 0, 200);
    stroke(255);
    strokeWeight(2);
    ellipse(target.x, target.y, 32, 32);
  }
}
class Population {
  constructor(total) {
    this.dots = new Array(total);
    for (let i = 0; i < this.dots.length; i++) {
      this.dots[i] = new Dot();
    }
    this.gen = 1;
    this.bestIndex = 0;
    this.minSteps = lifespan;
  }
  update() {
    for (let dot of this.dots) {
      if (dot.genome.step > this.minSteps) {
        dot.dead = true;
      } else {
        dot.update();
      }
    }
  }
  show() {
    for (let dot of this.dots) {
      dot.show();
    }
  }
  allDotsDead() {
    for (let dot of this.dots) {
      if (!dot.dead) {
        return false;
      }
    }
    return true;
  }
  calculateFitness() {
    for (let dot of this.dots) {
      dot.calculateFitness();
    }
  }
  pickOne() {
    let index = 0;
    let r = random(1);
    while (r > 0) {
      r = r - this.dots[index].fitness;
      index++;
    }
    index--;
    return this.dots[index];
  }
  naturalSelection() {
    let newDots = new Array(this.dots.length);
    this.setBest();
    newDots[0] = this.dots[this.bestIndex].getChild();
    newDots[0].isBest = true;
    // calculating the fitness sum
    let fitnessSum = 0;
    for (let dot of this.dots) {
      fitnessSum += dot.fitness;
    }
    // normalizing fitness of each rocket
    for (let dot of this.dots) {
      dot.fitness = dot.fitness / fitnessSum;
    }
    for (let i = 1; i < this.dots.length; i++) {
      let parent = this.pickOne();
      newDots[i] = parent.getChild(); // there is no crossover, child is identical to the parent.
    }
    this.dots = newDots.slice(); // clone() is a java function for copying an object to another, like slice() in js.
    this.gen++;
  }
  mutate(mutationRate) {
    for (let i = 1; i < this.dots.length; i++) {
      this.dots[i].genome.mutate(mutationRate);
    }
  }
  setBest() {
    let max = 0.0;
    let maxIndex = 0;
    for (let i = 0; i < this.dots.length; i++) {
      if (this.dots[i].fitness > max) {
        max = this.dots[i].fitness;
        maxIndex = i;
      }
    }
    this.bestIndex = maxIndex;
    if (this.dots[this.bestIndex].reachedGoal) {
      this.minSteps = this.dots[this.bestIndex].genome.step;
    }
  }
}
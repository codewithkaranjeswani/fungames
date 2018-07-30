class Brain {
  constructor(size) {
    this.step = 0;
    this.directions = new Array(size);
    this.randomize();
  }

  randomize() {
    for (let i = 0; i < this.directions.length; i++) {
      this.directions[i] = p5.Vector.random2D();
    }
  }

  clone() {
    let creative = new Brain(this.directions.length);
    for (let i = 0; i < this.directions.length; i++) {
      creative.directions[i] = this.directions[i].copy();
    }
    return creative;
  }

  mutate(mutationRate) {
    for (let i = 0; i < this.directions.length; i++) {
      let r = random(1);
      if (r < mutationRate) {
        this.directions[i] = p5.Vector.random2D();
      }
    }
  }
}
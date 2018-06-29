class Bird {
  constructor(cap) {
    this.size = floor(width / 30);
    this.speed = 0;
    this.x = width / 5;
    this.y = height / 2;
    this.acc = 0.8;
    this.score = 0;
    this.fitness = 0;
    if (cap instanceof NeuralNetwork) {
      this.brain = cap.copy();
    } else {
      this.brain = new NeuralNetwork(5, 8, 2);
    }
  }

  think(pipes) {
    let minIndex = -1;
    let min_d = width;
    for (let i = 0; i < pipes.length; i++) {
      // pipe-end to bird-start distance is dis, used for collision detection!
      let dis = pipes[i].x - (this.x + this.size / 2);
      if (dis < min_d && dis >= 0) {
        min_d = dis;
        minIndex = i;
      }
    }
    let inputs = [];
    inputs[0] = (pipes[minIndex].x - this.x) / width;
    inputs[1] = pipes[minIndex].ytop / height;
    inputs[2] = pipes[minIndex].ybottom / height;
    inputs[3] = this.y / height;
    inputs[4] = map(this.speed, -5, 5, 0, 1);
    let outputs = this.brain.predict(inputs);
    if (outputs[1] > outputs[0]) {
      this.jump();
    }
  }

  mutate() {
    this.brain.mutate(0.1);
  }

  show() {
    noStroke();
    fill(200, 100, 200, 50);
    ellipse(this.x, this.y, this.size, this.size);
  }

  update() {
    this.score++;
    this.speed += this.acc;
    this.y += this.speed;
  }

  jump() {
    this.speed -= 12;
  }
};
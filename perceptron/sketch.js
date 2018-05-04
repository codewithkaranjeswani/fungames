let points = [];
let labelGiven = [];
let brain;

function drawLine() {
  stroke(0, 100, 100);
  line(-width / 2, -height / 2, width / 2, height / 2);
}

function drawCoordinateSystem() {
  translate(width / 2, height / 2);
  scale(1, -1);
  stroke(255);
  line(0, -height / 2, 0, height / 2);
  line(-width / 2, 0, width / 2, 0);
  push();
  // Y axis points down now
  scale(1, -1);
  textSize(25);
  stroke(0);
  strokeWeight(2);
  fill(255);
  text('X axis', width / 2 - 75, -10);
  rotate(-PI / 2);
  text('Y axis', height / 2 - 75, -10);
  rotate(PI / 2);
  pop();
}


function setup() {
  createCanvas(600, 600);
  drawCoordinateSystem();
  // using cartesian co-ordinate system
  // starting at bottom with x towords the right and y towards the top

  brain = new SingleNeuron;
  // creating labels for training
  for (let i = 0; i < 100; i++) {
    points[i] = [random(-width / 2, width / 2), random(-height / 2, height / 2)];
    // making labels
    if (points[i][1] > points[i][0]) {
      labelGiven.push(1);
    } else {
      labelGiven.push(0);
    }
  }
  noLoop();
}

function draw() {
  // using cartesian co-ordinate system
  // starting at bottom with x towords the right and y towards the top
  let initial = [];
  for (let i = 0; i < points.length; i++) {
    initial[i] = brain.guess(points[i]);
  }
  console.log('guesses made by the neuron are shown on screen');

  // for (let i = 0; i < points.length; i++) {
  //   brain.train(points[i], labelGiven);
  // }

  background(51);
  drawCoordinateSystem();
  drawLine();
  strokeWeight(2);
  for (let i = 0; i < points.length; i++) {
    if (labelGiven[i] == 1) {
      stroke(255);
    } else {
      stroke(0);
    }
    if (initial[i] == 1) {
      fill(0, 255, 0);
    } else {
      fill(255, 0, 0);
    }
    ellipse(points[i][0], points[i][1], 10, 10);
  }
}

function keyPressed() {
  if (key == ' ') {
    for (let i = 0; i < points.length; i++) {
      brain.train(points[i], labelGiven[i]);
    }
    redraw();
  }
}

// making a neuron that takes inputs and outputs 1 value (0 or 1)
class SingleNeuron {

  constructor() {
    this.lr = 0.1;
    this.weights = new Array(2);
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = random(-1, 1);
    }
  }

  guess(inputs) {
    // inputs are x and y co-ordinates, we have to normalize the inputs
    // by dividing each by the screen width (which is qual to height)
    // width = height, just for simplification!
    // dot product of inputs and weights
    if (inputs.length != this.weights.length) {
      console.log('Error in function guess, inputs.length != this.weights.length');
    }
    let dotproduct = 0
    for (let i = 0; i < this.weights.length; i++) {
      dotproduct += this.weights[i] * inputs[i];
    }
    // this is my activation function
    if (dotproduct > 0) {
      return 1;
    } else {
      return 0;
    }
  }

  train(inputs, label) {
    let guess = this.guess(inputs);
    let error = label - guess;
    // now change the weights

    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += error * inputs[i] * this.lr;
    }
  }
};
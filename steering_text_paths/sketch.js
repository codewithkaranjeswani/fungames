let cars;

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(800, 600);
  cars = [];
  // textAlign(CENTER, CENTER);
  // noStroke();
  // fill(255);
  // textFont(font);
  // textSize(256);
  // text('train', 125, 350);
  let points = font.textToPoints('train', 125, 350, 256);
  // stroke(255);
  // strokeWeight(8);
  for (elem of points) {
    let car = new Vehicle(elem.x, elem.y);
    cars.push(car);
  }
}

function draw() {
  background(51);
  for (car of cars) {
    car.update();
    car.behaviors();
    car.show();
  }
}

function mousePressed() {

}
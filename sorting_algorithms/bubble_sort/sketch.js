const numofBuildings = 50;
let buildings = [];
let eachWidth;
let i = 0;
let j;
let count = 0;

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function drawingStuff() {
  background(51);

  textSize(32);
  noStroke();
  fill(200, 0, 255, 150);
  text('Bubble Sort', 50, 50);

  stroke(200, 0, 255, 100);
  strokeWeight(50 / numofBuildings);
  fill(0, 255, 0, 100);
  for (let j = 0; j < buildings.length; j++) {
    rect(j * eachWidth, height, eachWidth, -buildings[j]);
  }
  fill(100, 0, 255, 150);
  rect(i * eachWidth, height, eachWidth, -buildings[i]);
  rect(j * eachWidth, height, eachWidth, -buildings[j]);
}

function setup() {
  createCanvas(800, 600);
  eachWidth = width / numofBuildings;

  for (let i = 0; i < numofBuildings; i++) {
    buildings[i] = floor(random(height - 15));
  }

  background(51);
  stroke(200, 0, 255, 100);
  strokeWeight(50 / numofBuildings);
  fill(0, 255, 0, 100);
  for (let i = 0; i < buildings.length; i++) {
    rect(i * eachWidth, height, eachWidth, -buildings[i]);
  }
}

function draw() {
  j = i + 1;

  drawingStuff();
  if (buildings[j] < buildings[i]) {
    swap(buildings, i, j);
    drawingStuff();
  }

  i++;
  if (i == buildings.length - 1 - count) {
    i = 0;
    count++;
  }
  if (i == buildings.length + 1) {
    noLoop();
    console.log('finished');
  }
}
const numofBuildings = 1000;
let buildings = [];
let eachWidth;
let i = 0;

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function drawingStuff(i, minIndex) {
  background(51);

  textSize(32);
  noStroke();
  fill(200, 0, 255, 150);
  text('Selection Sort', 50, 50);

  stroke(200, 0, 255, 100);
  strokeWeight(50 / numofBuildings);
  fill(0, 255, 0, 100);
  for (let j = 0; j < buildings.length; j++) {
    rect(j * eachWidth, height, eachWidth, -buildings[j]);
  }
  fill(100, 0, 255, 150);
  rect(i * eachWidth, height, eachWidth, -buildings[i]);
  rect(minIndex * eachWidth, height, eachWidth, -buildings[minIndex]);
}

function drawingSpecial() {
  background(51);

  textSize(32);
  noStroke();
  fill(200, 0, 255, 150);
  text('Selection Sort', 50, 50);

  stroke(200, 0, 255, 100);
  strokeWeight(50 / numofBuildings);
  fill(0, 255, 0, 100);
  for (let i = 0; i < buildings.length; i++) {
    rect(i * eachWidth, height, eachWidth, -buildings[i]);
  }
}

function setup() {
  createCanvas(800, 600);
  eachWidth = width / numofBuildings;

  for (let i = 0; i < numofBuildings; i++) {
    buildings[i] = floor(random(height - 15));
  }
  drawingSpecial();
}

function draw() {

  let min = buildings[i];
  let minIndex = i;

  for (let j = i; j < buildings.length; j++) {
    if (buildings[j] < min) {
      min = buildings[j];
      minIndex = j;
    }
  }

  drawingStuff(i, minIndex);
  swap(buildings, i, minIndex);
  drawingStuff(i, minIndex);
  i++;
  if (i == buildings.length - 1) {
    noLoop();
    drawingSpecial();
    console.log('finished');
  }
}
const numofBuildings = 1000;
let buildings = [];
let eachWidth;
let i = 0;

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function drawingStuff(index) {
  background(51);

  textSize(32);
  noStroke();
  fill(200, 0, 255, 150);
  text('Insertion Sort', 50, 50);

  stroke(200, 0, 255, 100);
  strokeWeight(50 / numofBuildings);
  fill(0, 255, 0, 100);
  for (let j = 0; j < buildings.length; j++) {
    rect(j * eachWidth, height, eachWidth, -buildings[j]);
  }
  fill(100, 0, 255, 150);
  rect(index * eachWidth, height, eachWidth, -buildings[index]);
  rect(i * eachWidth, height, eachWidth, -buildings[i]);
}

function drawingSpecial() {
  background(51);

  textSize(32);
  noStroke();
  fill(200, 0, 255, 150);
  text('Insertion Sort', 50, 50);

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

  let key = buildings[i];
  let index = -1;
  for (let j = i; j >= 0; j--) {
    if (key < buildings[j]) {
      index = j;
    }
  }
  if (index != -1) {
    buildings.splice(index, 0, key);
    buildings.splice(i + 1, 1);
    drawingStuff(index);
  } else {
    drawingStuff(i);
  }

  i++;
  if (i == buildings.length) {
    noLoop();
    drawingSpecial();
    console.log('finished');
  }
}
let totalCities = 7;
let cities = [];
let order = [];
let bestorder = [];
let current;
let best;
let index_i, index_j;
let count = 1;
let total_perms;

function factorial(n) {
  if (n <= 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function calcDistance(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    d = dist(arr[order[i]].x, arr[order[i]].y, arr[order[i + 1]].x, arr[order[i + 1]].y);
    sum += d;
  }
  return sum;
}

function lexicalOrder() {
  count++;
  let index_i = -1;
  for (let i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i + 1]) {
      index_i = i;
    }
  }
  if (index_i == -1) {
    noLoop();
    console.log("finished!");
    // console.log("minimum distance = " + best);
  }

  let index_j = -1;

  for (let i = 0; i < order.length; i++) {
    if (order[index_i] < order[i]) {
      index_j = i;
    }
  }

  swap(order, index_i, index_j);

  for (let i = index_i + 1; i < index_i + 1 + (order.length - 1 - index_i - 1) / 2; i++) {
    swap(order, i, order.length - i + index_i);
  }
  if (count == total_perms / 2 + 1) {
    noLoop();
    console.log("finished!");
  }
}

function setup() {
  createCanvas(600, 600);

  for (let i = 0; i < totalCities; i++) {
    cities[i] = createVector(floor(random(16, width - 16)), floor(random(16, height / 3 - 16)));
    order[i] = i;
    // console.log(cities[i]);
  }
  best = calcDistance(cities);
  bestorder = order.slice();

  total_perms = factorial(totalCities);
  console.log(total_perms + ' permutations, but have to check ' + total_perms / 2 + ' times!');
}

function draw() {
  background(51);

  fill(255, 0, 255, 150);
  noStroke();
  for (let i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }

  stroke(255, 0, 255, 150);
  strokeWeight(4);
  noFill();
  beginShape();
  for (var i = 0; i < order.length; i++) {
    var n = bestorder[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();

  fill(255);
  noStroke();
  for (let i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y + height / 3, 8, 8);
  }

  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for (let i = 0; i < cities.length; i++) {
    let n = order[i];
    vertex(cities[n].x, cities[n].y + height / 3);
  }
  endShape();

  current = calcDistance(cities);

  if (current < best) {
    best = current;
    bestorder = order.slice();
  }

  textSize(32);
  fill(255);
  stroke(255, 0, 255, 100);
  strokeWeight(2);
  let s = '';
  for (let i = 0; i < order.length; i++) {
    s += order[i];
  }
  text(s, 30, height - 50);
  let percent = 2 * count / total_perms * 100;
  text(nf(percent, 0, 2) + '% complete', 300, height - 50);

  lexicalOrder();
}
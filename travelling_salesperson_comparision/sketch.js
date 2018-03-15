let totalCities = 10;

let population = 50;
let mutationRate = 0.5;
let popList = [];
let fitness = [];
let order = [];
let current;
let best;
let bestorder = [];

let cities = [];
let order_lexical = [];
let best_order_lexical = [];
let current_lex;
let best_lex;
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

function calcDistance(arr, order) {
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
  for (let i = 0; i < order_lexical.length - 1; i++) {
    if (order_lexical[i] < order_lexical[i + 1]) {
      index_i = i;
    }
  }
  if (index_i == -1) {
    noLoop();
    // console.log("finished!");
    // console.log("minimum distance = " + best);
  }

  let index_j = -1;

  for (let i = 0; i < order_lexical.length; i++) {
    if (order_lexical[index_i] < order_lexical[i]) {
      index_j = i;
    }
  }

  swap(order_lexical, index_i, index_j);

  for (let i = index_i + 1; i < index_i + 1 + (order_lexical.length - 1 - index_i - 1) / 2; i++) {
    swap(order_lexical, i, order_lexical.length - i + index_i);
  }
  if (count == total_perms / 2 + 1) {
    noLoop();
    console.log("finished!");
  }
}

function createPop(order) {
  let arr = [];
  for (let i = 0; i < population; i++) {
    order = shuffle(order);
    arr.push(order);
  }
  return arr;
}

function calcFitness(popList) {
  for (let i = 0; i < popList.length; i++) {
    current = calcDistance(cities, popList[i]);
    fitness[i] = 1 / (d + 1);
    if (current < best) {
      best = current;
      bestorder = popList[i].slice();
    }
  }
  let sum = 0;
  for (let i = 0; i < fitness.length; i++) {
    sum += fitness[i];
  }
  for (let i = 0; i < fitness.length; i++) {
    fitness[i] = fitness[i] / sum;
  }
}

function PickOne(list, prob) {
  let index = 0;
  let rnd = random(1);
  while (rnd >= 0) {
    rnd = rnd - prob[index];
    index++;
  }
  index--;
  return list[index];
}

function mutate(order, mr) {
  let rnd = random(1);
  if (rnd < mr) {
    let i = floor(random(order.length));
    let j = floor(random(order.length));
    swap(order, i, j);
  }
}

function nextGen(popList, mr) {
  let newPop = [];
  for (let i = 0; i < popList.length; i++) {
    let order = PickOne(popList, fitness);
    mutate(order, mr);
    newPop[i] = order;
  }
  popList = newPop;
}

function setup() {
  createCanvas(600, 600);

  for (let i = 0; i < totalCities; i++) {
    cities[i] = createVector(floor(random(16, width - 16)), floor(random(16, height / 2 - 16)));
    order[i] = i;
  }
  total_perms = factorial(totalCities);
  order_lexical = order.slice();
  best_order_lexical = order_lexical.slice();
  best_lex = Infinity;
  best = Infinity;
}

function draw() {
  background(51);

  popList = createPop(order);
  calcFitness(popList);
  nextGen(popList, mutationRate);

  stroke(255, 100);
  strokeWeight(1);
  line(0, height / 2, width, height / 2);

  fill(255, 0, 255, 150);
  noStroke();
  for (let i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }

  stroke(255, 0, 255, 150);
  strokeWeight(4);
  noFill();
  beginShape();
  for (var i = 0; i < bestorder.length; i++) {
    var n = bestorder[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();

  fill(255);
  noStroke();
  for (let i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y + height / 2, 8, 8);
  }

  stroke(255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let i = 0; i < best_order_lexical.length; i++) {
    let n = best_order_lexical[i];
    vertex(cities[n].x, cities[n].y + height / 2);
  }
  endShape();

  current_lex = calcDistance(cities, order_lexical);
  if (current_lex < best_lex) {
    best_lex = current_lex;
    best_order_lexical = order_lexical.slice();
  }

  textSize(16);
  fill(255, 255, 0, 100);
  noStroke();
  // let s = '';
  // for (let i = 0; i < order_lexical.length; i++) {
  //   s += order_lexical[i];
  // }
  // text(s, 30, height / 2 + 40);
  let percent = 2 * count / total_perms * 100;
  text('Brute Force Solution', 30, height / 2 + 40);
  text('Genetic Algorithm', 30, 40);
  text('population = ' + population + ', mutation Rate = ' + mutationRate, 330, 40);
  text(nf(percent, 0, 2) + '% complete', 450, height / 2 + 40);

  lexicalOrder();
}
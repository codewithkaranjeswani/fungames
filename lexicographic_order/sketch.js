let order = [];
let count;

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function setup() {
  createCanvas(600, 400);
  order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  count = 1;
}

function draw() {
  background(51);
  let index_i = -1;
  for (let i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i + 1]) {
      index_i = i;
    }
  }
  if (index_i == -1) {
    noLoop();
    console.log("finished!");
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
  count++;

  textSize(64);
  fill(255);
  let s = '';
  for (let i = 0; i < order.length; i++) {
    s += order[i];
  }
  text(s, 70, height / 2);

}
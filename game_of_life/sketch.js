let grid, next;
let rows, cols;
const len = 5;

function setup() {
  createCanvas(810, 730);
  rows = Math.floor((height - 10) / len);
  cols = Math.floor((width - 10) / len);
  grid = make2DArray(rows, cols);
  next = make2DArray(rows, cols);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      // let r = Math.random();
      // if (r < 0.1) {
      //   grid[i][j] = Math.floor(2 * Math.random());
      // } else {
      //   grid[i][j] = 0;
      // }
      if (i > 2 && i < 10 && j > 7 && j < 10) {
        grid[i][j] = 1;
      } else {
        grid[i][j] = 0;
      }

      next[i][j] = 0;
    }
  }
}

function draw() {
  background(51);
  stroke(0);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == 0) {
        fill(55);
      } else if (grid[i][j] == 1) {
        fill(200);
      } else {
        console.log('error');
      }
      rect(j * len + 5, i * len + 5, len, len);

    }
  }
  // Compute next based on grid
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let state = grid[i][j];
      // Count live neighbors!
      let neighbours = countNeighbours(grid, i, j);
      if (state == 0 && neighbours == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbours < 2 || neighbours > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }
  grid = next.slice();
}

function make2DArray(rows, cols) {
  let arr = new Array(rows);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
  }
  return arr.slice();
}

function countNeighbours(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let row = (x + i + rows) % rows;
      let col = (y + j + cols) % cols;
      sum += grid[row][col];
    }
  }
  sum -= grid[x][y];
  return sum;
}
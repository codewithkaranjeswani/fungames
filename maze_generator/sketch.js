let rows, cols;
const len = 40;
let grid;
let current;
let visitedCells;
let stack;

function setup() {
  createCanvas(850, 770);
  rows = Math.floor((width - 50) / len);
  cols = Math.floor((height - 50) / len);
  stack = [];
  grid = [];
  visitedCells = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid.push(new Cell(i, j));
    }
  }
  current = grid[0];
  current.visited = true;
  visitedCells.push(current);
}

function index(i, j) {
  if (i < 0 || j < 0 || i > rows - 1 || j > cols - 1) {
    return -1;
  }
  return i * cols + j;
}

function removeWalls(a, b) {
  let x = b.i - a.i;
  if (x == 1) {
    // B is on right of A
    b.walls[3] = false;
    a.walls[1] = false;
  } else if (x == -1) {
    // B is on left of A
    b.walls[1] = false;
    a.walls[3] = false;
  }
  let y = b.j - a.j;
  if (y == 1) {
    // B is on top of A
    b.walls[2] = false;
    a.walls[0] = false;
  } else if (y == -1) {
    // B is on bottom of A
    b.walls[0] = false;
    a.walls[2] = false;
  }
}

function draw() {
  translate(0, height);
  scale(1, -1);
  translate(25, 25);
  background(200);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  current.highlight();
  // STEP 1: Add a neighbour, if possible.
  let next = current.getNeighbour();
  if (next) {
    next.visited = true;
    visitedCells.push(next);
    // STEP 2:
    stack.push(current);
    // STEP 3: Remove walls
    removeWalls(current, next);
    // STEP 4: Make neighbour = current.
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
}
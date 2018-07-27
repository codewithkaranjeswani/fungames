let grid, langton;
let rows, cols;
let b, h;

function setup() {
  createCanvas(windowWidth, windowHeight);
  b = 5;
  h = 5;
  cols = floor((width - 10) / b);
  rows = floor((height - 10) / h);

  grid = new Array(cols);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(rows);
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }
  let initial = createVector(floor(cols / 2), floor(rows / 2));
  langton = new Ant(initial.x, initial.y);
}

function draw() {
  translate(0, height);
  scale(1, -1);
  background(200);
  // draw each elem
  for (col of grid) {
    for (elem of col) {
      elem.show();
    }
  }
  langton.show();
  for (let i = 0; i < 200; i++) {
    langton.move();
  }
}
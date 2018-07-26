class Spot {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.g = 0;
    this.h = 0;
    this.f = 0;
    this.neighbours = [];
    this.previous = undefined;
    if (random(1) < 0.4) {
      this.wall = true;
    } else {
      this.wall = false;
    }
  }

  show(col) {
    // fill(col);
    noFill();
    if (this.wall) {
      fill(0);
    }
    noStroke();
    ellipse(this.i * b + 5, this.j * h + 5, b / 2, h / 2);
    // rect(this.i * b + 5, this.j * h + 5, b, h);
  }

  addNeighbours(grid) {
    if (this.i < cols - 1) {
      this.neighbours.push(grid[this.i + 1][this.j]);
    }
    if (this.i > 0) {
      this.neighbours.push(grid[this.i - 1][this.j]);
    }
    if (this.j < rows - 1) {
      this.neighbours.push(grid[this.i][this.j + 1]);
    }
    if (this.j > 0) {
      this.neighbours.push(grid[this.i][this.j - 1]);
    }
    if (this.i > 0 && this.j > 0) {
      this.neighbours.push(grid[this.i - 1][this.j - 1]);
    }
    if (this.i < cols - 1 && this.j > 0) {
      this.neighbours.push(grid[this.i + 1][this.j - 1]);
    }
    if (this.i > 0 && this.j < rows - 1) {
      this.neighbours.push(grid[this.i - 1][this.j + 1]);
    }
    if (this.i < cols - 1 && this.j < rows - 1) {
      this.neighbours.push(grid[this.i + 1][this.j + 1]);
    }
  }
}
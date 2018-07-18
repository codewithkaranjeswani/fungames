class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true]; // [top, right, bottom, left]
    this.visited = false;
  }

  show() {
    let x = this.i * len;
    let y = this.j * len;
    if (this.visited) {
      noStroke();
      fill(200, 100, 255);
      rect(x, y, len, len);
    }
    stroke(0);
    strokeWeight(2);
    if (this.walls[0])
      line(x, y + len, x + len, y + len);
    if (this.walls[1])
      line(x + len, y, x + len, y + len);
    if (this.walls[2])
      line(x, y, x + len, y);
    if (this.walls[3])
      line(x, y, x, y + len);
  }

  highlight() {
    let x = this.i * len;
    let y = this.j * len;
    noStroke();
    fill(100, 220, 100);
    rect(x, y, len, len);
  }

  getNeighbour() {
    let neighbours = [];
    let i = this.i;
    let j = this.j;
    let top = grid[index(i, j + 1)];
    let bottom = grid[index(i, j - 1)];
    let right = grid[index(i + 1, j)];
    let left = grid[index(i - 1, j)];

    if (top && !top.visited) {
      neighbours.push(top);
    }
    if (right && !right.visited) {
      neighbours.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbours.push(bottom);
    }
    if (left && !left.visited) {
      neighbours.push(left);
    }

    if (neighbours.length > 0) {
      let r = Math.floor(neighbours.length * Math.random());
      return neighbours[r];
    } else {
      return undefined;
    }
  }
}
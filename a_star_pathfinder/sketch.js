let grid;
let rows, cols;
let b, h;
let openSet, closedSet;
let start, end;
let path;

function heuristic(a, b) {
  return dist(a.i, a.j, b.i, b.j);
  // return (abs((a.i - b.i)) + abs((a.j - b.j)));
}

function setup() {
  createCanvas(810, 810);
  path = [];
  openSet = [];
  closedSet = [];
  b = 10;
  h = 10;
  rows = (height - 10) / h;
  cols = (width - 10) / b;
  grid = new Array(cols); // to refer to the x co-ordinate
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(rows); // to refer to the x co-ordinate
  }
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  for (col of grid) {
    for (elem of col) {
      elem.addNeighbours(grid);
    }
  }
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;
  openSet.push(start);
}

function draw() {
  background(200);
  if (openSet.length > 0) {
    // solve
    let winner = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    let current = openSet[winner];
    // find the path
    path = [];
    let temp = current;
    path.push(temp);
    while (temp.previous) {
      path.push(temp.previous);
      temp = temp.previous;
    }
    if (current == end) {
      // found the solution
      console.log("done!");
      noLoop();
    }
    openSet.splice(winner, 1);
    closedSet.push(current);
    for (neighbour of current.neighbours) {
      // if the neighbour is not in the closedSet, then update value of tentative g
      // why tentative, b'coz it is possible that it may have a lower g value
      // that is possible only if it is in the openSet.

      // this is the value of g via current path
      // if the neighbour is in the openSet, then it already has a g value!
      // thus, first checking with that and then assigning g value

      // RULE: any neighbour must have a g value before it goes into the openSet
      // THEORY: (works!)
      // 1. if it is in the closedSet: do nothing
      // 2. if it is in the openSet:   calculate g via current path,
      //    and compare with its g value, keep whichever is shortest
      // 3. if it is neither in the openSet or closedSet: add it to the openSet

      if (!closedSet.includes(neighbour) && !neighbour.wall) {
        let tempG = current.g + 1;
        let better = false;
        if (openSet.includes(neighbour)) {
          if (tempG < neighbour.g) {
            neighbour.g = tempG;
            better = true;
          }
        } else {
          neighbour.g = tempG;
          better = true;
          openSet.push(neighbour);
        }
        if (better) {
          neighbour.h = heuristic(neighbour, end);
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.previous = current;
        }
      }
    }
  } else {
    // no solution
    console.log("no solution");
    noLoop();
  }
  for (row of grid) {
    for (elem of row) {
      elem.show(color(255));
    }
  }
  // for (elems of openSet) {
  //   elems.show(color(0, 255, 0));
  // }
  // for (elems of closedSet) {
  //   elems.show(color(255, 0, 0));
  // }
  for (elems of path) {
    elems.show(color(0, 0, 255));
  }
  noFill();
  stroke(175, 100, 255);
  strokeWeight(b / 2);
  beginShape();
  for (elems of path) {
    vertex(elems.i * b + b / 2, elems.j * h + h / 2);
  }
  endShape();
}
let vertices;
const len = 16;

function setup() {
  createCanvas(800, 720);
  vertices = [];
  background(51);
}

function mousePressed() {
  background(51);
  vertices.push([mouseX, mouseY]);
  prims_algo();
}

function prims_algo() {
  fill(255);
  noStroke();
  for (let i = 0; i < vertices.length; i++) {
    ellipse(vertices[i][0], vertices[i][1], len, len);
  }
  let unreached = [];
  let reached = [];
  unreached = vertices.slice();

  if (unreached.length > 0) {
    reached.push(unreached[0]);
    unreached.splice(0, 1);
  }
  while (unreached.length > 0) {
    let min = Infinity;
    let uIndex;
    let rIndex;
    for (let i = 0; i < unreached.length; i++) {
      for (let j = 0; j < reached.length; j++) {
        let v1 = unreached[i];
        let v2 = reached[j];
        let d = dist(v1[0], v1[1], v2[0], v2[1]);
        if (d < min) {
          min = d;
          uIndex = i;
          rIndex = j;
        }
      }
    }
    let x1 = reached[rIndex][0];
    let y1 = reached[rIndex][1];
    let x2 = unreached[uIndex][0];
    let y2 = unreached[uIndex][1];

    stroke(255);
    strokeWeight(2);
    line(x1, y1, x2, y2);
    reached.push(unreached[uIndex]);
    unreached.splice(uIndex, 1);
  }
}
// code not complete.. Problem with 3 obstacles
let x, y, count, len = 10;
let keeptrack = [];
let allowed, co = 0;
let alpha = 255;
let i, j;

function setup() {
  createCanvas(400, 400);
  background(51);
  x = width / 2;
  y = height / 2;
  // noStroke();
  fill(200, 255, 150, alpha);
  rect(x, y, len, len);
  keeptrack.push([x, y]);

  for (j = 0; j < 2 * len; j += len) {
    for (i = 0; i < width; i += len) {
      fill(100, 200, 250, 200);
      rect(i, j, len, len);
      keeptrack.push([i, j]);
    }
  }
  for (j = height - len; j > height - 3 * len; j -= len) {
    for (i = 0; i < width; i += len) {
      rect(i, j, len, len);
      keeptrack.push([i, j]);
    }
  }
  for (i = 0; i < 2 * len; i += len) {
    for (j = 2 * len; j < height - 2 * len; j += len) {
      rect(i, j, len, len);
      keeptrack.push([i, j]);
    }
  }
  for (i = width - len; i > width - 3 * len; i -= len) {
    for (j = 2 * len; j < height - 2 * len; j += len) {
      rect(i, j, len, len);
      keeptrack.push([i, j]);
    }
  }

  // frameRate(20);
}

function draw() {
  count = 0;

  select = floor(random(4));
  let obs = new Array();
  for (let i = 0; i < keeptrack.length - 1; i++) {
    if ((x + len) == keeptrack[i][0] && y == keeptrack[i][1]) obs.push('right');
    if ((x - len) == keeptrack[i][0] && y == keeptrack[i][1]) obs.push('left');
    if (x == keeptrack[i][0] && (y + len) == keeptrack[i][1]) obs.push('down');
    if (x == keeptrack[i][0] && (y - len) == keeptrack[i][1]) obs.push('up');
  }
  // console.log(keeptrack);
  // console.log(obs);
  if (obs.length == 1) {
    if (obs[0] == 'right') {
      while (select == 0) select = floor(random(4));
    }
    if (obs[0] == 'left') {
      while (select == 1) select = floor(random(4));
    }
    if (obs[0] == 'down') {
      while (select == 2) select = floor(random(4));
    }
    if (obs[0] == 'up') {
      while (select == 3) select = floor(random(4));
    }
  }
  if (obs.length == 2) {
    if ((obs[0] == 'right' && obs[1] == 'left') || (obs[1] == 'right' && obs[0] == 'left')) {
      while (select == 0 || select == 1) select = floor(random(4));
    }
    if ((obs[0] == 'right' && obs[1] == 'down') || (obs[1] == 'right' && obs[0] == 'down')) {
      while (select == 0 || select == 2) select = floor(random(4));
    }
    if ((obs[0] == 'right' && obs[1] == 'up') || (obs[1] == 'right' && obs[0] == 'up')) {
      while (select == 0 || select == 3) select = floor(random(4));
    }
    if ((obs[0] == 'left' && obs[1] == 'down') || (obs[1] == 'left' && obs[0] == 'down')) {
      while (select == 1 || select == 2) select = floor(random(4));
    }
    if ((obs[0] == 'left' && obs[1] == 'up') || (obs[1] == 'left' && obs[0] == 'up')) {
      while (select == 1 || select == 3) select = floor(random(4));
    }
    if ((obs[0] == 'down' && obs[1] == 'up') || (obs[1] == 'down' && obs[0] == 'up')) {
      while (select == 2 || select == 3) select = floor(random(4));
    }
  }
  if (obs.length == 3) {
    co = 0;
    for (let i = 0; i <= obs.length; i++) {
      if (obs[i] == 'right') co++;
    }
    if (co == 0) select = 0;

    co = 0;
    for (let i = 0; i <= obs.length; i++) {
      if (obs[i] == 'left') co++;
    }
    if (co == 0) select = 1;

    co = 0;
    for (let i = 0; i <= obs.length; i++) {
      if (obs[i] == 'down') co++;
    }
    if (co == 0) select = 2;

    co = 0;
    for (let i = 0; i <= obs.length; i++) {
      if (obs[i] == 'up') co++;
    }
    if (co == 0) select = 3;
  }

  if (obs.length == 4) {
    console.log('game over');
    exit();
  }
  // console.log(obs);
  //
  // if (select == 0) console.log('right');
  // if (select == 1) console.log('left');
  // if (select == 2) console.log('down');
  // if (select == 3) console.log('up');

  while (true) {
    switch (select) {
      case 0:
        x += len; // go right
        break;
      case 1:
        x -= len; // go left
        break;
      case 2:
        y += len; // go down
        break;
      case 3:
        y -= len; // go up
        break;
    }
    if (x >= (width - 2 * len)) x = width - 2 * len;
    if (x <= 2 * len) x = 2 * len;
    if (y >= (height - 2 * len)) y = height - 2 * len;
    if (y <= 2 * len) y = 2 * len;

    allowed = true;
    for (let i = keeptrack.length - 1; i >= 0; i--) {
      if (x == keeptrack[i][0] && y == keeptrack[i][1]) {
        // console.log('colliding');
        fill(random(255), random(255), random(255));
        allowed = false;
        break;
      }
    }
    if (allowed)
      break;
    else {
      x = keeptrack[keeptrack.length - 1][0];
      y = keeptrack[keeptrack.length - 1][1];
      count++;
      // console.log(count);
    }
    if (count >= 100) break;
  }
  // noStroke();
  // fill(random(255), random(255), random(255));
  alpha -= 5;
  if (alpha <= 50) alpha = 255;
  fill(0, 255, 150, alpha);
  rect(x, y, len, len);
  if (!(keeptrack[keeptrack.length - 1][0] == x && keeptrack[keeptrack.length - 1][1] == y)) {
    keeptrack.push([x, y]);
  }
}
let rhr = 80;
let rmin = 120;
let rsec = 150;

function belongsto(i, arr) {
  for (let j = 0; j < arr.length; j++) {
    if (i == arr[j]) {
      return true;
    }
  }
  return false;
}

function nonrepeating_random(arr, n) {
  let sol = new Array(n);
  for (let i = 0; i < sol.length; i++) {
    let rnd = floor(random(arr.length));
    sol[i] = arr[rnd];
    arr.splice(rnd, 1);
  }
  return sol;
}

function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES);
  frameRate(1);
}

function draw() {
  background(0);

  textAlign(CENTER);
  textSize(64);
  strokeWeight(4);
  stroke(100, 200, 255);
  fill(150, 70, 180);
  text('TIX CLOCK', width / 2, 100);


  translate(width / 2, height / 2 + 100);

  let hr = hour();
  let min = minute();
  let sec = second();

  textAlign(CENTER);
  textSize(64);
  stroke(255, 0, 255);
  fill(255);
  text(nf(hr, 2) + ':' + nf(min, 2), 0, -1 / 3 * height);

  rectMode(CENTER);
  strokeWeight(4);
  stroke(255);
  fill(51);
  rect(0, 0, 700, 250);

  stroke(255);
  ///////////////////////////////////////////////////////////////////////////
  // hour digits
  let hourtens = floor(hr / 10);
  let randone = nonrepeating_random([0, 1, 2], hourtens);
  for (let i = 0; i < 3; i++) {
    noFill();
    if (belongsto(i, randone)) {
      fill(100, 100, 255);
    }
    rect(-275, -50 + 50 * i, 50, 50);
  }
  ///////////////////////////////////////////////////////////////////////////
  let hourunits = hr % 10;
  let randtwo = nonrepeating_random([0, 1, 2, 3, 4, 5, 6, 7, 8], hourunits);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      noFill();
      let index = (i + j) + 2 * i;
      if (belongsto(index, randtwo)) {
        fill(100, 100, 0);
      }
      rect(-175 + 50 * i, -50 + 50 * j, 50, 50);
    }
  }
  ///////////////////////////////////////////////////////////////////////////
  // minute digits
  let mintens = floor(min / 10);
  let randthree = nonrepeating_random([0, 1, 2, 3, 4, 5], mintens);
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++) {
      noFill();
      let index = (i + j) + 2 * i;
      if (belongsto(index, randthree)) {
        fill(50, 200, 50);
      }
      rect(25 + i * 50, -50 + 50 * j, 50, 50);
    }
  }

  ///////////////////////////////////////////////////////////////////////////
  let minunits = floor(min % 10);
  let randfour = nonrepeating_random([0, 1, 2, 3, 4, 5, 6, 7, 8], minunits);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      noFill();
      let index = (i + j) + 2 * i;
      if (belongsto(index, randfour)) {
        fill(0, 100, 200);
      }
      rect(175 + i * 50, -50 + 50 * j, 50, 50);
    }
  }
  ///////////////////////////////////////////////////////////////////////////


}

// saving json files!
// don't have a createVector(), or any other predefined object in your class,
// (if you are saving an object of that class in JSON using save() or saveJSON() function)
// otherwise p5.js throws an error stating "uncaught type error: converting circular structure to JSON"
// also do not use cdn links for p5.js library, include the library from the directory, otherwise you get some warning

let spritedata;
let spritesheet;
let horses;

function preload() {
  spritesheet = loadImage('horse-spritesheet.png');
  spritedata = loadJSON('horse-spritedata.json');
}

function setup() {
  createCanvas(576, 432); // (192 * 3, 144 * 3)
  let animation = [];
  for (let i = 0; i < spritedata.frames.length; i++) {
    let pos = spritedata.frames[i].pos;
    let w = spritedata.frames[i].w;
    let h = spritedata.frames[i].h;
    let img = spritesheet.get(pos.x, pos.y, w, h);
    animation.push(img);
  }
  horses = [];
  for (let i = 0; i < 3; i++) {
    horses[i] = new Sprite(random(0.2, 0.3), createVector(random(192, width - 192), 144 * i), animation); // speed = 0.2
  }
}

function saveFile() {
  let spritesheet = new Array(7);
  let i = 0;
  let j = 0;
  let count = 0;
  while (count < 7) {
    spritesheet[count] = new Sprite(i * 192, j * 144);
    i++;
    if (i > 2) {
      i = 0;
      j++;
    }
    count++;
  }
  saveJSON(spritesheet, 'horse-spritedata.json');
}

function draw() {
  background(200);
  for (let horse of horses) {
    horse.show();
    horse.update();
  }
}
let ants = [];

function setup() {
  createCanvas(700, 400);
  for (let i = 0; i < 10; i++) {
    ants[i] = new Ant(i * 50 + 125);
    ants[i].provide_speeds();
  }
  ants[0].colour(255, 255, 255);
  ants[1].colour(0, 255, 0);
  ants[2].colour(0, 255, 255);
  ants[3].colour(0, 0, 255);
  ants[4].colour(100, 0, 255);
  ants[5].colour(255, 0, 0);
  ants[6].colour(200, 255, 0);
  ants[7].colour(255, 0, 0);
  ants[8].colour(100, 100, 255);
  ants[9].colour(50, 40, 255);

}

function draw() {
  background(51);
  stroke(0);
  line(100, 200, 600, 200);
  for (let i = 0; i < 10; i++) {
    ants[i].pleaseappear();
    ants[i].pleasemove();
  }
  // let phi = (ants[0].pos_x() - ants[1].pos_x());
  // console.log(phi);
  if (abs(ants[0].pos_x() - ants[1].pos_x()) < 0.00001) {
    ants[0].reverse_speed();
    // console.log(phi);
  }
  for (let i = 1; i < 9; i++) {
    if (abs(ants[i].pos_x() - ants[i + 1].pos_x()) < 0.00001 || (ants[i].pos_x() - ants[i - 1].pos_x()) < 0.00001) {
      ants[i].reverse_speed();
    }
  }
  if (abs(ants[9].pos_x() - ants[8].pos_x()) < 0.00001) {
    ants[9].reverse_speed();
  }
}

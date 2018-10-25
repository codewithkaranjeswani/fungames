// play(), pause(), stop(), jump(),
// rate(), pan() and setVolume() tutorial!!

// loopey and dragging of the sound track to any moment in time
// is not working out with slider, so I will go for createCanvas method!

let song;
let vol, rat, pane;
let playButton, stopButton, tempx, tempy;
let motion;
let val, star;
let amp;
let hist;

function loaded() {
  star = true;
  createP("Music Player :");

  playButton = createButton("Play");
  playButton.mousePressed(toggleSong);

  stopButton = createButton("Stop");
  stopButton.mousePressed(stopSong);

  createP("Volume Control :");
  vol = createSlider(0, 1, 0.05, 0.01);

  createP("Special features :");
  createP("Rate :");
  rat = createSlider(0.5, 1.5, 1, 0.01);
  tempx = createButton("reset to default rate");
  tempx.mousePressed(resetRate);

  createP("Pan :");
  pane = createSlider(0, 1, 0.5, 0.01);
  tempy = createButton("reset to default pan");
  tempy.mousePressed(resetPan);
}

function setup() {
  createCanvas(400, 200);
  hist = [];
  val = 0;
  star = false;
  song = loadSound("music-0.mp3", loaded);
  amp = new p5.Amplitude();

  background(200, 12);
  noFill();
  strokeWeight(2);
  stroke(0);
  rect(0, 0, width - 1, height - 1);

  stroke(255);
  rect(50, 75, 300, 50);
}

function draw() {
  background(200, 12);
  noFill();
  strokeWeight(2);
  stroke(0);
  rect(0, 0, width - 1, height - 1);

  stroke(255);
  rect(50, 75, 300, 50);

  textSize(16);
  noStroke();
  fill(255);
  text(0, 45, 145);
  text(int(song.duration()), 345, 145);


  if (star) {
    let loud = amp.getLevel();
    loud *= 5000;

    hist.push(loud);
    if (hist.length > width) {
      hist.splice(0, 1);
    }
    stroke(25, 255, 150, 10);
    strokeWeight(1);
    for (let i = 0; i < hist.length; i++) {
      line(i, hist[i], i, height - hist[i]);
    }

    song.setVolume(vol.value());
    song.rate(rat.value());
    song.pan(pane.value());

    if (song.isPlaying() && song.currentTime() != 0) {
      let d = map(song.currentTime(), 0, song.duration(), 0, 300);
      fill(255);
      rect(50, 75, d, 50);
    } else {
      fill(255);
      rect(50, 75, val, 50);
    }
    noStroke();
    fill(50, 150, 250, 50);
    ellipse(width / 2, height / 2, loud, loud);
  }
}

function mousePressed() {
  if (mouseY >= 75 && mouseY <= 125) {
    if (mouseX >= 50 && mouseX <= 350) {
      let y = map(mouseX - 50, 0, 300, 0, song.duration());
      if (!song.isPlaying() || song.currentTime() == 0) {
        song.jump(y);
        val = mouseX - 50;
      } else {
        song.jump(y);
      }
    }
  }
}

function toggleSong() {
  if (!song.isPlaying() || song.currentTime() == 0) {
    song.play();
    playButton.html("Pause");
  } else {
    if (song.isPlaying()) {
      val = song.currentTime();
      val = map(val, 0, song.duration(), 0, 300);
      song.pause();
    }
    playButton.html("Play");
  }
}

function stopSong() {
  song.stop();
  val = 0;
}

function resetRate() {
  rat.value(1);
}

function resetPan() {
  pane.value(0.5);
}
// play(), pause(), stop(), jump(),
// rate(), pan() and setVolume() tutorial!!
// each dimension must be wrt the canvas

let song;
let vol, rat, pane;
let playButton, stopButton, tempx, tempy;
let motion;
let val, star;
let amp;
let hist;
let once;
let rb, gb, bb;

function loaded() {
  star = true;
  let fun = 0.34722 * height;
  let zed = 0.455729 * width;
  let jeje = createP("Music Player :");
  jeje.position(width / 2 - zed, fun);

  playButton = createButton("Play");
  playButton.position(width / 2 - zed, fun + 40);
  playButton.mousePressed(toggleSong);

  stopButton = createButton("Stop");
  stopButton.position(width / 2 - zed + 50, fun + 40);
  stopButton.mousePressed(stopSong);

  jeje = createP("Volume Control :");
  jeje.position(width / 2 - zed, fun + 80);
  vol = createSlider(0, 1, 0.05, 0.01);
  vol.position(width / 2 - zed, fun + 120);

  jeje = createP("Rate :");
  jeje.position(width / 2 - zed, fun + 160);
  rat = createSlider(0.5, 1.5, 1, 0.01);
  rat.position(width / 2 - zed, fun + 200);
  tempx = createButton("reset to default rate");
  tempx.position(width / 2 - zed, fun + 240);
  tempx.mousePressed(resetRate);

  jeje = createP("Pan :");
  jeje.position(width / 2 - zed, fun + 280);
  pane = createSlider(0, 1, 0.5, 0.01);
  pane.position(width / 2 - zed, fun + 320);
  tempy = createButton("reset to default pan");
  tempy.position(width / 2 - zed, fun + 360);
  tempy.mousePressed(resetPan);

  jeje = createP("Ellipse Color :");
  jeje.position(width / 2 - 200 + zed, fun + 200);

  jeje = createP("Red :");
  jeje.position(width / 2 - 200 + zed, fun + 235);
  jeje = createP("Green :");
  jeje.position(width / 2 - 210 + zed, fun + 285);
  jeje = createP("Blue :");
  jeje.position(width / 2 - 200 + zed, fun + 335);

  rb = createSlider(0, 255, 20, 1);
  rb.position(width / 2 - 150 + zed, fun + 250);
  gb = createSlider(0, 255, 200, 1);
  gb.position(width / 2 - 150 + zed, fun + 300);
  bb = createSlider(0, 255, 200, 1);
  bb.position(width / 2 - 150 + zed, fun + 350);
}

function setup() {
  // createCanvas(400, 800);
  // createCanvas(window.innerWidth, window.innerHeight);
  createCanvas(windowWidth, windowHeight);
  hist = [];
  val = 0;
  star = false;
  song = loadSound("music-0.mp3", loaded);
  amp = new p5.Amplitude();
  once = false;

  background(51);
  noFill();
  strokeWeight(2);
  stroke(0);
  rect(30, 30, width - 60, height - 60);

  stroke(255);
  rect(50, height - 125, width - 100, 50);
}

function draw() {
  background(51);
  let loud = 0;
  if (star) {
    let gir = amp.getLevel();
    loud = map(gir, 0, vol.value() * 0.7071, 0.5, 150);
    if (loud / 90 >= 1 || gir / vol.value() >= 1) {
      console.log(nf(gir, 0, 2), vol.value(), nf(gir / vol.value(), 0, 2), nf(loud, 0, 2), 90, nf((loud / 90), 0, 2));
    }
    if (mouseIsPressed && !once) {
      once = true;
      console.log(nf(gir, 0, 2), vol.value(), nf(gir / vol.value(), 0, 2), nf(loud, 0, 2), 90, nf((loud / 90), 0, 2));
    }
  }

  hist.push(loud);
  if (hist.length > width / 5) {
    hist.splice(0, 1);
  }
  stroke(25, 255, 150);
  strokeWeight(1);
  for (let i = 0; i < hist.length; i++) {
    line(i * 5, 200 - hist[i], i * 5, 200 + hist[i]);
  }

  noFill();
  strokeWeight(2);
  stroke(0);
  rect(30, 30, width - 60, height - 60);

  stroke(255);
  rect(50, height - 125, width - 100, 50);

  textSize(16);
  noStroke();
  fill(255);
  text(0, 45, height - 50);
  text(int(song.duration()), width - 70, height - 50);


  if (star) {
    song.setVolume(vol.value());
    song.rate(rat.value());
    song.pan(pane.value());

    if (song.isPlaying() && song.currentTime() != 0) {
      let d = map(song.currentTime(), 0, song.duration(), 0, width - 100);
      fill(255);
      rect(50, height - 125, d, 50);
    } else {
      fill(255);
      rect(50, height - 125, val, 50);
    }
    noStroke();
    if (hist.length >= 10) {
      let go = hist.length - 20;
      for (let i = go; i < hist.length; i++) {
        let m = map(i, go, hist.length, 0, 50);
        fill(rb.value(), gb.value(), bb.value(), m);
        ellipse(width / 2, height / 2 + 50, hist[i] * 5, hist[i] * 5);
      }
    }
  }
}

function mousePressed() {
  if (mouseY >= height - 125 && mouseY <= height - 75) {
    if (mouseX >= 50 && mouseX <= width - 50) {
      let y = map(mouseX - 50, 0, width - 100, 0, song.duration());
      if (!song.isPlaying() || song.currentTime() == 0) {
        song.jump(y);
        val = mouseX - 50;
      } else {
        song.jump(y);
      }
    }
  }
  once = !once;
}

function toggleSong() {
  if (!song.isPlaying() || song.currentTime() == 0) {
    song.play();
    playButton.html("Pause");
  } else {
    if (song.isPlaying()) {
      val = song.currentTime();
      val = map(val, 0, song.duration(), 0, width - 100);
      song.pause();
    }
    playButton.html("Play");
  }
}

function stopSong() {
  val = 0;
  if (song.isPlaying()) {
    playButton.html("Play");
  }
  song.stop();
}

function resetRate() {
  rat.value(1);
}

function resetPan() {
  pane.value(0.5);
}
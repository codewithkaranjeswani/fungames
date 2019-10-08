let t, crphik, r1, r2, r3, r4, m, n, e, s1, s2, s3, s4, o, p, f, alp, beta, phi, sli;

function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES);
  // createP('');
  // sli = createSlider(0, 360, 0, 1);
  // t = sli.value();
  t = 0;
  r1 = 70;
  r2 = 23.6;
  r3 = 68.6;
  r4 = 19.4;

  s1 = 12.5;
  s2 = 12.6;
  s3 = 18.7;
  s4 = 23.9;

  m = 0;
  n = 0;
  e = 0;
  o = 0;
  p = 0;
  f = 0;

  alp = 0;
  beta = 0;
  phi = 0;
}

function draw() {
  // t = sli.value();
  e = Math.sqrt(r1 * r1 + r4 * r4 - 2 * r1 * r4 * cos(180 - t));
  m = asin(sin(180 - t) * r4 / e);
  n = acos((e * e + r2 * r2 - r3 * r3) / (2 * e * r2));
  phi = m + n;

  alp = phi + 149;
  if (alp < 180) {
    f = Math.sqrt(s1 * s1 + s4 * s4 - 2 * s1 * s4 * cos(180 - alp));
    let temp_s = sin(180 - alp) * s4 / f;
    let temp_c = (s1 - s4 * cos(180 - alp)) / f;
    if (temp_s >= 0 && temp_c >= 0) {
      o = 360 - asin(temp_s); // o between 270 and 360 - 4th quad
    } else if (temp_s < 0 && temp_c >= 0) {
      o = -asin(temp_s); // o between 0 and 90 - 1st quad
    } else if (temp_s >= 0 && temp_c < 0) {
      o = 360 - acos(temp_c); // o between 180 and 270 - 3rd quad
    } else {
      o = acos(temp_c) // o between 90 and 180 - 2nd quad
    }
    // o = 180 + asin(sin(180 - alp) * s4 / f);
  } else {
    f = Math.sqrt(s1 * s1 + s4 * s4 - 2 * s1 * s4 * cos(alp -180));
    let temp_s = sin(180 - alp) * s4 / f;
    let temp_c = (s1 - s4 * cos(180 - alp)) / f;
    if (temp_s >= 0 && temp_c >= 0) {
      o = 360 - asin(temp_s); // o between 270 and 360 - 4th quad
    } else if (temp_s < 0 && temp_c >= 0) {
      o = -asin(temp_s); // o between 0 and 90 - 1st quad
    } else if (temp_s >= 0 && temp_c < 0) {
      o = 360 - acos(temp_c); // o between 180 and 270 - 3rd quad
    } else {
      o = acos(temp_c) // o between 90 and 180 - 2nd quad
    }
    // o = 180 - asin(sin(alp - 180) * s4 / f);
  }
  p = acos((f * f + s2 * s2 - s3 * s3) / (2 * f * s2));
  beta = 360 - (o + p);

  let p1 = createVector(0, 0);
  let p2 = createVector(r1, 0);
  let p3 = createVector(r1 + r4 * cos(t), r4 * sin(t));
  let p4 = createVector(r2 * cos(phi), r2 * sin(phi));

  let q1 = p1;
  let q2 = createVector(s4 * cos(alp), s4 * sin(alp));
  let q3 = createVector(-s1 + s2 * cos(beta), s2 * sin(beta));
  let q4 = createVector(-s1, 0);

  background(51);
  textSize(20);
  text('theta : ' + t, width * 0.1, height * 0.8);
  text('phi   : ' + nf(phi, 0, 2), width * 0.1, height * 0.85);
  text('alpha : ' + nf(alp, 0, 2), width * 0.1, height * 0.9);
  text('beta  : ' + nf(beta, 0, 2), width * 0.1, height * 0.95);
  // text('f     : ' + nf(f, 0, 2), width * 0.5, height * 0.80);
  // text('o     : ' + nf(o, 0, 2), width * 0.5, height * 0.85);
  // text('p     : ' + nf(p, 0, 2), width * 0.5, height * 0.90);
  // text('len-s3: ' + nf(dist(q3.x, q3.y, q2.x, q2.y), 0, 2), width * 0.5, height * 0.95);

  translate(200, height / 2);
  scale(2, -2);

  stroke(100, 200, 0, 100);
  strokeWeight(1);
  line(p1.x, p1.y, p2.x, p2.y);
  line(p2.x, p2.y, p3.x, p3.y);
  line(p3.x, p3.y, p4.x, p4.y);
  line(p1.x, p1.y, p4.x, p4.y);

  line(q1.x, q1.y, q2.x, q2.y);
  line(q2.x, q2.y, q3.x, q3.y);
  line(q3.x, q3.y, q4.x, q4.y);
  line(q1.x, q1.y, q4.x, q4.y);

  strokeWeight(1);
  stroke(255);
  point(p1.x, p1.y);
  point(p2.x, p2.y);
  point(p3.x, p3.y);
  point(p4.x, p4.y);

  point(q1.x, q1.y);
  point(q2.x, q2.y);
  point(q3.x, q3.y);
  point(q4.x, q4.y);

  t += 1;
  if (t >= 360) {
    t = 0;
  }
}
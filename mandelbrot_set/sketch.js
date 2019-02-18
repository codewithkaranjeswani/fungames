let x;
let y;

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  loadPixels();
  let maxIterations = 100;
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      let a = map(x, 0, width, -2.5, 2.5);
      let b = map(y, 0, height, -2.5, 2.5);
      let ca = a;
      let cb = b;
      let n = 0;
      while (n < maxIterations) {
        let aa = a * a - b * b;
        let bb = 2 * a * b;

        a = aa + ca;
        b = bb + cb;

        if (abs(a + b) > 25) {
          break;
        }
        n++;
      }
      let bright = 200;
      if (n == maxIterations) {
        bright = 0;
      }
      let pix = (x + width * y) * 4;

      pixels[pix + 0] = bright;
      pixels[pix + 1] = bright;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
}
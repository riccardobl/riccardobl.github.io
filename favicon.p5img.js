var SCALE=32/512;
function setup() {

  createCanvas(512*SCALE, 512*SCALE);
}

function draw() {


  const fg = color(167, 209, 41);
  const bg = color(0);
  bg.setAlpha(0);

  const border = color(111, 138, 30);

  stroke(border);
  strokeWeight(3*SCALE);

  background(bg);




  fill(fg);
  circle(width / 2, height / 2, (512 - 60)*SCALE);

  fill(bg);

  erase();
  circle(width / 2, height / 2, (512 - 60 * 2.2)*SCALE);
  noErase();
  noFill();
  circle(width / 2, height / 2, (512 - 60 * 2.2)*SCALE);

  fill(fg);

  circle(width / 2, height / 2, (512 - 60 * 3.5)*SCALE);




}
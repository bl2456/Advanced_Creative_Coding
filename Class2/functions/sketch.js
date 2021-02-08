function setup() {
  createCanvas(1000, 1000);
  rectMode(CENTER);
}

function draw() {
  background(220);
  drawCoolRect(100, 100, 7);
  drawCoolRect(750, 750, 12);

  //lerpColor
  //THREE parameters - starting color, ending color, 
  //where are you between the colors (0 - starting point, 1 - ending point)?
  let blendColor = lerpColor(color(255,0,0), color(0,0,255), 0.5);
  fill(blendColor);
  rect(500, 500, 200, 200);
}

function drawCoolRect(x, y, numOfRects){
  for(let i=0; i < numOfRects; i++){
    let blendColor = lerpColor(color(255,0,0), color(0,0,255), i * (1.0/numOfRects));
    fill(blendColor);
    rect(x, y, 200 - (i*15), 200 - (i*15));
  }
  // each rect gets smaller
}

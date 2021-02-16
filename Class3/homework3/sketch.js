
let tiles = [];
let canvasHeight = 800;
let canvasWidth = 800;
let tilesPerRow = 10;
let animating = false;
let rotationSpeed = 0.01;
//let myStrokeWeight = 1;
let rotationSlider = document.querySelector("#rotationSlider");
let strokeSlider = document.querySelector("#strokeSlider");
let rotationValue = document.querySelector("#rotationValue");
let strokeValue = document.querySelector("#strokeValue");
rotationValue.innerHTML = rotationSlider.value;
strokeValue.innerHTML = strokeSlider.value;
rotationSlider.oninput = function(){rotationValue.innerHTML = this.value};
strokeSlider.oninput = function(){strokeValue.innerHTML = this.value};
let animationButton;

let toggleAnimation = (animationButton) => {
  animating = !animating;
  //console.log(animationButton.innerHTML);
  if (animationButton.innerHTML == "Start"){
    animationButton.innerHTML = "Stop";
  }
  else {
    animationButton.innerHTML = "Start";
  }
}

function setup() {
  //slider = createSlider(-0.1, 0.1, 0.01, 0.01);
  createCanvas(canvasWidth, canvasHeight);
  sizeOfTile = canvasWidth / tilesPerRow;
  for (var x = sizeOfTile; x < canvasWidth; x += sizeOfTile){
    for (var y = sizeOfTile; y < canvasHeight; y += sizeOfTile){
      firstTileSize = random(0, sizeOfTile);
      secondTileSize = random(0, 2 * sizeOfTile);
      let r = random(0,256);
      let g = random(0,256);
      let b = random(0,256);
      tiles.push(new Tile(x,y,firstTileSize,firstTileSize, r ,g ,b));
      tiles.push(new Tile(x,y,secondTileSize,secondTileSize, r, g ,b));
    }
  }
  rectMode(CENTER);
  console.log(tiles);
  animationButton = document.querySelector("#animation");
  animationButton.onclick = () => toggleAnimation(animationButton); //callback
}

function draw() {
  background(0);

  for (let i = 0; i < tiles.length; i++) {
    //fill(tiles[i].tileColor);
    // stroke(tiles[i].tileColor);
    // noFill();
    // strokeWeight(4);
    // rect(tiles[i].x,tiles[i].y, tiles[i].width, tiles[i].length);
    // if(i % 2 == 0){
    //   rectMode(CORNER);
    // }
    // else{
    //   rectMode(CENTER);
    // }
    if (animating){
      tiles[i].changeColor();
      tiles[i].rotateShape();
    }
    tiles[i].render();
    
  }
}

class Tile{
  constructor(xPos,yPos, width, length, r, g, b){
    this.x = xPos;
    this.y = yPos;
    this.width = width;
    this.length = length;
    this.startingColor = color(r, g, b);
    this.endingColor = color(220, 220, 220);
    this.strokeValue = 0;
    this.angle = 0;
  }

  render() {
    let strokeColor = lerpColor(this.startingColor, this.endingColor, 0.5 * cos(this.strokeValue) + 0.5);
    stroke(strokeColor);
    noFill();
    strokeWeight(strokeSlider.value);
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    rect(0, 0, this.width, this.length);
    pop();
  }

  changeColor() {
    this.strokeValue += 0.01;
  }

  rotateShape() {
    //translate(this.x, this.y);
    this.angle += parseFloat(rotationSlider.value);
    //console.log("hi");
  }
}

//slider 1 controls speed of rotation
//slider 2 controls stroke weight
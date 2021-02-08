// let bubble = {
//   x: 100,
//   y: 100,
//   radius: 10
// }

let bubbles = [];

function setup() {
  createCanvas(1000, 1000);
  for (let i = 0; i < 100; i++) {
    bubbles.push(new Bubble(100, 100));
  }
}

function draw() {
  background('black');

  //dot notation
  // circle(bubble.x, bubble.y, bubble.radius);
  // bubble.x += random(-3, 3);
  // bubble.y += random(-3,3);

  for(let i=0; i< bubbles.length; i++){
    //get ith bubble in the list
    bubbles[i].move();
    bubbles[i].display();
  }
}

function mouseClicked() {
  //did i click any bubbles?
  for(let i=0; i<bubbles.length; i++){
    bubbles[i].clicked()
  }
}

class Bubble{
  constructor(x, y) {
    this.posX = x;
    this.posY = y;
    this.radius = 20;
    this.color = color(255,255,255);
  }

  display() {
    fill(this.color);
    circle(this.posX,this.posY, this.radius);
  };

  move() {
    this.posX += random(-3, 3);
    this.posY += random(-3, 3);
  }

  //if bubble clicked: do something
  clicked() {
    //calculate distance between center of bubble and mouseclick
    let distance = dist(mouseX, mouseY, this.posX, this.posY);
    if (distance <= this.radius){
      this.color = color("pink");
    }
  }
}

let balls = [];

function setup() {
  createCanvas(1000, 1000);
  balls[0] = new Ball(random(width), random(height), 2, 3, 25);
  balls[1] = new Ball(random(width), random(height), 4, 1, 10);
  button = select('#add');
  button.mousePressed(addAnother);

  slider = createSlider(-2, 2, 0, 0.1);
}

function addAnother(){
  balls.push(new Ball(random(width), random(height), random(-5,5), random(-5,5), 10))
}

function draw() {
  background(220);
  for (let i = 0; i < balls.length; i++) {
    balls[i].move(slider.value());
    balls[i].render();
  }
  
}

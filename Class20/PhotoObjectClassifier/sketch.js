let img;
let detector;

function preload(){
  img = loadImage("images/living_room.jpg");
  detector = ml5.objectDetector("cocossd");
}
function setup() {
  createCanvas(800, 1000);
  detector.detect(img, objectIDed);
  image(img, 0, 0)
}

// callbacks on ml5 functions are error first
function objectIDed(error, results){
  if(error){
    console.error(error);
  }
  else{
    console.log(results);
    for(let i=0; i < results.length; i++){
      let obj = results[i];
      //draw box on objects detected
      stroke('red');
      strokeWeight(5);
      noFill();
      rect(obj.x, obj.y, obj.width, obj.height);

      //object label
      textSize(15);
      strokeWeight(2);
      text(obj.label, obj.x + 10, obj.y - 10);
    }
  }
}

function draw() {
  //background(220);
}

let img;
let detector;
let myVideo;

let myResults = [];

function preload(){
  //img = loadImage("images/living_room.jpg");
  detector = ml5.objectDetector("cocossd");
}
function setup() {
  createCanvas(640, 480);
  myVideo = createCapture(VIDEO, videoLoaded)
  //detector.detect(img, objectIDed);

}

function videoLoaded(){
  myVideo.size(640, 480);

  myVideo.hide();
  detector.detect(myVideo, objectIDed);
}

// callbacks on ml5 functions are error first
function objectIDed(error, results){
  if(error){
    console.error(error);
  }
  else{
    //console.log(results);
    myResults = results;
    //recursive call for bounding box
    detector.detect(myVideo, objectIDed);
  }
}

function draw() {
  //background(220);
  image(myVideo,0,0);
  for(let i=0; i < myResults.length; i++){
    let obj = myResults[i];
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

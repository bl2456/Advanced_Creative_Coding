// mobilenet is our pretrained model

let mobilenet;
let img;

let label = "";

let myVid;

function preload(){
  img = loadImage("./images/cat.jpg");
}

function setup() {
  createCanvas(1000, 1000);
  mobilenet = ml5.imageClassifier('MobileNet', modelLoaded);

  mobilenet.predict(img, predictionMade);
  
}

function modelLoaded(){
  console.log("The model has been loaded!");
}

// error first callback
function predictionMade(error, data){
  if (error){
    console.log(error);
  }
  else {
    console.log(data);
    label = data[0].label;
  }
}

function draw() {
  background(220);
  image(img, 0 , 0);
  textSize(32);
  text(label, 10, 50);
}

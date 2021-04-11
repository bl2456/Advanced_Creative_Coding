let img;
let detector;
let myVideo;

//canvas mode 0 means it is in ready to capture phase
//canvas mode 1 means we have captured and we await evaluation with border boxes drawn
let canvasMode = 0;
let myResults = [];
let score = 0;
let totalIDed = 0;
let totalWrong = 0;


ruleSection = document.querySelector('#rules-container');
startBtn = document.querySelector('#startBtn');

captureBtn = document.querySelector('#captureBtn');

decisionSection = document.querySelector('#decision-container');
resultsDisplay = document.querySelector('#resultsDisplay');
pointSelect = document.querySelector('#pointSelect');
pointSubmit = document.querySelector('#pointSubmit');

scoreDisplay = document.querySelector('#totalScore');
totalDetectedDisplay = document.querySelector('#totalIDed');
totalWrongDisplay = document.querySelector('#totalWrong');

scoreDisplay.innerHTML = score;
totalDetectedDisplay.innerHTML = totalIDed;
totalWrongDisplay.innerHTML = totalWrong;

endBtn = document.querySelector('#endGame');

startBtn.addEventListener('click', ()=>{
  console.log('in handler');
  ruleSection.style.display = 'none';
});

captureBtn.addEventListener('click', captureHandler);

pointSubmit.addEventListener('click', (e)=>{
  e.preventDefault();
  let newPoints = pointSelect.value;
  score += int(newPoints);
  totalIDed += myResults.length;
  totalWrong += myResults.length - newPoints;

  scoreDisplay.innerHTML = score;
  totalDetectedDisplay.innerHTML = totalIDed;
  totalWrongDisplay.innerHTML = totalWrong;

  decisionSection.style.display = 'none';
  captureBtn.style.display = 'block';
  canvasMode = 0;

  pointSelect.options.length = 0;
})

endBtn.addEventListener('click', () => {
  canvasMode = 0;
  myResults = [];
  score = 0;
  totalIDed = 0;
  totalWrong = 0;

  decisionSection.style.display = 'none';
  captureBtn.style.display = 'block';
  pointSelect.options.length = 0;

  scoreDisplay.innerHTML = score;
  totalDetectedDisplay.innerHTML = totalIDed;
  totalWrongDisplay.innerHTML = totalWrong;
})

function preload(){
  //img = loadImage("images/living_room.jpg");
  detector = ml5.objectDetector("cocossd");
}
function setup() {
  cnv = createCanvas(640, 480);
  cnv.parent('canvas-container');
  myVideo = createCapture(VIDEO, videoLoaded)
  //detector.detect(img, objectIDed);

}

function videoLoaded(){
  myVideo.size(640, 480);

  myVideo.hide();
  //detector.detect(myVideo, objectIDed);
}

// callbacks on ml5 functions are error first
function objectIDed(error, results){
  if(error){
    console.error(error);
  }
  else{
    //console.log(results);
    myResults = results;

    resultStr = '';

    for(let i=0; i < myResults.length; i++){
      let obj = myResults[i];
      let option = document.createElement('option');
      option.innerHTML = i;
      option.value = i;
      pointSelect.add(option);
      //draw box on objects detected
      stroke('red');
      strokeWeight(5);
      noFill();
      rect(obj.x, obj.y, obj.width, obj.height);
  
      //object label
      textSize(15);
      strokeWeight(2);
      text(obj.label, obj.x + 10, obj.y - 10);

      resultStr = resultStr + obj.label + ' ';
    }

    let option = document.createElement('option');
    option.innerHTML = myResults.length;
    option.value = myResults.length;
    pointSelect.add(option);
    
    resultsDisplay.innerHTML = resultStr;
  }
}

function draw() {
  //background(220);
  if (canvasMode == 0){
    image(myVideo,0,0);
  };
}

function captureHandler(){
  detector.detect(myVideo, objectIDed);
  canvasMode = 1;
  decisionSection.style.display = 'block';
  captureBtn.style.display = 'none';
}
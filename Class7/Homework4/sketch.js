let table;
let countries = [];

let listOfColors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', 
'#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];
let countryDict = {};
let radiusOfBalls;

function preload(){
  table = loadTable('./assets/vacation.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, 1000);

  //Used the two questions: 1) what country do you want to vacation to?  2) How eagar are you to go?
  for(var rowNum=0; rowNum<table.getRowCount(); rowNum++){
    let eagarness = table.getString(rowNum, 4);
    let destination = table.getString(rowNum, 5);
    radiusOfBalls = 20 * eagarness; //the more a person wants to go, the bigger the ball
    if (!(destination in countryDict)){
      let randIndex = Math.floor(random(0, listOfColors.length));
      //console.log(typeof(listOfColors[randIndex]));
      countryDict[destination]= {
        'color': listOfColors[randIndex],
        'count': 1,
      }
      listOfColors.splice(randIndex, 1);
      //console.log(listOfColors.length);
    }
    else{
      countryDict[destination]['count'] += 1;
    }
    countries.push(new CountryBall(rowNum, random(radiusOfBalls, width-radiusOfBalls), random(radiusOfBalls, height-radiusOfBalls), random(-1,1), random(-1,1), radiusOfBalls, countryDict[destination]['color']));
  }

  // button = select('#add');
  // button.mousePressed(addAnother);
  console.log(countryDict);
}

// function addAnother(){
//   let CountryBallCount = countries.length;
//   countries.push(new CountryBall(CountryBallCount, random(width), random(height), random(-1,1), random(-1,1), 10))
// }

function updateCoords(id, x, y){
  countries[id].x = x;
  countries[id].y = y;
}

function draw() {
  background(30);
  for (let i = 0; i < countries.length; i++) {
    countries[i].move(countries, updateCoords);
    countries[i].render();
  }
  let x_val = 0;
  let y_val = 50;
  Object.entries(countryDict).forEach(countryData => {
    const [key, value] = countryData;
    //circle(value['color']);
    fill(value['color']);
    text(key + ': '+ value['count'], x_val, y_val);
    textSize(32);
    y_val += 50;
  });
  
}


class CountryBall {
  constructor(id, x, y, xS, yS, r, color){
    this.id = id;
    this.x = x;
    this.y = y;
    //need speed to determine direction
    //positive to go right/up, negative to go left/down
    this.radius = r;
    this.xSpeed = xS;
    this.ySpeed = yS;
    this.color = color;
  }

  //logic, where it will be
  move(countries, updateCoords){
    
    for (let i = 0; i < countries.length; i++) {
      if(i != this.id){
        let dx = countries[i].x - this.x;
        let dy = countries[i].y - this.y;
        let distance = sqrt(dx**2 + dy**2);
        let minDist = countries[i].radius + this.radius;
        if(distance < minDist){ //if balls collide
          //https://flatredball.com/documentation/tutorials/math/circle-collision/#:~:text=Circle%20Move%20Collision&text=These%20collisions%20move%20objects%20when,that%20they%20no%20longer%20overlap.&text=In%20other%20words%2C%20the%20direction,Math.
          let angle = atan2(dy, dx);
          let targetX = this.x + cos(angle) * minDist;
          let targetY = this.y + sin(angle) * minDist;
          let ax = (targetX - countries[i].x) * 0.05;
          let ay = (targetY - countries[i].y) * 0.05;
          this.xSpeed -= ax;
          this.ySpeed -= ay;
          countries[i].xSpeed += ax;
          countries[i].ySpeed += ay;
        }
      }
      
    }

    this.ySpeed += 0.03; //gravity to pull balls down
    //check if ball is hitting wall to move opposite direction
    if (this.x + this.radius > width) {

      //balls were getting stuck if they spawned near the edge of canvas
      this.x = width - this.radius;
      //slowing the ball down since friction with wall
      this.xSpeed = -0.8 * this.xSpeed;
      //console.log("change in xSpeed");
    }
    else if (this.x - this.radius < 0) {
      this.x = this.radius;
      this.xSpeed = -0.8 * this.xSpeed;
    }
    if (this.y + this.radius > height){
      this.y = height - this.radius;
      this.ySpeed = -0.8 * this.ySpeed;
      //console.log("change in ySpeed");
    }
    else if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.ySpeed = -0.8 * this.ySpeed;
    }

    this.x += this.xSpeed;
    this.y += this.ySpeed;
    updateCoords(this.id, this.x, this.y);
    //console.log(countries.length);
  }
  
  

  //this function should only contain methods that impact the drawing
  //ex) stroke(), fill(), circle(), text()
  // no logic here
  render(){
      fill(this.color);
      circle(this.x, this.y, this.radius*2);
      //console.log(this.ySpeed);
  }
}
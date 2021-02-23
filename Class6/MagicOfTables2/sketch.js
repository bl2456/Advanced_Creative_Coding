let table;

function preload(){
  table = loadTable('assets/LastTime.csv', 'csv', 'header');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

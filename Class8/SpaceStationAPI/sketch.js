let url= "http://api.open-notify.org/iss-now.json";

let space_data;
let button;

let xLoc;
let yLoc;
let time;

function preload(){
  loadJSON(url, spaceInfo);
  table = loadTable('assets/space_locations.csv', 'csv', 'header');
}

function spaceInfo(data){
  space_data = data;

  xLoc = map(space_data.iss_position.longitude, -180, 180, 0, 400);
  yLoc = map(space_data.iss_position.latitude, -180, 180, 0, 400);
  time = hour() + ':' + minute() + ':' + second();

}

function setup() {
  createCanvas(400, 400);

  button = select('button');
  button.mousePressed(updatedLocation);
}

function updatedLocation(){
  let newRow = table.addRow();

  //setString takes 2 parameters
  //column name - data
  newRow.setString('xLocation', xLoc);
  newRow.setString('yLocation', yLoc);
  newRow.setString('time', time);
  saveTable(table, 'space_location.csv', 'csv');
  table = loadTable('assets/space_locations.csv', 'csv', 'header');

}

function draw() {
  background(220);

  //long and lat values go from -180 to 180

  // xLoc = map(space_data.iss_position.longitude, -180, 180, 0, width);
  // yLoc = map(space_data.iss_position.latitude, -180, 180, 0, height);
  circle(xLoc, yLoc, 25);

  for(let i=0; table.getRowCount(); i++){
    let xCoord = table.get(i, 0);
    let yCoord = table.get(i, 1);
    circle(xCoord, yCoord, 20);
    text(table.getString(i,2), xCoord+10, yCoord-10);
  }
}

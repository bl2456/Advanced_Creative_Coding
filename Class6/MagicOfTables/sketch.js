//async
// this function must fully execute BEFORE the code is run
function preload(){
  table = loadTable("./assets/animals.csv", "csv", "header");
}

function setup() {
  createCanvas(400, 400);
  // print(table.getRowCount() + ' the table has this many rows');
  // print(table.getColumnCount() + ' the table has this many columns')

  //cycle through the table
  // nested for loop
  for (let rowNum = 0; rowNum < table.getRowCount(); rowNum++) {
    for (let colNum = 0; colNum < table.getColumnCount(); colNum++) {
      print(table.getString(rowNum, colNum))
    }
    
  }
}

function draw() {
  background(220);

}

//Homework 
// Step1) Make google form, get responses, click spreadsheet icon, download csv

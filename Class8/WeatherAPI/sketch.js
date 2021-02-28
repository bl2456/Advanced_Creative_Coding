let input = "London";
let url = `http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=8fe05ac6547cefa20b40af1273a89ef3&units=metric`;


function preload(){
  loadJSON(url, getWeather);
}

function getWeather(data){
  weather_data = data;
  //console.log(weather_data);
}

function setup() {
  createCanvas(400, 400);
  
  let button = select('button');
  input = select('#city');
  button.mousePressed(updateCity);
}

function updateCity(){
  url = `http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=8fe05ac6547cefa20b40af1273a89ef3&units=metric`;
  loadJSON(url, getWeather);
}

function draw() {
  background(220);
  textSize(32);
  text(weather_data.name, 10, 60);
  text("Temp: " + weather_data.main.temp, 10, 100);
  text("Description: " + weather_data.weather[0].main, 10, 140)
}

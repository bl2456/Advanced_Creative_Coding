let chat_input;
let chat_button;
let socket;
let machineText;


function setup() {
  createCanvas(400, 400);

  chat_input = createInput('Chat with me!');
  chat_input.position(0,0);
  chat_input.size(100);
  chat_button = createButton("Enter");
  chat_button.mousePressed(enteredChat);
  machineText = createP('');
  // setup socket;
  socket = io.connect('http://localhost:3000');
  socket.on('guess', makeAGuess);
}

function enteredChat(){
  let chat_text = chat_input.value();

  //send data to server
  socket.emit('guess' , chat_text);
}

function makeAGuess(data){
  machineText.html(data);
}
function draw() {
  //background(220);
}

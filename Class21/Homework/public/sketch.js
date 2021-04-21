let msgButton;
let socket;
let chatText;
let userText ='';

chatText = document.querySelector('#chatContainer');
msgButton = document.querySelector('#msgButton');
msgButton.addEventListener('click', enteredChat);



function setup() {
  let cnv = createCanvas(windowWidth * 0.63, windowHeight * 0.2);
  cnv.parent('canvasContainer');
  background(220);
  // chat_input = createInput('Chat with me!');
  // chat_input.position(0,0);
  // chat_input.size(100);
  // chat_button = createButton("Enter");
  // chat_button.parent('canvasContainer');
  // chat_button.mousePressed(enteredChat);
  
  // setup socket;
  socket = io.connect('http://localhost:3000');
  socket.on('guess', printResponse);
}

function enteredChat(){
  let sendText = userText;
  let line = document.createElement('div');
  line.innerHTML = 'You: ' + userText;
  line.style.backgroundColor = '#D9594C';
  line.style.marginLeft = 'auto';
  line.style.marginRight = '0';
  chatText.appendChild(line);
  userText = '';
  //send data to server
  socket.emit('guess' , sendText);
}

function printResponse(data){
  let line = document.createElement('div');
  line.innerHTML = 'BOT: ' + data;
  line.style.backgroundColor = '#138A36';
  chatText.appendChild(line);
  updateScroll();
}
function draw() {
  background(220);
  textSize(35);
  stroke('#EFEEEE');
  text(userText, 50, 50);
}

function keyTyped(){
  if (key !== "Enter")
  {
    userText += key;
  }
}

function keyPressed(){
  if (keyCode === BACKSPACE){
    userText = userText.slice(0, -1);
    console.log('removed');
  }
  if (keyCode === ENTER){
    console.log('entered');
    enteredChat();
  }
}

function updateScroll(){
  chatText.scrollTop = chatText.scrollHeight;
}
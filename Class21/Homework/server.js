const bayes = require('bayes');
const SW = require('stopword');
const fs = require('fs');


//express application
const express = require('express');
let app = express();

//create our server
let server = app.listen(3000);

//have my app use files in the public folder
app.use(express.static('public'));


let myClassifier;
fs.readFile('./classifier.json', downloadedFile);

function downloadedFile(error, jsonString){
    if(error){
        console.log(error);
    }
    else{
        myClassifier = bayes.fromJson(jsonString);

        // don't want to start sockets until I 'read' the classifier
        IO.sockets.on('connection', newConnection);
    }
}

//bring in the sockets
let socket = require('socket.io');
let IO = socket(server);


let responses = {
    sports: ['I think sports these days circulate too much money.', 'Looks like you are quite knowledgable about human sports my friend.', 'I think sports are falling out of favor among the new generation.'],
    music: ['I believe that music encapsulates the human soul. Very interesting actually.', 'My favorite artist is Drake, although I do listen to Taylor Swift at times.', 'Yes, but have you listened to K-pop before?'],
    covid: ['It is very important for every human to be vaccinated in these worrying times.', 'I cannot relate since I cannot be infected by COVID-19. Sorry.', 'I heard from other humans that there has been an issue with the J&J vaccine.'],
    politics: ['No politics talk please. I was not programmed to talk about that.', 'Politics? Disgusting.', 'I hate human politics. Talk about something else.'],
    business: ['My stock portfolio took a big hit yesterday. Literally crying.', 'I suggest looking to invest in GAMESTOP. DIAMOND HANDS BABY.', 'I wish I had the computing power to mine crypto...'],
}
function newConnection(socket){
    console.log('new connection! ' + socket.id);
    
    socket.on('guess', guessMsg);

    async function guessMsg(data){
        //
        mlReadyData = cleanup(data);

        let category = await myClassifier.categorize(mlReadyData);
        let randomResponse = responses[category][Math.floor(Math.random() * responses[category].length)];
        //broadcast.emit - send to everyone but sender
        // .emit - send to everyone including sender
        socket.emit('guess', randomResponse);
    }
}


const alphanumeric = /^[0-9a-zA-Z']+$/;

function cleanup(data){
    //put words of text into list
    let temp_split_data = data.split(' ');

    //store words most useful to us
    let temp_new_words = [];

    //stopwords = the, a, is, are, etc.
    temp_split_data = SW.removeStopwords(temp_split_data);

    temp_split_data.forEach(word => {

        //removing commas, colons, etc, from each word
        word = word.replace(/[,.:;!?"]/g, '');

        //test if word contains only letter/number and is longer than 2 char
        if(alphanumeric.test(word) && word.length > 2){
            temp_new_words.push(word.toLowerCase());
        }
    });

    //get rid of any duplicate words
    // ... -> spread operator
    let unique = [...new Set(temp_new_words)].join(', ');
    return unique;
}
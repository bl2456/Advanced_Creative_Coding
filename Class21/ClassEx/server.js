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


function newConnection(socket){
    console.log('new connection! ' + socket.id);
    
    socket.on('guess', guessMsg);

    async function guessMsg(data){
        //
        mlReadyData = cleanup(data);

        let category = await myClassifier.categorize(mlReadyData);

        //broadcast.emit - send to everyone but sender
        // .emit - send to everyone including sender
        socket.emit('guess', category);
    }
}


const alphanumeric = /^[0-9a-zA-Z]+$/;

function cleanup(data){
    //put words of text into list
    let temp_split_data = data.split(' ');

    //store words most useful to us
    let temp_new_words = [];

    //stopwords = the, a, is, are, etc.
    temp_split_data = SW.removeStopwords(temp_split_data);

    temp_split_data.forEach(word => {
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
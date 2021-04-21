const Twit = require("twit");
const config = require("./config.js");

let SW = require('stopword');
let bayes = require('bayes');
let classifier = bayes();
let fs = require('fs');

let T = new Twit(config);


//reg expression - used to match strings that follows the expression definition
const alphanumeric = /^[0-9a-zA-Z']+$/;

// using trending words on twitter  to affiliate those tweets with certain
// categories that we are coming up with

let trends = {
    "NBA": "sports",
    "League": "sports",
    "NFL": "sports",
    "team": "sports",
    "MLS": "sports",
    "MLB": "sports",
    "FIFA": "sports",
    "UEFA": "sports",
    "euros": "sports",
    "goal": "sports",
    "Super League": "sports",
    "NHL": "sports",
    "BTS": "music",
    "TWICE": "music",
    "song": "music",
    "iHeartAwards": "music",
    "Beyonce": "music",
    "Jay-Z": "music",
    "Drake": "music",
    "Taylor Swift": "music",
    "Justin Bieber": "music",
    "Ariana Grande": "music",
    "vaccine": "covid",
    "appointment": "covid",
    "Astra": "covid",
    "outbreak": "covid",
    "mutation": "covid",
    "vaccination": "covid",
    "moderna": "covid",
    "Johnson": "covid",
    "pfizer": "covid",
    "trump": "politics",
    "hilary": "politics",
    "democrats": "politics",
    "republicans": "politics",
    "cabinet": "politics",
    "senator": "politics",
    "Justice Department": "politics",
    "government": "politics",
    "Supreme Court": "politics",
    "debt": "business",
    "television": "business",
    "Amazon": "business",
    "Apple": "business",
    "Chase": "business",
    "JPMorgan": "business",
    "crypto": "business",
    "inflation": "business",
    "Mercedes": "business",
    "Tesla": "business",
    "Unemployment": "business",
}

//index to keep track of where we are in the loop
let index = 0;

//loop through JSON trends
for( let [key, value] of Object.entries(trends)){
    T.get('search/tweets', {q: key, count: 100}, async(error, data, response) => {
        try{
            //console.log(data);
            for (let i = 0; i < data.statuses.length; i++) {
                let temp_text = data.statuses[i].text;
                //console.log(temp_text);
                //data wrangling - cleaning up data, 'words', that wouldn't help us that much
                let cleaned_up_words = cleanup(temp_text);
                //console.log(cleaned_up_words.join());

                let final_words = cleaned_up_words.join(', ');
                await classifier.learn(final_words, value);
            }
            index++;

            //if we have completed going through trends
            if(index == Object.keys(trends).length){
                let try_it = "callum robinson bursts through the southampton defence to add a third goal and seal the win";
                try_it = try_it.split(' ').join(', ');
                console.log(await classifier.categorize(try_it));

                //serialize the classifier's state as a json string
                let stateJson = classifier.toJson();
                //first parameter = name of classifier file
                fs.writeFile('./classifier.json', stateJson, function(err, data) {
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("successfully saved classifier state");
                    }
                })
            }
        }
        catch(error){
            console.log(error);
        }
    });
}

function cleanup(tweet){
    //put words of text into list
    let temp_split_tweet = tweet.split(' ');

    //store words most useful to us
    let temp_new_words = [];

    //stopwords = the, a, is, are, etc.
    temp_split_tweet = SW.removeStopwords(temp_split_tweet);

    temp_split_tweet.forEach(word => {

        //removing commas, colons, etc, from each word
        word = word.replace(/[,.:;!?"]/g, '');

        //test if word contains only letter/number and is longer than 2 char
        if(alphanumeric.test(word) && word.length > 2){
            temp_new_words.push(word.toLowerCase());
        }
    });

    //get rid of any duplicate words
    // ... -> spread operator
    let unique = [...new Set(temp_new_words)];
    return unique;
}
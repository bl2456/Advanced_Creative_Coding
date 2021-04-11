
const Twit= require("twit");

const config = require("./config.js");
const request = require('request');
const fs = require('fs');
let T = new Twit(config);
let holiday_url = "https://date.nager.at/Api/v2/NextPublicHolidaysWorldwide";
let flag_url = "http://www.geognos.com/api/en/countries/flag/";
let countryCode;
let tweet;
botTweet();

setInterval(botTweet, 60 *5*1000);

// this is sending out the tweet
function botTweet(error, data, response){
    request(holiday_url, gotData);

    function gotData(error, response, body) {
        let holiday_data = JSON.parse(body);
        countryCode = holiday_data[1].countryCode;
        let tweet = `The next public holiday is ${holiday_data[0].localName} on ${holiday_data[0].date} in ${holiday_data[0].countryCode}`;
        
        //download -two params
        // 1- url , 2 - filename *where it is being saved*
        download(flag_url + countryCode + '.png', "images/flag" + countryCode + ".png");
        
    }

    function download(url, filename){
        //think of "save as" when you save an image from web on pc
        request(url).pipe(fs.createWriteStream(filename)).on('close', encodeImage);
        
        function encodeImage () {
            // encode the image!
            let encoded_img = fs.readFileSync(filename, {encoding: 'base64'});
            T.post('media/upload', {media_data: encoded_img}, insertMetaData);
        }
    }

    function insertMetaData(error, data, response){
        let mediaIdStr = data.media_id_str;
        let altText = `This is a flag of ${countryCode}`;
        let meta_params = {media_id: mediaIdStr, alt_text: {text: altText}}

        T.post('media/metadata/create', meta_params, createdMedia);


        function createdMedia(error, data, response){
            let tweet_parameters = {status: tweet, media_ids: mediaIdStr};
            T.post('statuses/update', tweet_parameters, tweeted);
        }
    }

    function tweeted(error, data, response){
        if(error){
            console.log(error);
        }
        else {
            console.log("what an amazing bot, here's your latesting tweet " + data.text);
        }
    }
}
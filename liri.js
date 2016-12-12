var twitter = require('twitter');
var keys = require('./keys.js');
var request = require("request");


//Twitter
if (process.argv[2] == "my-tweets") {
	var params = {
			q: '@jmprado12',
			count: 20
		};

var url = 'https://twitter.com/jmprado12?'
var client = keys.twitterKeys;
client.get(url, params, function(error, tweets, response) {
 if (!error) {
 console.log(tweets);
 };
});
}; //end of if/else statement







// Movies
if (process.argv[2] == "movie-this") {

	var movie = process.argv[3]
	request("http://www.omdbapi.com/?t=" + movie + "&plot=short", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  	if (!error && response.statusCode === 200) {
    console.log(response.body);
  	}
	});
};
//required packages and .js files
var keys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require("request");
var fs = require("fs");
var action = process.argv[2];
var userInput = process.argv[3];

//FUNCTIONS
//Twitter
function twitter() {
	var client = new Twitter({
	        consumer_key: keys.twitterKeys.consumer_key,
	        consumer_secret: keys.twitterKeys.consumer_secret,
	        access_token_key: keys.twitterKeys.access_token_key,
	        access_token_secret: keys.twitterKeys.access_token_secret
	    });

	var params = {screen_name: 'jmprado12', count: 20};

	client.get("statuses/user_timeline", params, function(error, tweets, response) {
 	if (!error) {
 		for (var i = 0; i < tweets.length; i++) {
 			console.log("Tweet: " + tweets[i].text);
 			console.log("created on: " + tweets[i].created_at);
 		}
 		};
	}) //Twitter call
};//end of Twitter function

//Spotify
function music() {
	spotify.search({ type: 'track', query: userInput, limit: 1}, function(err, data) {
    if ( err ) { 
        console.log('Error occurred: ' + err);
        return;
    }
	    console.log("Track: " + data.tracks.items[0].name);
		console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
	    console.log("Album: " + data.tracks.items[0].album.name);
	    console.log("Play it!: " + data.tracks.items[0].external_urls.spotify);
	})//end of spotify call
};//end of Spotify function

//OMDB
function ombd() {
	request("http://www.omdbapi.com/?t=" + userInput + "&plot=short", function(error, response, body) {
	if (userInput === undefined) {
		console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/")
  	}
  	// If the request is successful (i.e. if the response status code is 200)
  	else if (!error && response.statusCode === 200) {
    console.log('Title: ' + JSON.parse(body).Title);
    console.log('Year: ' + JSON.parse(body).Year);
    console.log('IMBD Rating: ' + JSON.parse(body).imbdRating);
    console.log('Country: ' + JSON.parse(body).Country);
    console.log('Language: ' + JSON.parse(body).Language);
    console.log('Plot: ' + JSON.parse(body).Plot);
    console.log('Actors: ' + JSON.parse(body).Actors);
    console.log('Rotten Tomatoes Score: ' + JSON.parse(body).Metascore);
  	}}) 

  	//end of if statement
};//end of ombd function

//if/else statements
if (action == "my-tweets") {
	twitter();
}; //end of if/else statement

if (action == "spotify-this-song") {
	music();
};//end of spotify-this-song

// Movies
if (action == "movie-this") {
	ombd();
}; //end of movies

//do what I say, yo.
if (action == "do-what-it-says") {

	fs.readFile("random.txt", "utf8", function(err, data){
		data = data.split(",")
		action = data[0];
		userInput = data[1];

		if (action == "my-tweets") {
			twitter();
		}; //end of if/else statement

		if (action == "spotify-this-song") {
			music();
		};//end of spotify-this-song

		// Movies
		if (action == "movie-this") {
			ombd();
		} //end of movies
		})//end of readFile
};//end of do-what-it-says
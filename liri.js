//required packages and .js files
var keys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require("request");

//Twitter
if (process.argv[2] == "my-tweets") {

	var client = new Twitter({
	        consumer_key: keys.twitterKeys.consumer_key,
	        consumer_secret: keys.twitterKeys.consumer_secret,
	        access_token_key: keys.twitterKeys.access_token_key,
	        access_token_secret: keys.twitterKeys.access_token_secret
	    });

	var params = {screen_name: 'jmprado12', count: 1};

	client.get("statuses/user_timeline", params, function(error, tweets, response) {
 	if (!error) {
 	console.log(tweets);
 	};
}); //Twitter call
}; //end of if/else statement

//Spotify
if (process.argv[2] == "spotify-this-song") {

	var song = process.argv[3];
	spotify.search({ type: 'track', query: song, limit: 2 }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }

    console.log(JSON.stringify(data.tracks.items, null, 2));
});
}//end of spotify-this-song

// Movies
if (process.argv[2] == "movie-this") {

	var movie = process.argv[3]
	request("http://www.omdbapi.com/?t=" + movie + "&plot=short", function(error, response, body) {

  	// If the request is successful (i.e. if the response status code is 200)
  	if (!error && response.statusCode === 200) {
    console.log('Title: ' + JSON.parse(body).Title);
    console.log('Year: ' + JSON.parse(body).Year);
    console.log('IMBD Rating: ' + JSON.parse(body).imbdRating);
    console.log('Country: ' + JSON.parse(body).Country);
    console.log('Language: ' + JSON.parse(body).Language);
    console.log('Plot: ' + JSON.parse(body).Plot);
    console.log('Actors: ' + JSON.parse(body).Actors);
    console.log('Rotten Tomatoes Score: ' + JSON.parse(body).Metascore);
    //console.log(+ JSON.parse(body).Metascore); ROTTEN TOM URL
  	} //end of if statement
  })}; //end of movies

//do what I say, yo.
//if (process.argv[2] == "do-what-it-says") {};
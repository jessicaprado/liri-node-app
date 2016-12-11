var keys = require('keys.js');
var Twitter = require('twitter');

function my-tweets() {
	var params = {screen_name: 'jmprado12'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (!error) {
    console.log(tweets);
  }
});
};

function spotify-this-song() {

};

function movie-this(){

};

function do-what-it-says(){

};
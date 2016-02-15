var twitter = require('twitter');
var props	= require('./twitter.properties');

var client = new Twitter({
	  consumer_key: props.consumer_key,
	  consumer_secret: props.consumer_secret,
	  access_token_key: props.access_token_key,
	  access_token_secret: props.access_token_secret
	});

var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }
});
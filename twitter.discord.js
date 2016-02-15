var discord = require('discord.js');
var twitter = require('twitter');
var props	= require('./twitter.properties');

var CHAR_LIMIT = 140;

var client = new twitter({
	  consumer_key: props.consumer_key,
	  consumer_secret: props.consumer_secret,
	  access_token_key: props.access_token_key,
	  access_token_secret: props.access_token_secret
	});

/*
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }
});
*/

exports.tweet = function(message, content){
	content = String(content);
	if(content){
		console.log(content);
		var tweetContents = message.author.username + ": " + content;
		
		if(tweetContents.length > CHAR_LIMIT){
			try{
				var tooLong = "Count: " + tweetContents.length + ". Tweet content must be under " + CHAR_LIMIT;
				message.client.reply(message, tooLong);
			} catch(err){
				message.client.reply(message, err);
			}
		}
		else{
			client.post('statuses/update', 
					{status: tweetContents},
					function(err, tw, response){
				if(!err){
					message.client.reply(message, 'Tweet posted successfully!');
				}
				else{
					message.client.reply(message, err);
				}
			});
		}
	}
	else message.client.reply(message, "You have to put some text after, fam");
};
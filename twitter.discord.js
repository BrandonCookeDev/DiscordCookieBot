var discord = require('discord.js');
var twitter = require('twitter');
var log		= require('./log');
var config	= require('./data/config');
var credentials = require('./models/credentials.model');

var CHAR_LIMIT = 140;

var client = null;
function initTwitter(){
	credentials.getTwitterCredentialsByEnvironment('prod')
		.then(function(creds){
			delete creds.env;
			delete creds._id;
			client = new twitter(creds);

			console.log('Twitter Available!');
			log.info('Twitter avilable!');
		})
		.catch(function(err){
			if(err){
				console.error(err.message);
				log.err(err)
			}
		})
}

function tweet(message, content){
	content = String(content);
	if(!client){
		message.reply('cookiEbot420 is unavailable currently. Please try again later');
	}

	if(content){
		console.log(content);
		var tweetContents = message.author.username + ": " + content;
		
		if(tweetContents.length > CHAR_LIMIT){
			try{
				var tooLong = "Count: " + tweetContents.length + ". Tweet content must be under " + CHAR_LIMIT;
				message.reply(message, tooLong);
			} catch(err){
				message.reply(message);
			}
		}
		else{
			client.post('statuses/update', 
					{status: tweetContents},
					function(err, tw, response){
				if(!err){
					message.reply('Tweet posted successfully!');
				}
				else{
					message.reply(err.message);
					log.err(err);
				}
			});
		}
	}
	else message.reply(message, "You have to put some text after, fam");
};

module.exports = {
	initTwitter: initTwitter,
	tweet: tweet
}
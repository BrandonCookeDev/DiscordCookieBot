var urls 	= require('../data/urls');
var arrays	= require('../data/arrays');

exports.repo = function(message){
	message.client.sendMessage(message.channel, urls.streamControl);
};

exports.cookieRepo = function(message){
	message.client.sendMessage(message.channel, urls.cookieControl);
};

exports.request = function(message, user){
	message.client.sendMessage(message.channel, urls.request);
}

exports.game = function(message, user, game){
	try{
		message.author.client.setStatus('online', game, function(err){
			console.log(err);
			botlog.botlog(err);
		});
	}catch(err){
		console.log(err);
	}
};

// TODO Unbreak this
exports.avatar = function(message, url){
	var imgBuffer = null;
	request.get(url, function(err, response, body){
		console.log('body: ' + (body instanceof Buffer));

		message.client.setAvatar(body, function(err){
			console.log(err);
			botlog.botlog(err);
		});
	});

	//while(!(imgBuffer instanceof Buffer)){console.log(imgBuffer)}
	//var avatar = new Buffer(imgBuffer.toString('base64'), 'base64');
};

exports.frames = function(message, user, character){
	if(!character || character == null || typeof character === 'undefined')
		message.client.reply(message, 'You need to put a character after the command');
	else{
		try{
			var data = arrays.meleeFrames[character.toLowerCase()];
			console.log(data);
			message.client.sendMessage(message.channel, data);
		} catch(err){
			console.log(err);
		}
	}
};
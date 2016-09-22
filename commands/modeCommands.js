var config 	= require('../data/config');
var arrays	= require('../data/arrays');

exports.ftumode = function(message, tyusUsername) {
	if (!(message.author.username === tyusUsername)) {
		if (config.isFTU) {
			config.isFTU = false;
			message.client.sendMessage(message.channel, "FTU mode is now disabled!");
		} else {
			config.isFTU = true;
			message.client.sendMessage(message.channel, "FTU mode is now enabled!");
		}
	};
};

exports.ftu = function(message, tyusUsername) {
	var user = message.author;
	var name = user.username.toLowerCase();
	var arr = arrays.tyusResponses;
	if (name === tyusUsername)//|| name === 'cookie')
	{
		var index = Math.floor((Math.random() * arr.length));
		message.client.reply(message, arr[index]);
	}
};

exports.shittalkmode = function(message){
	if(!config.isShittalk) {
		config.isShittalk = true;
		config.shittalkCounter = (Math.floor(Math.random() * config.shittalkMaxMessages) + 1);
		message.client.sendMessage(message.channel, 'Shittalk mode is now enabled!');
	} else{
		config.isShittalk = false;
		config.shittalkCounter = 0;
		message.client.sendMessage(message.channel, 'Shittalk mode is now disabled!');
	}
};

exports.shittalk = function(message){
	if(config.shittalkCounter != 0){
		config.shittalkCounter--;
	}
	else{
		var arr = arrays.tyusResponses;
		var index = Math.floor((Math.random() * arr.length));
		message.client.reply(message, arr[index]);
		config.shittalkCounter = (Math.floor(Math.random() * config.shittalkMaxMessages) + 1);
	}	
};
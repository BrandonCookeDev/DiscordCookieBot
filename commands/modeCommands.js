var config 	= require('../data/config');
var arrays	= require('../data/arrays');
var common	= require('./common');

exports.ftumode = function(message, tyusUsername) {
	if (!(message.author.username === tyusUsername)) {
		if (config.isFTU) {
			config.isFTU = false;
			message.channel.sendMessage("FTU mode is now disabled!")
                .then(common.success)
                .catch(common.error);
		} else {
			config.isFTU = true;
			message.channel.sendMessage("FTU mode is now enabled!")
                .then(common.success)
                .catch(common.error);
		}
	}
};

exports.ftu = function(message, tyusUsername) {
	var user = message.author;
	var name = user.username.toLowerCase();
	var arr = arrays.tyusResponses;
	if (name.includes(tyusUsername))//|| name === 'cookie')
	{
		var index = Math.floor((Math.random() * arr.length));
		message.reply(arr[index])
            .then(common.success)
            .catch(common.error);
	}
};

exports.shittalkmode = function(message){
	if(!config.isShittalk) {
		config.isShittalk = true;
		config.shittalkCounter = (Math.floor(Math.random() * config.shittalkMaxMessages) + 1);
		message.channel.sendMessage('Shittalk mode is now enabled!')
            .then(common.success)
            .catch(common.error);
	} else{
		config.isShittalk = false;
		config.shittalkCounter = 0;
		message.channel.sendMessage('Shittalk mode is now disabled!')
            .then(common.success)
            .catch(common.error);
	}
};

exports.shittalk = function(message){
	if(config.shittalkCounter != 0){
		config.shittalkCounter--;
	}
	else{
		var arr = arrays.tyusResponses;
		var index = Math.floor((Math.random() * arr.length));
		message.reply(arr[index])
            .then(common.success)
            .catch(common.error);
		config.shittalkCounter = (Math.floor(Math.random() * config.shittalkMaxMessages) + 1);
	}	
};
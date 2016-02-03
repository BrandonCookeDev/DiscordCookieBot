var fs 		 = require('fs');
var botlog   = require('./botlog');
var urls	 = require("./data/urls");
var arrays	 = require("./data/arrays");
var imgs	 = require("./data/imgPaths");
var config	 = require("./data/config");

/** SERIOUS **/
exports.repo = function(message){
	message.client.sendMessage(message.channel, urls.streamControl);
};

exports.cookieRepo = function(message){
	message.client.sendMessage(message.channel, urls.cookieControl);
};

exports.mute = function(message, user){
	
};

/** SILLY **/
exports.saltyTears = function(message){
	message.client.sendMessage(message.channel, arrays.saltyTears);
};

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

exports.melee = function(message){
	var arr = arrays.meleeTips;
	var index = Math.floor(Math.random() * arr.length);
	var meleeMsg = arr[index];
	message.client.sendMessage(message.channel, meleeMsg, function(){
		console.log(err);
	});
};

exports.love = function(message, user, tyusUsername){
	var arr = arrays.love;
	if(!(user.username === tyusUsername)){
		var index = Math.floor(Math.random() * arr.length);
		var loveMsg = arr[index];
		message.client.reply(message, loveMsg, function(err){
			console.log(err);
		});
	}
	else
		message.client.reply(message, '.....', function(err){
			console.log(err);
		});
};

exports.bruciepie = function(message, bruceImgs){
	var index = Math.floor(Math.random() * bruceImgs.length);
	var bruceStream = fs.createReadStream(bruceImgs[index]);
	message.client.sendFile(message.channel, bruceStream, "Brucie.png");
};

exports.showmeyourmoves = function(message, falconImgs){
	var index = Math.floor(Math.random() * falconImgs.length);
	var falconStream = fs.createReadStream(falconImgs[index]);
	message.client.sendFile(message.channel, falconStream, "CFalc.png");
};

exports.thumb = function(message){
	var thumbStream = fs.createReadStream(imgs.thumbImg);
	message.client.sendFile(message.channel, thumbStream, 'thumb.jpg');
};

exports.bracket = function(message, bracket){
	message.client.sendMessage(message.channel, bracket, function(err){
		botlog.botlog(err);
	});
};

exports.suhdude = function(message){
	message.client.sendMessage(message.channel, urls.suhdudeUrl);
};

exports.conch = function(message){
	if(message.content.includes('what do I do')){
		message.client.reply(message.channel, 'Nothing.');
	}
	else if(message.content.includes('which one')){
		message.client.reply(message.channel, 'Neither.');
	}
	else{	
		var index = Math.floor(Math.random() * arrays.conch.length);
		var conchMsg = arrays.conch[index];
		message.client.reply(message.channel, conchMsg, function(err){
			console.log(err);
		});
	}
};

exports.google = function(message, searchCriteria){
	try{
		var url = "https://www.google.com/search?q=" + encodeURI(searchCriteria);	
		console.log(url);
		message.client.sendMessage(message.channel, 
									"Google search for " + searchCriteria + ": " + url,
									function(err){
										botlog.botlog(err);
									});
		
		//var win = window.open(url, '_blank');
	  	//win.focus();
	}catch(err){
		console.log(err);
	}
};

exports.privilege = function(message, username){
	try{
		console.log(username);
		var rand = (Math.floor(Math.random() * 99) + 1);
		switch(rand){
			case 100:
				var classA = "Pangendered Pyro Fox Demigod";
				message.client.sendMessage(message.channel, "Pirv: 100. you are a " + classA + " " + username);
				break;
			case 1:
				var classZ = "Cisgender Male Scum";
				message.client.sendMessage(message.channel, "Priv: 1, you are " + classZ + " " + username);
				break;
			default:
				if(rand < 50){
					if(username == null)
						message.client.sendMessage(message.channel, "Your Priv: " + rand + ". Check your privilege, bitch.");
					else 
						message.client.sendMessage(message.channel, "Your Priv: " + rand + ". " + username + ", check your privilege, bitch.");
				}else{
					if(username == null)
						message.client.sendMessage(message.channel, "Your Priv: " + rand + ". You aight, bro");
					else
						message.client.sendMessage(message.channel, "Your Priv: " + rand + ". You aight, " + username);
				}
				break;
		}
	}catch(err){
		console.log(err);
	}
};

exports.buzz = function(message, words){
	if(!words){
		//Flush array if no parameter
		arrays.buzzedWords = [];
	}
	else{
		words.forEach(function(word){
			//If word is already blocked, unblock
			if(arrays.buzzedWords.contains(word)){
				arrays.buzzedWords.splice(arrays.buzzedWords.indexOf(word), 1);
			var flag = false;
			for(var i=0; i < arrays.buzzedWords.length; i++){
				if(arrays.buzzedWords[i] === word){
					flag = true;
					break;
				}
			}
			
			if(flag){
				arrays.buzzedWords.splice(arrays.buzzedWords.indexOf(word), 1);
			
			}
			else{
				arrays.buzzedWords.push(word);
			}
		});
	}
};

exports.frames = function(message, character){
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

exports.help = function(message){
	message.client.sendMessage(message.channel, manual(config.version), function(err){
		console.log(err);
	});
};

function manual(version){
	var man = "cookiE_bot Version " + version + 
	"\nUSAGE: \n\t![command] [optional:user]" +
	"\n\nCommands (not case sensative):" +
	"\n!bracket \t\t\t\t\t\t- returns URL to most recent tournament" +
	"\n!google <keyword> \t- Google search on keyword" +
	"\n!ShowMeYourMoves - display a picture of C. Falcon" +
	"\n!BruciePie \t\t\t\t\t - display a picture of Bruce" +
	"\n!SuhDude \t\t\t\t\t - return embeded youtube video for SuhDude" +
	//"\n!FTU \t\t\t\t\t\t\t  - true/false switch for FTU mode" +
	"\n!privilege <user>\t\t - to check your privilege" +
	"\n!love \t\t\t\t\t\t\t  - Print a loving and motivational message!" +
	"\n!saltyTears \t\t\t\t   - Print a great message full of salt" +
	"\n!shittalk \t\t\t\t\t\t - Activate shittalk mode" +
	"\n!frames <character>\t  - Get the url to a melee character's frame data" + 
	"\n!repo \t\t\t\t\t\t\t  - Print the url for GAStreamControl" + 
	"\n!cookieRepo \t\t\t\t - Print the url for cookiE's old Stream Control program" +
	"\n!Help \t\t\t\t\t\t\t - Print the manual for cookiE_bot" +
	"\n";
	return man;
};


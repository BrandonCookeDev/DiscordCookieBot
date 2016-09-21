var fs 		 = require('fs');
var request	 = require('request').defaults({encoding: null});
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

exports.game = function(message, user, game){
	try{
		//console.log(message.author.game['name']);
		
		//if(message.author.game == null){
		//	console.log('yeah it\'s null');
		//	var oGame = new Object();
		//	oGame.name = game;
		//	message.author.game = oGame;
		//};
		
		//message.author.game['name'] = game;
		
		message.author.client.setStatus('online', game, function(err){
			console.log(err);
			botlog.botlog(err);
		});
	}catch(err){
		console.log(err);
	}
};



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

/** SILLY **/
exports.plagueis = function(message){
	message.client.sendMessage(message.channel, arrays.plagueis);
}

exports.saltyTears = function(message){
	message.client.sendMessage(message.channel, arrays.saltyTears);
};

exports.fuckLuigi = function(message){
	message.client.sendMessage(message.channel, arrays.fuckLuigi);
}

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

exports.randomImage = function(message, user, arr){
	var index = Math.floor(Math.random() * arr.length);
	var bruceStream = fs.createReadStream(arr[index]);
	message.client.sendFile(message.channel, bruceStream, "Brucie.png");
};

exports.waifu = function(message, user, waifuImgs){
	var index = Math.floor(Math.random() * waifuImgs.length);
	var waifuStream = fs.createReadStream(waifuImgs[index]);
	message.client.sendFile(message.channel, waifuStream, "ok.png");
};

exports.ok = function(message, user, okImgs){
	var index = Math.floor(Math.random() * okImgs.length);
	var okStream = fs.createReadStream(okImgs[index]);
	message.client.sendFile(message.channel, okStream, "ok.png");
};

exports.bruciepie = function(message, user, bruceImgs){
	var index = Math.floor(Math.random() * bruceImgs.length);
	var bruceStream = fs.createReadStream(bruceImgs[index]);
	message.client.sendFile(message.channel, bruceStream, "Brucie.png");
};

exports.showmeyourmoves = function(message, user, falconImgs){
	var index = Math.floor(Math.random() * falconImgs.length);
	var falconStream = fs.createReadStream(falconImgs[index]);
	message.client.sendFile(message.channel, falconStream, "CFalc.png");
};

exports.thumb = function(message){
	var thumbStream = fs.createReadStream(imgs.thumbImg);
	message.client.sendFile(message.channel, thumbStream, 'thumb.jpg');
};

exports.panGasm = function(message){
	var panStream = fs.createReadStream(imgs.panImg);
	message.client.sendFile(message.channel, panStream, 'PanGasm.png');
}

exports.bracket = function(message){
	message.client.sendMessage(message.channel, arrays.bracket, function(err){
		botlog.botlog(err);
	});
};

exports.smashDat = function(message){
	message.client.sendMessage(message.channel, arrays.smashDat, function(err){
		botlog.botlog(err);
	})
}

exports.suhdude = function(message){
	message.client.sendMessage(message.channel, urls.suhdudeUrl);
};

exports.conch = function(message){
	if(message.content.includes('what do I do')){
		message.client.sendMessage(message.channel, 'Nothing.');
	}
	else if(message.content.includes('which one')){
		message.client.sendMessage(message.channel, 'Neither.');
	}
	else{	
		var index = Math.floor(Math.random() * arrays.conch.length);
		var conchMsg = arrays.conch[index];
		console.log(conchMsg);
		message.client.sendMessage(message.channel, conchMsg);
	}
};

exports.google = function(message, user, searchCriteria){
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
					if(!username)
						message.client.sendMessage(message.channel, "Your Priv: " + rand + ". Check your privilege, fam.");
					else 
						message.client.sendMessage(message.channel, "Your Priv: " + rand + ". " + username + ", check your privilege, fam.");
				}else{
					if(!username)
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

exports.buzz = function(message, user, words){
	if(!words){
		//Flush array if no parameter
		message.client.sendMessage(message.channel,"Buzz list flushed");
		arrays.buzzedWords = [];
	}
	else{
		words.forEach(function(word){
			//If word is already blocked, unblock
			if(arrays.buzzedWords.indexOf(word) >= 0){
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
			}
		})
	}
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

exports.help = function(message){
	message.client.sendMessage(message.channel, manual(config.version), function(err){
		console.log(err);
	});
};

function manual(){
	var man = "cookiE_bot Version " + config.version + 
	"\nUSAGE: \n\t![command] [optional:parameter]" +
	"\n\nCommands (not case sensative):" +
	"\n!Help \t\t\t\t\t\t\t - Print the manual for cookiE_bot" +
	"\n" +
	"\n----SIMPLE COMMANDS----" +
	"\n!privilege <user>\t\t - to check your privilege" +
	"\n!melee \t\t\t\t\t\t  - print a random melee tip" +
	"\n!tweet <message>\t  - Tweet something out to the Discord Twitter: " + config.twHandle +
	"\n!love \t\t\t\t\t\t\t  - Print a loving and motivational message!" +
	"\n!conch \t\t\t\t\t\t  - have the magic conch shell tell you your future" + 
	"\n!game \t\t\t\t\t\t\t- Set the game cookiE_bot is playing" +
	"\n!frames <character>   - Get the url to a melee character's frame data" + 
	"\n!google <keyword> \t- Google search on keyword" +
	"\n!cookieRepo \t\t\t\t - Print the url for the code repository for cookiE bot" +
	"\n" + 
	"\n----COPYPASTA----" +
	"\n!saltyTears \t\t\t\t   - Print a great message full of salt" +
	"\n!fuckLuigi \t\t\t\t     - Print a great message full of luigi" +
	"\n" +
	"\n----IMAGES----" +
	"\n!ShowMeYourMoves - display a picture of C. Falcon" +
	"\n!BruciePie \t\t\t\t\t - display a picture of Bruce" +
	"\n!Rags \t\t\t\t\t\t	 - display a picture of medieval art" +
	"\n!pangasm \t\t\t\t\t  - display PanChamp cutout" +
	"\n!waifu \t\t\t\t\t\t    - display a random waifu" +
	"\n!ok \t\t\t\t\t\t\t\t - give everyone that good shit" +
	"\n" +
	"\n----VIDEOS----" +
	"\n!SuhDude \t\t\t\t\t - return embeded youtube video for SuhDude" +
	"\n" +
	"\n----MODES----" +
	"\n!shittalk \t\t\t\t\t\t - Activate shittalk mode" +
	//"\n!FTU \t\t\t\t\t\t\t  - true/false switch for FTU mode" +
	"\n";
	return man;
};
var common = require('./common');
var arrays = require('../data/arrays');

exports.melee = function(message){
	var arr = arrays.meleeTips;
	var index = Math.floor(Math.random() * arr.length);
	var meleeMsg = arr[index];
	message.channel.sendMessage(meleeMsg)
        .then(common.success)
        .catch(common.error);
};

exports.love = function(message, user, tyusUsername){
	var arr = arrays.love;
	if(!(user.username === tyusUsername)){
		var index = Math.floor(Math.random() * arr.length);
		var loveMsg = arr[index];
		message.reply(loveMsg)
            .then(common.success)
            .catch(common.error);
	}
	else
		message.reply('.....')
			.then(common.success)
			.catch(common.error);
};

exports.smashDat = function(message){
	message.channel.sendMessage(arrays.smashDat)
        .then(common.success)
        .catch(common.error);
};

exports.conch = function(message){
	if(message.content.includes('what do I do')){
		message.channel.sendMessage('Nothing.')
            .then(common.success)
            .catch(common.error);
	}
	else if(message.content.includes('which one')){
		message.channel.sendMessage('Neither.')
            .then(common.success)
            .catch(common.error);
	}
	else{	
		var index = Math.floor(Math.random() * arrays.conch.length);
		var conchMsg = arrays.conch[index];
		console.log(conchMsg);
		message.channel.sendMessage(conchMsg);
	}
};

exports.privilege = function(message, user, username){
	try{
		console.log(username);
		var rand = (Math.floor(Math.random() * 99) + 1);
		switch(rand){
			case 100:
				var classA = "Pangendered Pyro Fox Demigod";
				message.channel.sendMessage( "Pirv: 100. you are a " + classA + " " + username)
                    .then(common.success)
                    .catch(common.error);
				break;
			case 1:
				var classZ = "Cisgender Male Scum";
				message.channel.sendMessage("Priv: 1, you are " + classZ + " " + username)
                    .then(common.success)
                    .catch(common.error);
				break;
			default:
				if(rand < 50){
					if(!username)
						message.channel.sendMessage( "Your Priv: " + rand + ". Check your privilege, fam.")
                            .then(common.success)
                            .catch(common.error);
					else 
						message.channel.sendMessage( "Your Priv: " + rand + ". " + username + ", check your privilege, fam.")
                            .then(common.success)
                            .catch(common.error);
				}else{
					if(!username)
						message.channel.sendMessage( "Your Priv: " + rand + ". You aight, bro")
                            .then(common.success)
                            .catch(common.error);
					else
						message.channel.sendMessage( "Your Priv: " + rand + ". You aight, " + username)
                            .then(common.success)
                            .catch(common.error);
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
		message.channel.sendMessage("Buzz list flushed")
            .then(common.success)
            .catch(common.error);
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
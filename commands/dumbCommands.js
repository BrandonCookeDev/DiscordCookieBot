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

exports.smashDat = function(message){
	message.client.sendMessage(message.channel, arrays.smashDat, function(err){
		botlog.botlog(err);
	})
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

exports.privilege = function(message, user, username){
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
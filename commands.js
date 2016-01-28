var fs = require('fs');
var botlog = require('./botlog');

exports.ftu = function(tyusUsername, mybot) {
	if (!(message.author.username === tyusUsername)) {
		if (isFTU) {
			isFTU = false;
			mybot.sendMessage(message.channel, "FTU mode is now disabled!");
		} else {
			isFTU = true;
			mybot.sendMessage(message.channel, "FTU mode is now enabled!");
		}
	};
};

exports.ftumode = function(message, tyusUsername, tyusResponses, mybot) {
	var user = message.author;
	var name = user.username.toLowerCase();
	if (name === tyusUsername)//|| name === 'cookie')
	{
		var index = Math.floor((Math.random() * tyusResponses.length));
		mybot.reply(message, tyusResponses[index]);
	}
};

exports.bruciepie = function(message, bruceImgs){
	var index = Math.floor(Math.random() * bruceImgs.length);
	var bruceStream = fs.createReadStream(bruceImgs[index]);
	mybot.sendFile(message.channel, bruceStream, "Brucie.png");
};

exports.showmeyourmoves = function(message, falconImgs){
	var index = Math.floor(Math.random() * falconImgs.length);
	var falconStream = fs.createReadStream(falconImgs[index]);
	mybot.sendFile(message.channel, falconStream, "CFalc.png");
};

exports.thumb = function(message, thumbImg){
	var thumbStream = fs.createReadStream(thumbImg);
	mybot.sendFile(message.channel, thumbStream, 'thumb.jpg');
};

exports.bracket = function(message, bracket){
	mybot.sendMessage(message.channel, bracket, function(err){
		botlog.botlog(err);
	});
};

exports.suhdude = function(message, suhdudeUrl){
	mybot.sendMessage(message.channel, suhdudeUrl);
};

exports.help = function(message, version){
	logCommand(user, 'help');
	mybot.sendMessage(message.channel, manual(version));
};

exports.manual = function(version){
	var man = "cookiE_bot Version " + version + 
	"\nUSAGE: \n\t![command] [optional:user]" +
	"\n\nCommands (not case sensative):" +
	"\n!bracket \t\t\t\t\t\t- returns URL to most recent tournament" +
	"\n!ShowMeYourMoves - display a picture of C. Falcon" +
	"\n!BruciePie \t\t\t\t\t - display a picture of Bruce" +
	"\n!SuhDude \t\t\t\t\t - return embeded youtube video for SuhDude" +
	//"\n!FTU \t\t\t\t\t\t\t  - true/false switch for FTU mode" +
	"\n!Help \t\t\t\t\t\t\t - Print the manual for cookiE_bot" +
	"\n";	
	return man;
};


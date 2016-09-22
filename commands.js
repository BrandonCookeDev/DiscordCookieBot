var fs 		 = require('fs');
var request	 = require('request').defaults({encoding: null});

var botlog   = require('./botlog');
var urls	 = require("./data/urls");
var arrays	 = require("./data/arrays");
var imgs	 = require("./data/imgPaths");
var config	 = require("./data/config");

var seriousC   = require('./commands/seriousCommands');
var dumbC      = require('./commands/dumbCommands');
var copypastaC = require('./commands/copypastaCommands');
var imageC     = require('./commands/imageCommands');
var modeC      = require('./commands/modeCommands');
var videoC     = require('./commands/videoCommands');

var twitter  = null;
try{	
	twitter	 = require("./twitter.discord");
} catch(err){
	console.log("twitter unavailable");	
}

/** SERIOUS **/
exports.repo = function(message){
	seriousC.repo(message);
};

exports.cookieRepo = function(message){
	seriousC.cookieRepo(message);
};

exports.request = function(message, user){
	seriousC.request(message, user);
};

exports.google = function(message, user, searchCriteria){
	seriousC.google(message, user, searchCriteria);
};

exports.tweet = function(message, user, content){
    twitter.tweet(message, content);
};

exports.mute = function(message, user){
	// TODO implement this

};

exports.game = function(message, user, game){
	seriousC.game(message, user, game);
};

exports.avatar = function(message, url){
	seriousC.avatar(message, url);
};

exports.frames = function(message, user, character){
	seriousC.frames(message, user, character);
};

/** MODES **/
exports.ftumode = function(message, tyusUsername) {
	modeC.ftumode(message, tyusUsername);
};

exports.ftu = function(message, tyusUsername) {
	modeC.ftu(message, tyusUsername);
};

exports.shittalkmode = function(message){
	modeC.shittalkmode(message);
};

exports.shittalk = function(message){
	modeC.shittalk(message);	
};


/** IMAGES **/
exports.randomImage = function(message, user, arr){
	imageC.randomImage(message, user, arr);
};

exports.waifu = function(message, user){
	imageC.waifu(message, user);
};

exports.ok = function(message, user){
	imageC.ok(message, user);
};

exports.rags = function(message, user){
	imageC.rags(message, user);
};

exports.bruciepie = function(message, user){
	imageC.bruciepie(message, user);
};

exports.showmeyourmoves = function(message, user){
	imageC.showmeyourmoves(message, user);
};

exports.thumb = function(message){
	imageC.thumb(message);
};

exports.panGasm = function(message){
	imageC.panGasm(message);
}


/** DUMB **/
exports.melee = function(message){
	dumbC.melee(message);
};

exports.love = function(message, user, tyusUsername){
	dumbC.love(message, user, tyusUsername);
};

exports.smashDat = function(message){
	dumbC.smashDat(message);
}

exports.conch = function(message){
	dumbC.conch(message);
};

exports.privilege = function(message, user, username){
	dumbC.privilege(message, user, username);
};

exports.buzz = function(message, user, words){
	dumbC.buzz(message, user, words);
};


/** COPYPASTA **/
exports.plagueis = function(message){
	copypastaC.plagueis(message);
}

exports.saltyTears = function(message){
	copypastaC.saltyTears(message);
};

exports.fuckLuigi = function(message){
	copypastaC.fuckLuigi(message);
}

/** VIDEO **/
exports.suhdude = function(message){
    // TODO Implement video module
	message.client.sendMessage(message.channel, urls.suhdudeUrl);
};

/** HELP **/
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
	"\n!request \t\t\t\t\t  - Print url to submit new cookiE bot functionality requests" +
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
	"\n!plagueis \t\t\t\t\t   - Print copypasta about Lord Plagueis" +
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
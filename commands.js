var fs 		 = require('fs');
var request	 = require('request').defaults({encoding: null});

var log		 = require('./log');
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
};


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
};

/** VIDEO **/
exports.suhdude = function(message){
    // TODO Implement video module
	message.channel.sendMessage(urls.suhdudeUrl);
};


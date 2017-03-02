var Discord  = require("discord.js");
var commands = require('./commands');
var config 	 = require('./data/config');
var log		 = require('./log');

var bot = null;
var registeredCmds = [];

class HelpString{
	static init(){
		this.helpString = '';
	}

    static addToHelpString(s){
		this.helpString += s + '\n';
	}

	static addCommandToHelpString(name, description){
		var str = name + ' -- ' + description + '\n';
		this.helpString += str;
	}
}

function setDiscordBot(b){ bot = b; }

function register(text, callback, helpString){

	var cmd = {
		text: text,
		callback: callback
	};

    HelpString.addCommandToHelpString(text, helpString);

	registeredCmds[text] = cmd;
}

function execute(command, message, user, param){
	try{
		logCommand(user, command);
		console.log(command);
		registeredCmds[command].callback(message, user, param);
	}catch(err){
		console.log("ERROR:" +err);
		log.err(err);
	}
}

function logCommand(user, command)
{
	log.info(user.username + ", " + command);
}

function registerCommands(){
    var seriousCmd   = require('./commands/seriousCommands');
    var dumbCmd      = require('./commands/dumbCommands');
    var copypastaCmd = require('./commands/copypastaCommands');
    var imageCmd     = require('./commands/imageCommands');
    var modeCmd      = require('./commands/modeCommands');
    var videoCmd     = require('./commands/videoCommands');

    /** EVENTS **/
    /** REGISTER TEXT EVENTS USING
     reg.register(<text you're searching for>, <function to be called>)
     **/


//IMAGES
    HelpString.addToHelpString("\n----IMAGES----");
    register('thumb', 		imageCmd.thumb, 	'Give em a thumbs up!');
    register('ok', 			imageCmd.ok, 		'Give em the ok sign!');
    register('pangasm', 	imageCmd.panGasm, 	'Display the KPANGASM cutout');
    register('dolphin', 	imageCmd.dolphin, 	'Display a picture of Brandon and Flipper <3');
    register('rags', 		imageCmd.rags, 		'Display a photo of Medieval art');
    register('waifu', 		imageCmd.waifu, 	'Display a photo of your Waifu');
    register('bruciepie', 	imageCmd.bruciepie, 'Display a photo of Bruciepie Daryooni');
    register('sandler', 	imageCmd.sandler, 	'Display a photo of One True God Adam Sandler');
    register('showmeyourmoves', imageCmd.showmeyourmoves, 'HYES');

//SHITPOST COPYPASTA
    HelpString.addToHelpString("\n----COPYPASTA----");
    register('fuckluigi', 	copypastaCmd.fuckLuigi,  'Because fuck luigi');
    register('saltytears', 	copypastaCmd.saltyTears, 'Print a message full of salt');
    register('plagueis', 	copypastaCmd.plagueis, 	 'Print the Star Lord Darth Plagueis quote');

//VIDEO
    HelpString.addToHelpString("\n----VIDEOS----");
    register('suhdude', videoCmd.suhdude, 'Can I get a Carne Asuhdude?');

//DUMB COMMANDS
    HelpString.addToHelpString("\n----DUMB----");
    register('privilege', 	dumbCmd.privilege, 	'privilege [user] Check your own or someone else\'s privilege');
    register('smashdat', 	dumbCmd.smashDat, 	'Smash dat mf like button, my dude');
    register('love', 		dumbCmd.love, 		'love [user] Print a message of love <3');
    register('melee', 		dumbCmd.melee, 		'Print a solid tip for your play in Smash Bros Melee');
    register('conch', 		dumbCmd.conch, 		'conch [question] Print a message from the Magic Conch Shell');

//SERIOUS
    HelpString.addToHelpString("\n----SERIOUS----");
    register('google', 	seriousCmd.google, 	'Get a google url for something you want searched');
    register('tweet', 	seriousCmd.tweet, 	'Tweet a message to ' + config.twHandle);
    register('frames', 	seriousCmd.frames, 	'frames [character] print the url to the frame data of a melee character');
    register('request', seriousCmd.request, 'Print the url to make cookiebot requests');
    register('cookierepo', seriousCmd.cookieRepo, 'Print the url to the cookiebot source code repository');

//MODES
    HelpString.addToHelpString("\n----MODES----");
    register('ftu', 	 modeCmd.ftumode, 		'FTU');
    register('shittalk', modeCmd.shittalkmode, 	'Cookiebot will shittalk randomly');
}

module.exports = {
	register: register,
	execute: execute,
	registerCommands: registerCommands,
	HelpString: HelpString
};

var Discord  = require("discord.js");
var commands = require('./commands');
var botlog   = require('./botlog');

var bot = null;
var registeredCmds = [];

function setDiscordBot(b){ bot = b; }

function register(text, callback){

	var cmd = {
		text: text,
		callback: callback
	};
	
	registeredCmds[text] = cmd;
}

function execute(command, message, user, param){
	try{
		logCommand(user, command);
		console.log(command);
		registeredCmds[command].callback(message, user, param);
	}catch(err){
		console.log("ERROR:" +err);
		botlog.botlog(err);
	}
}

function logCommand(user, command)
{
	botlog.botlog(user.username + ", " + command);
}

module.exports = {
	register: register,
	execute: execute
};

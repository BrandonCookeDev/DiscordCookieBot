var Discord  = require("discord.js");
var commands = require('commands');
var botlog   = require('botlog');

var bot = null;
var registeredCmds = [];

function setDiscordBot(b){ bot = b; }

function register(user, text, callback){

	var cmd = {
		text: text,
		callback: callback
	}
	
	registeredCmds.push(cmd);

	
};

function execute(user, text){
	try{
		logCommand(user, text);
		//var game = command.substring(command.indexOf(" ") + 1);
		console.log(parameter);
		
		registeredCmds.forEach( (cmd) => {
			if(cmd.text === text){
				
			}
		})
	}catch(err){
		console.log("ERROR:" +err);
		botlog.botlog(err);
	}
};

function logCommand(user, command)
{
	botlog.botlog(user.username + ", " + command);
};

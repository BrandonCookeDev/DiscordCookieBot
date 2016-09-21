/** IMPORTS **/
var Discord  = require("discord.js");
var fs 		 = require("fs");
var cluster  = require("cluster");
var express	 = require("express");
var botlog   = require("./botlog");
var commands = require("./commands");
var reg		 = require('./commandRegister');
var urls	 = require("./data/urls");
var arrays	 = require("./data/arrays");
var imgs	 = require("./data/imgPaths");
var config	 = require("./data/config");
var mybot 	 = new Discord.Client();

var twitter  = null;
try{	
	twitter	 = require("./twitter.discord");
} catch(err){
	console.log("twitter unavailable");	
}

/** CONFIG **/
var servers    = [];
var channelMap = {};


/** NONSENSE **/
/* FTU */
var isFTU = false;
var tyusUsername = 'karma';

console.log("Running cookiE_bot...");

/** EVENTS **/

//IMAGES
reg.register('thumb', commands.thumb);
reg.register('ok', commands.ok);
reg.register('pangasm', commands.panGasm);
reg.register('rags', commands.rags);
reg.register('waifu', commands.waifu);
reg.register('bruciepie', commands.bruciepie);
reg.register('showmeyourmoves', commands.showmeyourmoves);

//SHITPOST COPYPASTA
reg.register('fuckluigi', commands.fuckLuigi);
reg.register('saltytears', commands.saltyTears);
reg.register('plagueis', commands.plagueis);

//VIDEO
reg.register('suhdude', commands.suhdude);

//DUMB COMMANDS
reg.register('privilege', commands.privilege);
reg.register('smashdat', commands.smashDat);
reg.register('love', commands.love);
reg.register('melee', commands.melee);
reg.register('conch', commands.conch);

//SERIOUS
reg.register('help', commands.help);
reg.register('mute', commands.mute);
reg.register('game', commands.game);
reg.register('google', commands.google);
reg.register('tweet', commands.tweet);
reg.register('avatar', commands.avatar);
reg.register('frames', commands.frames);
reg.register('cookierepo', commands.cookieRepo);

//MODES
reg.register('ftu', commands.ftumode);
reg.register('shittalk', commands.shittalkmode);

mybot.on("message", function(message){
	if(message.content.charAt(0) === "!")
    {
    	var command = ''
		if(message.content.includes(" "))
			command = message.content.substring(1, message.content.indexOf(" ")).toLowerCase();
		else
			command = message.content.substring(1).toLowerCase();
		
    	var parameter = null;
    	if(message.content.includes(" "))
    		parameter = message.content.substring(message.content.indexOf(" ") + 1);
    	var user = message.author;
	
		reg.execute(command, message, user, parameter);
	}
    else
    {
    	/** USER BASED **/
    	if(config.isFTU){
    		try{
	    		commands.ftu(message, tyusUsername);
			}catch(err){
				botlog.botlog(err);
			}    		
    	}
    	
    	if(config.isShittalk){
    		try{
    			commands.shittalk(message);
    		} catch(err){
    			console.log(err);
    		}
    	}
    }
});

mybot.on("ready", function(){
	console.log("Targetting " + config.target + "...");
	console.log("Ready event hit");
});

mybot.on("disconnected", function(){
	console.log("disconnected from the server. Attempting reconnection.");
	
	process.exit();
	//config.connected = false;
	//retryLogin(mybot);
});

mybot.on("error", function(err){
	if(err)
		console.log("A large error occured: " + err);	
	process.exit();
	//config.connected = false;
	//retryLogin(mybot);
});

if (cluster.isMaster) {
	cluster.fork();

	cluster.on('exit', function(worker, code, signal) {
		cluster.fork();
	});
}

/** MAIN **/
if (cluster.isWorker) {
	try{
		if(process.argv.length > 2){
			if(process.argv[2] === 'prod')
				config.target = 'prod';
		}
		
		/** LOGIN **/		
		if(config.target === "test")
			mybot.login("golee5191@hotmail.com", "botmedaddy!").then(loginSuccess).catch(function(err){
				console.log(err);
				sleep(5000);
				process.exit();
			}) 	  //TEST 
		else if(config.target === "prod")
			mybot.login("ckscookiessbm@gmail.com", "botmedaddy!").then(loginSuccess).catch(function(){
				sleep(5000);
				process.exit();
			});   //PROD
		else
		{
			console.log("Failure. Incorrect target. Terminating....");
			sleep(5000);
			process.exit();
		}
	} catch(err){
		process.exit();
	}
}

/** FUNCTIONS **/
function loginSuccess(token)
{	
	try{
		//SET CONFIG
		console.log("Connected to server!");
		config.connected = true;
		
		//INIT PICTURE ARRAYS
		if(arrays.falconImgs.length == 0)
			initPictureArray(imgs.falconDir, arrays.falconImgs);
		
		if(arrays.bruceImgs.length == 0)
			initPictureArray(imgs.bruceDir, arrays.bruceImgs);	
		
		if(arrays.ragsImgs.length == 0)
			initPictureArray(imgs.ragsDir, arrays.ragsImgs);
			
		if(arrays.okImgs.length == 0)
			initPictureArray(imgs.okDir, arrays.okImgs);
			
		if(arrays.waifuImgs.length == 0)
			initPictureArray(imgs.waifuDir, arrays.waifuImgs);
	}
	catch(err)
	{
		try{
			botlog.botlog(err);
		}catch(err)
		{
			console.log(err);
		}
	}
}

function initPictureArray(dir, arr)
{
	try{
		console.log('Populating ' + dir + ' array');
	 	fs.readdir(dir, function (err, list) {  	
	    // Return the error if something went wrong
	    if (err)
	      console.log(err);
	
	    // For every file in the list
	    list.forEach(function (file) {
	      // Full path of that file
	      path = dir + "/" + file;
	      console.log("Adding " + path);
	      arr.push(path);
	    });
	  });
	} catch(err){
		botlog.botlog(err);
	}
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function logCommand(user, command)
{
	botlog.botlog(user.username + ", " + command);
}



/** IMPORTS **/
var credentials = require('./credentials');

var Discord  = require("discord.js");
var fs 		 = require("fs");
var cluster  = require("cluster");
var express	 = require("express");

var log   = require("./log");
var commands = require("./commands");
var reg		 = require('./commandRegister');
var urls	 = require("./data/urls");
var arrays	 = require("./data/arrays");
var imgs	 = require("./data/imgPaths");
var config	 = require("./data/config");

var seriousCmd   = require('./commands/seriousCommands');
var dumbCmd      = require('./commands/dumbCommands');
var copypastaCmd = require('./commands/copypastaCommands');
var imageCmd     = require('./commands/imageCommands');
var modeCmd      = require('./commands/modeCommands');
var videoCmd     = require('./commands/videoCommands');

var mybot 	 = new Discord.Client();
log.info('Beginning cookiE bot');

var twitter  = null;
try{	
	twitter	 = require("./twitter.discord");
} catch(err){
	console.error("twitter unavailable");
	log.warn('Twitter Unavailable');
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
/** REGISTER TEXT EVENTS USING 
reg.register(<text you're searching for>, <function to be called>) 
**/

//IMAGES
reg.register('thumb', imageCmd.thumb);
reg.register('ok', imageCmd.ok);
reg.register('pangasm', imageCmd.panGasm);
reg.register('dolphin', imageCmd.dolphin);
reg.register('rags', imageCmd.rags);
reg.register('waifu', imageCmd.waifu);
reg.register('bruciepie', imageCmd.bruciepie);
reg.register('showmeyourmoves', imageCmd.showmeyourmoves);

//SHITPOST COPYPASTA
reg.register('fuckluigi', copypastaCmd.fuckLuigi);
reg.register('saltytears', copypastaCmd.saltyTears);
reg.register('plagueis', copypastaCmd.plagueis);

//VIDEO
reg.register('suhdude', videoCmd.suhdude);

//DUMB COMMANDS
reg.register('privilege', dumbCmd.privilege);
reg.register('smashdat', dumbCmd.smashDat);
reg.register('love', dumbCmd.love);
reg.register('melee', dumbCmd.melee);
reg.register('conch', dumbCmd.conch);

//SERIOUS
reg.register('help', seriousCmd.help);
reg.register('mute', seriousCmd.mute);
reg.register('game', seriousCmd.game);
reg.register('google', seriousCmd.google);
reg.register('tweet', seriousCmd.tweet);
reg.register('avatar', seriousCmd.avatar);
reg.register('frames', seriousCmd.frames);
reg.register('request', seriousCmd.request);
reg.register('cookierepo', seriousCmd.cookieRepo);

//MODES
reg.register('ftu', modeCmd.ftumode);
reg.register('shittalk', modeCmd.shittalkmode);

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
				log.err(err);
			}    		
    	}
    	
    	if(config.isShittalk){
    		try{
    			commands.shittalk(message);
    		} catch(err){
    			log.err(err);
    		}
    	}
    }
});

mybot.on("ready", function(){
	console.log("Targetting " + config.target + "...");
	console.log("Ready event hit");
	log.info("Targetting " + config.target + "...");
	log.info('Ready event hit')
});

mybot.on("disconnected", function(err){
	log.err(err);
	console.log("disconnected from the server. Attempting reconnection.");
    mybot.user.setStatus('invisible');
	process.exit();
	//config.connected = false;
	//retryLogin(mybot);
});

mybot.on("error", function(err){
	if(err) {
        console.log("A large error occured: " + err);
		log.err(err);
    }
	mybot.user.setStatus('invisible');
	process.exit();
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
			mybot.login(credentials.test)
				.then(loginSuccess).catch(function(err){
					console.log(err);
					sleep(5000);
					process.exit();
			}); 	  //TEST
		else if(config.target === "prod")
			mybot.login(credentials.prod)
			  	.then(loginSuccess).catch(function(){
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
		// SET STATUS TO ONLINE
		mybot.user.setStatus('online');

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
			log.err(err);
		}catch(err)
		{
			log.err(err);
		}
	}
}

function initPictureArray(dir, arr)
{
	try{
		log.verbose('Populating ' + dir + ' array');
		console.log('Populating ' + dir + ' array');
	 	fs.readdir(dir, function (err, list) {  	
	    // Return the error if something went wrong
	    if (err) {
            console.log(err);
            log.err(err);
        }
	    // For every file in the list
	    list.forEach(function (file) {
	      // Full path of that file
	      path = dir + "/" + file;
	      console.log("Adding " + path);
	      arr.push(path);
	    });
	  });
	} catch(err){
		log.err(err);
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
	log.info(user.username + ", " + command);
}




///////////////////////////////////
// UNCAUGHT ERROR HANDLER
//
function errHandler(e){
	console.error('CRITICAL: uncaught error')
	console.error(e)
	process.exit(1)
}
process.on('error', errHandler)
process.on('unhandledRejection', errHandler)
process.on('uncaughtException', errHandler)

function killHandler(){
	console.warn('process terminating due to signal....')
	process.exit(2)
}
process.on('SIGINT', killHandler)
process.on('SIGTERM', killHandler)
//
//////////////////////////////////


/** IMPORTS **/
var path = require('path')
require('dotenv').config({path: path.join(__dirname, '.env')})

var Discord  = require("discord.js");
var fs 		 = require("fs");
var cluster  = require("cluster");

var log   	 = require("./log");
var commands = require("./commands");
var reg		 = require('./commandRegister');
var urls	 = require("./data/urls");
var arrays	 = require("./data/arrays");
var imgs	 = require("./data/imgPaths");
var config	 = require("./data/config");
var common	 = require('./commands/common');

// RESTART ON TAKEDOWN
if (cluster.isMaster) {
    cluster.fork();

    cluster.on('exit', function(worker, code, signal) {
        cluster.fork();
    });
}

var mybot 	 = new Discord.Client();
log.info('Beginning cookiE bot');

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
reg.HelpString.init();
reg.HelpString.addToHelpString('cookiE_bot Version: ' + config.version);
reg.HelpString.addToHelpString('USAGE:');
reg.HelpString.addToHelpString('  ![command][optional:parameter]');

//HELP
reg.HelpString.addToHelpString('\n----HELP----');
reg.register('help', function(message, user, param){
    message.channel.sendMessage(reg.HelpString.helpString)
        .then(common.success)
        .catch(common.error);
}, 'Print the help string for a list of commands');

//GAME
reg.HelpString.addToHelpString('\n----GAME----');
reg.register('game', function(command, message){mybot.setGame(message)}, 'Set the bot\s current game');

reg.registerCommands();


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

mybot.on('unhandledRejection', console.error);

mybot.on("error", function(err){
	if(err) {
        console.log("A large error occured: " + err);
		log.err(err);
    }
	mybot.user.setStatus('invisible');
	process.exit();
});

/** MAIN **/
if (cluster.isWorker) {
	try{
		//if(process.argv.length > 2){
		//	if(process.argv[2] === 'prod')
		//		config.target = 'prod';
		//}
		
		/** LOGIN **/
        //credentials.getDiscordCredentialsByEnvironment(config.target)
		//	.then(function(discord){

		if(process.env.DISCORD_API_KEY) {
			mybot.login(process.env.DISCORD_API_KEY)
				.then(loginSuccess)
				.catch(function (err) {
					console.error(err);
					log.err(err);

					sleep(5000);
					process.exit();
				});
		}
		else
		{
			console.error("Failure. Incorrect target. Terminating....");
			log.err("Failure. Incorrect target. Terminating....");
			sleep(5000);
			process.exit();
		}

			//})

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

		//FETCH TWITTER
		initTwitter();
		
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

		if(arrays.sandlerImgs.length == 0)
			initPictureArray(imgs.sandlerDir, arrays.sandlerImgs);
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

function initTwitter(){
    var twitter  = null;
    try{
        twitter = require("./twitter.discord");
        twitter.initTwitter();

    } catch(err){
        console.warn("twitter unavailable");
        log.warn('Twitter Unavailable');
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

// healthcheck ping
var http = require('http');
http.createServer(function (req, res) {
  log.debug('healthcheck server pinged')
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World!');
  res.end();
}).listen(process.env.PORT || 8080);

// keep alive function
http.get(`http://127.0.0.1:${process.env.PORT || 8080}`); //test
setInterval(function() { 
    http.get(`http://127.0.0.1:${process.env.PORT || 8080}`);
}, 300000);

/** IMPORTS **/
var Discord  = require("discord.js");
var fs 		 = require("fs");
var cluster  = require("cluster");
var botlog   = require("./botlog");
var commands = require("./commands");
var urls	 = require("./data/urls");
var arrays	 = require("./data/arrays");
var imgs	 = require("./data/imgPaths");
var config	 = require("./data/config");
var mybot 	 = new Discord.Client();

/** CONFIG **/
var servers    = [];
var channelMap = {};
var falconImgs = [];
var bruceImgs  = [];

/** NONSENSE **/
/* FTU */
var isFTU = false;
var tyusUsername = 'karma';

/*** MESSAGES ***/
var bracket = "Flashback Games 21: " + urls.bracketUrl;

console.log("Running cookiE_bot...");

/** EVENTS **/
mybot.on("message", function(message){
    if(message.content === "ping")
        mybot.reply(message, "pong");
        
    //EVENTS TAILORED TO COMMANDS GO BELOW
    if(message.content.charAt(0) === "!")
    {
    	var command  = message.content.substring(1).toLowerCase();
    	var parameter = null;
    	if(command.includes(" "))
    		parameter = message.content.substring(message.content.indexOf(" ") + 1);
    	var user = message.author; 
    	
    	/** SERIOUS **/
    	if(command.substring(0, 4) === "mute"){
    		var memberName = command.substring(command.indexOf(" "));
    		try{
	    		var server = message.channel.server;
	    		var u = server.members.get("username", memberName);	    		
	    	}
	    	catch(err)
	    	{
	    		mybot.reply(message, "The user " + memberName + " isn't in the chat");
	    		botlog.botlog("The user " + memberName + " isn't in the chat");
	    	}     		
    	}
    	
    	if(command.substring(0, 6) === 'google'){
    		//logCommand(user, 'google');
    		try{
    			var searchCriteria = command.substring(command.indexOf(" ") + 1);
    			console.log(searchCriteria);
    			commands.google(message, searchCriteria);    			
    		} catch(err){
    			botlog.botlog(err);
    		}    		
    	}
    	
    	if(command === 'repo'){
    		try{
    			commands.repo(message);
    		} catch(err){
    			console.log(err);
    		}
    	}
    	
    	if(command === 'cookierepo'){
    		try{
    			commands.cookieRepo(message);
    		} catch(err){
    			console.log(err);
    		}
    	}
    	
    	/** SILLY **/
    	if(command === "bracket"){
    		logCommand(user, 'bracket');
    		commands.bracket(message);
    	}
    		
    	if(command.substring(0, 9) === "privilege"){
    		try{	    				
	    		logCommand(user, 'privilege');
	    		commands.privilege(message, parameter);
    		} catch(err){
    			console.log(err);
    		}
    	}
    	
    	if(command === 'saltytears'){
    		logCommand(user, 'saltytears');
    		commands.saltyTears(message);
    	}
    		
    	if(command === "thumb"){
    		try{
    			logCommand(user, 'thumb');
    			commands.thumb(message);
	    	}catch(err){
	    		botlog.botlog(err);
	    		mybot.sendMessage(message.channel, 'An error occured. Please yell at cookiE');
	    	}
    	}
    	
    	if(command === "showmeyourmoves"){
    		try{
    			logCommand(user, 'showmeyourmoves');
    			commands.showmeyourmoves(message, falconImgs);
    		}catch(err){
    			botlog.botlog(err);
    			mybot.sendMessage(message.channel, urls.falconUrl).catch(console.log);
    		}
    	}
    	
    	if(command === 'love'){
    		try{
    			commands.love(message, user, tyusUsername);
    		}catch(err){
    			console.log(err);
    		}
    	}
    	
    	if(command === 'melee'){
    		try{
    			commands.melee(message);
    		}catch(err){
    			console.log(err);
    		}
    	}
    	
    	if(command === 'eeee'){
    		throw "OnPurposeError";
    	}
    		
    	if(command === "bruciepie"){
    		try{
    			logCommand(user, 'bruciepie');
    			commands.bruciepie(message, bruceImgs);
	    	}catch(err){
	    		botlog.botlog(err);
	    		mybot.sendMessage(message.channel, urls.bruceUrl);	
	    	}    		
    	}
    		
    	if(command === "suhdude"){
    		try{
    			logCommand(user, 'suhdude');
    			commands.suhdude(message);
    		}catch(err){
    			console.log(err);
    		}
    	}
    	
    	if(command.substring(0,6) === 'frames'){
    		try{
    			logCommand(user, 'frames');
    			commands.frames(message, command.substring(command.indexOf(" ") + 1));
    		}catch(err){
    			console.log(err);
    		}
    	}
    		
    	if(command === "help" || command === "man"){
	    	try{
	    		logCommand(user, 'help');
	    		commands.help(message);
    		}catch(err){
    			console.log(err);
    		}
    	}
    	
    	if(command === "shittalk"){
    		try{
    			logCommand(user, 'shittalk');
    			commands.shittalkmode(message);
    		} catch(err){
    			console.log(err);
    		}
    	}
    	
    	/*	
    	if(command === "ftu")
    	{
    		try{
    			logCommand(user, 'ftu');
    			commands.ftumode(message, tyusUsername);
	    	}catch(err){
	    		botlog.botlog(err);
	    	}
    	}
    	*/
    }
    //ANY EVENTS CONNECTED TO NON-COMMANDS GO BELOW
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
		/** LOGIN **/
		console.log("Targetting " + config.target + "...");
		if(config.target === "test")
			mybot.login("golee5191@hotmail.com", "botmedaddy!").then(loginSuccess).catch(function(){
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
		if(falconImgs.length == 0)
			initPictureArray(imgs.falconDir, falconImgs);
		
		if(bruceImgs.length == 0)
			initPictureArray(imgs.bruceDir, bruceImgs);	
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



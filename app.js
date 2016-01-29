var timeout = 5000;

/** IMPORTS **/
var Discord  = require("discord.js");
var fs 		 = require("fs");
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
        
    if(message.content.charAt(0) === "!")
    {
    	var command  = message.content.substring(1).toLowerCase();
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
    			var searchCriteria = command.substring(command.indexOf(" "));
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
    	
    	if(command === 'cookiErepo'){
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
    		
    	if(command === "privilege"){
    		logCommand(user, 'privilege');
    		commands.privilege(message);
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
    			commands.love(message, user);
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
    		
    	if(command === "help" || command === "man"){
	    	try{
	    		logCommand(user, 'help');
	    		commands.help(message);
    		}catch(err){
    			console.log(err);
    		}
    	}
    	
    	/*	
    	if(command === "ftu")
    	{
    		try{
    			logCommand(user, 'ftu');
    			commands.ftu(message, tyusUsername);
	    	}catch(err){
	    		botlog.botlog(err);
	    	}
    	}
    	*/
    }
    else
    {
    	/** USER BASED **/
    	if(isFTU){
    		try{
	    		commands.ftumode(message, tyusUsername);
			}catch(err){
				botlog.botlog(err);
			}    		
    	}
    }
});

mybot.on("ready", function(){
	console.log("Ready event hit");
});

mybot.on("disconnected", function(){
	console.log("disconnected from the server. Attempting reconnection.");
	
	console.log("Reconnected to server!");
});

mybot.on("error", function(err){
	if(err)
		console.log("A large error occured: " + err);
	
	retryLogin();
	console.log("Reconnected to server!");
});


/** LOGIN **/
console.log("Targetting " + config.target + "...");
if(config.target === "test")
	mybot.login("golee5191@hotmail.com", "botmedaddy!").then(loginSuccess).catch(console.log); 	  //TEST 
else if(config.target === "prod")
	mybot.login("ckscookiessbm@gmail.com", "botmedaddy!").then(loginSuccess).catch(console.log);   //PROD
else
{
	console.log("Failure. Incorrect target. Terminating....");
	process.exit();
}

/** FUNCTIONS **/
function loginSuccess(token)
{	
	try{
		//Init Falcon Picture Array
		initPictureArray(imgs.falconDir, falconImgs);
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

function retryLogin()
{
	var flag = true;
	while(flag){
		console.log("Targetting " + config.target + "...");
		if(config.target === "test")
			mybot.login("golee5191@hotmail.com", "botmedaddy!").then(flag = false).catch(console.log); 	  //TEST 
		else if(config.target === "prod")
			mybot.login("ckscookiessbm@gmail.com", "botmedaddy!").then(flag = false).catch(console.log);   //PROD
		else
		{
			console.log("Failure. Incorrect target. Terminating....");
			process.exit();
		}
		
		setTimeout(function(){console.log("timeout, retying in " + timeout);}, timeout);
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


function logCommand(user, command)
{
	botlog.botlog(user.username + ", " + command);
}



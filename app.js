/** TARGET ENVIRONMENT (test or prod) **/
//var target = "prod";
var target = "test";
var version = "1.0.3";

/** IMPORTS **/
var Discord  = require("discord.js");
var fs 		 = require("fs");
var botlog   = require("./botlog");
var commands = require("./commands");
var urls	 = require("./data/urls");
var imgs	 = require("./data/imgPaths");
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
var tyusResponses = ['no.', 'Ty, stop', 'k', 'just stop', 'stop talking...', 'shhhhhhh', 'ah cool bro', 'nobody gives a shit'];

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
    	
    	console.log(command);
    	console.log(command.substring(1,7));
    	/** SERIOUS **/
    	if(command.substring(1, 5) === "mute"){
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
    	
    	if(command.substring(1, 7) === 'google'){
    		console.log
    		//logCommand(user, 'google');
    		try{
    			var searchCriteria = command.substring(command.indexOf(" "));
    			console.log(searchCriteria);
    			commands.google(message, searchCriteria);    			
    		} catch(err){
    			botlog.botlog(err);
    		}    		
    	}
    	
    	/** SILLY **/
    	if(command === "bracket"){
    		logCommand(user, 'bracket');
    		commands.bracket(message, bracket);
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
    			commands.suhdude(message, urls.suhdudeUrl);
    		}catch(err){
    			console.log(err);
    		}
    	}
    		
    	if(command === "help" || command === "man"){
	    	try{
	    		logCommand(user, 'help');
	    		commands.help(message, version);
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
	    		commands.ftumode(message, tyusUsername, tyusResponses);
			}catch(err){
				botlog.botlog(err);
			}    		
    	}
    }
});

mybot.on("ready", function(){
	
});

mybot.on("disconnected", function(){
	
});

/** LOGIN **/
console.log("Targetting " + target + "...");
if(target === "test")
	mybot.login("golee5191@hotmail.com", "botmedaddy!").then(loginSuccess).catch(console.log); 	  //TEST 
else if(target === "prod")
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



/** TARGET ENVIRONMENT (test or prod) **/
//var target = "prod";
var target = "test";
var version = "1.0.3";

/** IMPORTS **/
var Discord = require("discord.js");
var fs 		= require("fs");
var botlog  = require("./botlog.js");
var mybot 	= new Discord.Client();

/** CONFIG **/
var servers    = [];
var channelMap = {};

/** NONSENSE **/
/* FTU */
var isFTU = false;
var tyusUsername = 'karma';
var tyusResponses = ['no.', 'Ty, stop', 'k', 'just stop', 'stop talking...', 'shhhhhhh', 'ah cool bro', 'nobody gives a shit'];

/*** IMAGES ***/
var bruceDir   = "./content/images/Bruce";
var falconDir  = "./content/images/Falcon";
var thumbImg   = "./content/images/thumb.jpg";
var falconImgs = [];
var bruceImgs  = [];

/*** URLs ***/
var bracketUrl = 'http://challonge.com/fbgt21';
var falconUrl  = 'https://upload.wikimedia.org/wikipedia/en/4/4c/Captain_Falcon_character_portrait.png';
var bruceUrl   = 'http://imgur.com/90kq6VT';
var suhdudeUrl = 'https://www.youtube.com/watch?v=pIHYPaoh79I';

/*** MESSAGES ***/
var bracket = "Flashback Games 21: " + bracketUrl;

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
    	if(command.substring(1, 4) === "mute")
    	{
    		var memberName = command.substring(command.indexOf(" "));
    		try{
	    		var server = message.channel.server;
	    		var u = server.members.get("username", memberName);
	    		
	    	}
	    	catch(err)
	    	{
	    		mybot.reply(message, "The user " + memberName + " isn't in the chat");
	    	}     		
    	}
    	
    	/** SILLY **/
    	if(command === "bracket"){
    		logCommand(user, 'bracket');
    		mybot.sendMessage(message.channel, bracket, function(err){
    			botlog.botlog(err);
    		});
    	}
    		
    	if(command === "thumb")
    	{
    		try{
    			logCommand(user, 'thumb');
	    		var thumbStream = fs.createReadStream(thumbImg);
	    		mybot.sendFile(message.channel, thumbStream, 'thumb.jpg');
	    	}
	    	catch(err)
	    	{
	    		console.log(err);
	    		mybot.sendMessage(message.channel, 'An error occured. Please yell at cookiE');
	    	}
    	}
    	
    	if(command === "showmeyourmoves")
    	{
    		try{
    			logCommand(user, 'showmeyourmoves');
    			var index = Math.floor(Math.random() * falconImgs.length);
    			var falconStream = fs.createReadStream(falconImgs[index]);
    			mybot.sendFile(message.channel, falconStream, "CFalc.png");
    		}
    		catch(err){
    			console.log(err);
    			mybot.sendMessage(message.channel, falconUrl).catch(console.log);
    		}
    	}
    		
    	if(command === "bruciepie")
    	{
    		try{
    			logCommand(user, 'bruciepie');
    			var index = Math.floor(Math.random() * bruceImgs.length);
	    		var bruceStream = fs.createReadStream(bruceImgs[index]);
	    		mybot.sendFile(message.channel, bruceStream, "Brucie.png");
	    	}
	    	catch(err)
	    	{
	    		console.log(err);
	    		mybot.sendMessage(message.channel, bruceUrl);	
	    	}
    		
    	}
    		
    	if(command === "suhdude"){
    		logCommand(user, 'suhdude');
    		mybot.sendMessage(message.channel, suhdudeUrl);
    	}
    		
    	if(command === "help" || command === "man"){
    		logCommand(user, 'help');
    		mybot.sendMessage(message.channel, exportManual());
    	}
    	
    	/*	
    	if(command === "ftu")
    	{
    		try{
    			logCommand(user, 'ftu');
    			if(!(message.author.username === tyusUsername))
    			{
		    		if(isFTU){
		    			 isFTU = false;
		    			 mybot.sendMessage(message.channel, "FTU mode is now disabled!");
		    		}
		    		else{
		    			 isFTU = true;
		    			 mybot.sendMessage(message.channel, "FTU mode is now enabled!");	 
		    		}
		    	}
	    	}
	    	catch(err)
	    	{
	    		console.log(err);
	    	}
    	}
    	*/
    }
    else
    {
    	/** USER BASED **/
    	if(isFTU)
    	{
    		try{
	    		var user = message.author;
				var name = user.username.toLowerCase();
				//console.log(name);
	    		if(name === tyusUsername)//|| name === 'cookie')
	    		{
    				var index = Math.floor((Math.random() * tyusResponses.length));
    				//console.log(index + ", " + tyusResponses[index]);
	    			mybot.reply(message, tyusResponses[index]);
	    		}
			}
			catch(err)
			{
				console.log(err);
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
		initPictureArray(falconDir, falconImgs);
		initPictureArray(bruceDir, bruceImgs);	
	}
	catch(err)
	{
		console.log(err);
	}
}


function exportManual(){
	var man = "cookiE_bot Version " + version + 
	"\nUSAGE: \n\t![command] [optional:user]" +
	"\n\nCommands (not case sensative):" +
	"\n!bracket \t\t\t\t\t\t- returns URL to most recent tournament" +
	"\n!ShowMeYourMoves - display a picture of C. Falcon" +
	"\n!BruciePie \t\t\t\t\t - display a picture of Bruce" +
	"\n!SuhDude \t\t\t\t\t - return embeded youtube video for SuhDude" +
	//"\n!FTU \t\t\t\t\t\t\t  - true/false switch for FTU mode" +
	"\n!Help \t\t\t\t\t\t\t - Print the manual for cookiE_bot" +
	"\n";	
	return man;
}

function initPictureArray(dir, arr)
{
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
}

function logCommand(user, command)
{
	botlog.botlog(user.username + ", " + command);
}

function getChannels()
{
	var server = new ServerChannel();
	
}


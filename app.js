/** TARGET ENVIRONMENT (test or prod) **/
var target = "prod";
//var target = "test";
var version = "1.0";

/** IMPORTS **/
var Discord = require("discord.js");
var fs 		= require("fs");
var mybot 	= new Discord.Client();

/** CONFIG **/
var servers = [];
var channelMap = {};

/** NONSENSE **/
/* FTU */
var isFTU = false;
var tyusUsername = 'karma';
var tyusResponses = ['no.', 'Ty, stop', 'k', 'just stop', 'stop talking...', 'shhhhhhh'];

/*** IMAGES ***/
var bruceImg  = "./content/images/Brucie.PNG";
var falconImg = "./content/images/CFalc.png";

/*** URLs ***/
var bracketUrl = 'http://challonge.com/fbgt21';
var falconUrl = 'https://upload.wikimedia.org/wikipedia/en/4/4c/Captain_Falcon_character_portrait.png';
var bruceUrl = 'http://imgur.com/90kq6VT';
var suhdudeUrl = 'https://www.youtube.com/watch?v=pIHYPaoh79I';

/*** MESSAGES ***/
var bracket = "Flashback Games 21: " + bracketUrl;

console.log("Running cookiE_bot...");

mybot.on("message", function(message){
    if(message.content === "ping")
        mybot.reply(message, "pong");
        
    if(message.content.charAt(0) === "!")
    {
    	var command = message.content.substring(1).toLowerCase();
    	/** SERIOUS **/
    	if(command.substring(1, 4) === "mute")
    	{
    		var memberName = command.substring(command.indexOf(" "));
    		try{
	    		var server = message.channel.server;
	    		var user = server.members.get("username", memberName);
	    		
	    	}
	    	catch(err)
	    	{
	    		mybot.reply(message, "The user " + memberName + " isn't in the chat");
	    	}     		
    	}
    	
    	/** SILLY **/
    	if(command === "bracket")
    		mybot.sendMessage(message.channel, bracket).catch(console.log);
    	
    	if(command === "showmeyourmoves")
    	{
    		try{
    			var falconStream = fs.createReadStream(falconImg);
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
	    		var bruceStream = fs.createReadStream(bruceImg);
	    		mybot.sendFile(message.channel, bruceStream, "Brucie.png");
	    	}
	    	catch(err)
	    	{
	    		console.log(err);
	    		mybot.sendMessage(message.channel, bruceUrl);	
	    	}
    		
    	}
    		
    	if(command === "suhdude")
    		mybot.sendMessage(message.channel, suhdudeUrl);
    		
    	if(command === "help" || command === "man")
    		mybot.sendMessage(message.channel, exportManual());
    		
    	if(command === "ftu")
    	{
    		try{
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
	if(mybot.channels.has("name", "test"))
	{
		//TELL ALL CHANNELS BOT IS ONLINE
		mybot.channels.getAll("name", "test").foreach(function(){
			mybot.sendMessage(channel, "...cookie_bot is Online...");
		})
		.then("Notified clients...")
		.catch(console.log);
	}
		
	//})
	//.then("Notified servers...")
	//.catch(console.log);
}

function exportManual(){
	var man = "cookiE_bot Version " + version + 
	"\nUSAGE: \n\t![command] [optional:user]" +
	"\n\nCommands (not case sensative):" +
	"\n!bracket \t\t\t\t\t\t- returns URL to most recent tournament" +
	"\n!ShowMeYourMoves - display a picture of C. Falcon" +
	"\n!BruciePie \t\t\t\t\t - display a picture of Bruce" +
	"\n!SuhDude \t\t\t\t\t - return embeded youtube video for SuhDude" +
	"\n!FTU \t\t\t\t\t\t\t  - true/false switch for FTU mode" +
	"\n!Help \t\t\t\t\t\t\t - Print the manual for cookiE_bot" +
	"\n";	
	return man;
}

function getChannels()
{
	var server = new ServerChannel();
	
}


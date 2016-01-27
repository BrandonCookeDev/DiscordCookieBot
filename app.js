/** IMPORTS **/
var Discord = require("discord.js");
var fs 		= require("fs");
var mybot 	= new Discord.Client();

/** CONFIG **/
var servers = [];
var channelMap = {};

/** NONSENSE **/
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
    		mybot.reply(message, bracket).catch(console.log);
    	
    	if(command === "showmeyourmoves")
    	{
    		try{
    			var falconStream = fs.createReadStream(falconImg);
    			mybot.sendFile(message.channel, falconStream, "CFalc.png");
    		}
    		catch(err){
    			console.log(err);
    			mybot.reply(message, falconUrl).catch(console.log);
    		}
    	}
    		
    	if(command === "bruciepie")
    	{
    		try{
	    		var bruceStream = fs.createReadStream(bruceImg);
	    		mybot.sendFile(message.channel, bruceStream, "Brucie.png")
	    	}
	    	catch(err)
	    	{
	    		console.log(err);
	    		mybot.reply(message, bruceUrl);	
	    	}
    		
    	}
    		
    	if(command === "suhdude")
    		mybot.reply(message, suhdudeUrl);
    }
});

/** LOGIN **/
mybot.login("golee5191@hotmail.com", "botmedaddy!").then(loginSuccess).catch(console.log); 	  //TEST 
//mybot.login("ckscookiessbm@gmail.com", "botmedaddy!").then(loginSuccess).catch(console.log);   //PROD

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

function getChannels()
{
	var server = new ServerChannel();
	
}


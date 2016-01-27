var Discord = require("discord.js");
var mybot = new Discord.Client();

var bracketUrl = 'http://challonge.com/fbgt21';
var falconImg = "./content/images/CFalc.png";
var falconUrl = 'https://upload.wikimedia.org/wikipedia/en/4/4c/Captain_Falcon_character_portrait.png';
var bruceUrl = 'http://imgur.com/90kq6VT';
var suhdudeUrl = 'https://www.youtube.com/watch?v=pIHYPaoh79I';

console.log("Running cookiE_bot...");

mybot.on("message", function(message){
    if(message.content === "ping")
        mybot.reply(message, "pong");
        
    if(message.content.charAt(0) === "!")
    {
    	var command = message.content.substring(1).toLowerCase();
    	if(command === "bracket")
    		mybot.reply(message, bracketUrl).catch(console.log);
    	
    	if(command === "showmeyourmoves")
    		mybot.reply(message, falconUrl).catch(console.log);
    		
    	if(command === "bruciepie")
    		mybot.reply(message, bruceUrl);
    		
    	if(command === "suhdude")
    		mybot.reply(message, suhdudeUrl);
    }
});

mybot.login("golee5191@hotmail.com", "botmedaddy!").catch(console.log); 	  //TEST 
//mybot.login("ckscookiessbm@gmail.com", "botmedaddy!").catch(console.log);   //PROD

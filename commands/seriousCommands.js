var urls 	= require('../data/urls');
var arrays	= require('../data/arrays');
var common	= require('./common');
var config  = require('../data/config');

exports.repo = function(message){
	message.channel.sendMessage(urls.streamControl)
        .then(common.success)
        .catch(common.error);
};

exports.cookieRepo = function(message){
	message.channel.sendMessage(urls.cookieControl)
        .then(common.success)
        .catch(common.error);
};

exports.request = function(message, user){
	message.channel.sendMessage(urls.request)
        .then(common.success)
        .catch(common.error);
};

exports.google = function(message, user, searchCriteria){
	try{
		var url = "https://www.google.com/search?q=" + encodeURI(searchCriteria);	
		console.log(url);
		message.channel.sendMessage("Google search for " + searchCriteria + ": " + url,
									function(err){
										botlog.botlog(err);
									})
									.then(common.success)
									.catch(common.error);
		
		//var win = window.open(url, '_blank');
	  	//win.focus();
	}catch(err){
		console.log(err);
	}
};

exports.game = function(message, user, game){
	try{
		message.author.client.setGame(game)
            .then(common.success)
            .catch(common.error);
	}
	catch(err){
		console.log(err);
	}
};

// TODO Unbreak this
exports.avatar = function(message, url){
	var imgBuffer = null;
	request.get(url, function(err, response, body){
		console.log('body: ' + (body instanceof Buffer));

		message.client.setAvatar(body, function(err){
			console.log(err);
			botlog.botlog(err);
		});
	});

	//while(!(imgBuffer instanceof Buffer)){console.log(imgBuffer)}
	//var avatar = new Buffer(imgBuffer.toString('base64'), 'base64');
};

exports.frames = function(message, user, character){
	if(!character || character == null || typeof character === 'undefined')
		message.reply( 'You need to put a character after the command')
            .then(common.success)
            .catch(common.error);
	else{
		try{
			var data = arrays.meleeFrames[character.toLowerCase()];
			console.log(data);
			message.channel.sendMessage(data)
                .then(common.success)
                .catch(common.error);
		} catch(err){
			console.log(err);
		}
	}
};

/** HELP **/
exports.help = function(message){
    message.channel.sendMessage(manual(config.version))
        .then(common.success)
        .catch(common.error);
};

function manual(){
    var man = "cookiE_bot Version " + config.version +
        "\nUSAGE: \n\t![command] [optional:parameter]" +
        "\n\nCommands (not case sensative):" +
        "\n!Help \t\t\t\t\t\t\t - Print the manual for cookiE_bot" +
        "\n!request \t\t\t\t\t  - Print url to submit new cookiE bot functionality requests" +
        "\n" +
        "\n----SIMPLE COMMANDS----" +
        "\n!privilege <user>\t\t - to check your privilege" +
        "\n!melee \t\t\t\t\t\t  - print a random melee tip" +
        "\n!tweet <message>\t  - Tweet something out to the Discord Twitter: " + config.twHandle +
        "\n!love \t\t\t\t\t\t\t  - Print a loving and motivational message!" +
        "\n!conch \t\t\t\t\t\t  - have the magic conch shell tell you your future" +
        "\n!game \t\t\t\t\t\t\t- Set the game cookiE_bot is playing" +
        "\n!frames <character>   - Get the url to a melee character's frame data" +
        "\n!google <keyword> \t- Google search on keyword" +
        "\n!cookieRepo \t\t\t\t - Print the url for the code repository for cookiE bot" +
        "\n" +
        "\n----COPYPASTA----" +
        "\n!saltyTears \t\t\t\t   - Print a great message full of salt" +
        "\n!fuckLuigi \t\t\t\t     - Print a great message full of luigi" +
        "\n!plagueis \t\t\t\t\t   - Print copypasta about Lord Plagueis" +
        "\n" +
        "\n----IMAGES----" +
        "\n!ShowMeYourMoves - display a picture of C. Falcon" +
        "\n!BruciePie \t\t\t\t\t - display a picture of Bruce" +
        "\n!Rags \t\t\t\t\t\t	 - display a picture of medieval art" +
        "\n!pangasm \t\t\t\t\t  - display PanChamp cutout" +
        "\n!waifu \t\t\t\t\t\t    - display a random waifu" +
        "\n!ok \t\t\t\t\t\t\t\t - give everyone that good shit" +
        "\n" +
        "\n----VIDEOS----" +
        "\n!SuhDude \t\t\t\t\t - return embeded youtube video for SuhDude" +
        "\n" +
        "\n----MODES----" +
        "\n!shittalk \t\t\t\t\t\t - Activate shittalk mode" +
        //"\n!FTU \t\t\t\t\t\t\t  - true/false switch for FTU mode" +
        "\n";
    return man;
}

exports.testCommands = function(message, user){
	const register = require('../commandRegister');
	register.registeredCmds.forEach(function(cmd){

	})
};
/** JAVASCRIPT TO CREATE AND LOG TO A FILE **/
var fs 		= require('fs');
var logDir 	= './log';
var logFile = '/cookiEbot.log';


exports.botlog = function(msg)
{
	//Ensure file existence
	var file = logDir + logFile;
	if(!fs.existsSync(logDir)){
	    fs.mkdirSync(logDir);
	}
	if(!fs.exists(file)){
		fs.writeFileSync(file, 'Top of log...', 'utf8', function(err){
			console.log(err);
		});
	}
	
	var date = new Date();
	fs.appendFile(file, "\n" + date + ": " + msg, 'utf8', function(err){
		console.log(err);
	});
};

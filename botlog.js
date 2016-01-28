/** JAVASCRIPT TO CREATE AND LOG TO A FILE **/
var fs 		= require('fs');
var logDir 	= './log';
var logFile = '/cookiEbot.log';


exports.botlog = function(msg)
{
	try{
		//Ensure file existence
		var file = logDir + logFile;
		if(!fs.existsSync(logDir)){
		    fs.mkdirSync(logDir);
		}
		if(!fs.exists(file)){
			fs.writeFileSync(file, 'Top of log...\n', 'utf8', function(err){
				console.log(err);
			});
		}
		else{
			var date = new Date();
			fs.appendFile(file, date + ": " + msg + "\n", 'utf8', function(err){
				console.log(err);
			});
		}
	}catch(err)
	{
		console.log(err);
	}
};

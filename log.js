const fs = require('fs')
const path = require('path')
const LOG_DIR = path.join(__dirname, 'log')
if(!fs.existsSync(LOG_DIR))
    fs.mkdirSync(LOG_DIR)

var winston	= require('winston');
require('winston-daily-rotate-file');
var transport = new winston.transports.DailyRotateFile({
    filename: './log/cookiEbot',
    datePattern: '.yyyy-MM-dd.log',
    handleExceptions: true
});
var log = new (winston.Logger)({
    transports: [
        transport
    ]
});

log.err = function(err){
    if(err) {
        log.error(err.message);
        log.error(err.stack);
    }
};

module.exports = log;
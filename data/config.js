/** TARGET ENVIRONMENT (test or prod) **/
//var target = "prod";
var target = "prod"; //'test' or 'prod'
var version = "1.1.5";
var shittalkMaxMessages = 25;
var shittalkCounter = 0;
var dcTimeout = 10000; 

/** MODES **/
var isFTU = false;
var isShittalk = false;
var isConnected = false;

module.exports = {
	target: target,
	version: version,
	connected: isConnected,
	shittalkMaxMessages: shittalkMaxMessages,
	shittalkCounter: shittalkCounter,
	isFTU: isFTU,
	isShittalk: isShittalk,
	dcTimeout: dcTimeout
};
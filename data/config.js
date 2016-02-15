/** TARGET ENVIRONMENT (test or prod) **/
//var target = "prod";
var target = "test"; //'test' or 'prod'
var version = "2.0.0";
var shittalkMaxMessages = 25;
var shittalkCounter = 0;
var dcTimeout = 10000; 
var twHandle= '@KSU_Discord';

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
	dcTimeout: dcTimeout,
	twHandle: twHandle
};
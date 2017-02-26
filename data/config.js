/** TARGET ENVIRONMENT (test or prod) **/
var target = process.env.NODE_ENV == 'production' ? 'prod' : 'test';
var version = "2.0.2";
var shittalkMaxMessages = 25;
var shittalkCounter = 0;
var dcTimeout = 10000; 
var twHandle= '@cookiEbot420';

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
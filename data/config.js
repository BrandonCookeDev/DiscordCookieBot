/** TARGET ENVIRONMENT (test or prod) **/
//var target = "prod";
var target = "test"; //'test' or 'prod'
var version = "1.1.5";
var shittalkMaxMessages = 25;
var shittalkCounter = 0;

/** MODES **/
var isFTU = false;
var isShittalk = false;

module.exports = {
	target: target,
	version: version,
	shittalkMaxMessages: shittalkMaxMessages,
	shittalkCounter: shittalkCounter,
	isFTU: isFTU,
	isShittalk: isShittalk
};
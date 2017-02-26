var arrays   = require('../data/arrays');
var common	 = require('./common');

exports.plagueis = function(message){
	message.channel.sendMessage(arrays.plagueis)
        .then(common.success)
        .catch(common.error);
};

exports.saltyTears = function(message){
	message.channel.sendMessage(arrays.saltyTears)
        .then(common.success)
        .catch(common.error);
};

exports.fuckLuigi = function(message){
	message.channel.sendMessage(arrays.fuckLuigi)
        .then(common.success)
        .catch(common.error);
};
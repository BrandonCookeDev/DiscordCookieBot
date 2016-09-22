var arrays   = require('../data/arrays');

exports.plagueis = function(message){
	message.client.sendMessage(message.channel, arrays.plagueis);
};

exports.saltyTears = function(message){
	message.client.sendMessage(message.channel, arrays.saltyTears);
};

exports.fuckLuigi = function(message){
	message.client.sendMessage(message.channel, arrays.fuckLuigi);
};

module.exports = {
    plagueis: plagueis,
    saltyTears: saltyTears,
    fuckLuigi: fuckLuigi
};
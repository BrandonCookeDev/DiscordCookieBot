var fs		= require('fs');
var arrays	= require('../data/arrays');
var imgs	= require("../data/imgPaths");
var common  = require('./common');

exports.randomImage = function(message, user, arr){
	var index = Math.floor(Math.random() * arr.length);
	var imgStream = fs.createReadStream(arr[index]);
	message.channel.sendFile(message.channel, imgStream, "img.png")
        .then(common.success)
    	.catch(common.error);
};

exports.waifu = function(message, user){
	var index = Math.floor(Math.random() * arrays.waifuImgs.length);
	var waifuStream = fs.createReadStream(arrays.waifuImgs[index]);
	message.channel.sendFile(message.channel, waifuStream, "waifu.png")
		.then(common.success)
		.catch(common.error);
};

exports.ok = function(message, user){
	var index = Math.floor(Math.random() * arrays.okImgs.length);
	var okStream = fs.createReadStream(arrays.okImgs[index]);
	message.channel.sendFile(message.channel, okStream, "ok.png")
        .then(common.success)
    	.catch(common.error);
};

exports.rags = function(message, user){
	var index = Math.floor(Math.random() * arrays.ragsImgs.length);
	var ragsStream = fs.createReadStream(arrays.ragsImgs[index]);
	message.channel.sendFile(message.channel, ragsStream, "rags.png")
        .then(common.success)
        .catch(common.error);
};

exports.bruciepie = function(message, user){
	var index = Math.floor(Math.random() * arrays.bruceImgs.length);
	var bruceStream = fs.createReadStream(arrays.bruceImgs[index]);
	message.channel.sendFile(message.channel, bruceStream, "Brucie.png")
        .then(common.success)
        .catch(common.error);
};

exports.showmeyourmoves = function(message, user){
	var index = Math.floor(Math.random() * arrays.falconImgs.length);
	var falconStream = fs.createReadStream(arrays.falconImgs[index]);
	message.channel.sendFile(message.channel, falconStream, "CFalc.png")
        .then(common.success)
        .catch(common.error);
};

exports.thumb = function(message){
	var thumbStream = fs.createReadStream(imgs.thumbImg);
	message.channel.sendFile(message.channel, thumbStream, 'thumb.jpg')
        .then(common.success)
        .catch(common.error);
};

exports.panGasm = function(message){
	var panStream = fs.createReadStream(imgs.panImg);
	message.channel.sendFile(message.channel, panStream, 'PanGasm.png')
        .then(common.success)
        .catch(common.error);
};

exports.dolphin = function(message){
	var dolphinStream = fs.createReadStream(imgs.dolphinImg);
	message.channel.sendFile(message.channel, dolphinStream, 'dolphinKing.png')
        .then(common.success)
        .catch(common.error);
};

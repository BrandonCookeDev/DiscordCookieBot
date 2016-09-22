var fs		= require('fs');
var arrays	= require('../data/arrays');
var imgs	= require("../data/imgPaths");

exports.randomImage = function(message, user, arr){
	var index = Math.floor(Math.random() * arr.length);
	var imgStream = fs.createReadStream(arr[index]);
	message.client.sendFile(message.channel, imgStream, "img.png");
};

exports.waifu = function(message, user){
	var index = Math.floor(Math.random() * arrays.waifuImgs.length);
	var waifuStream = fs.createReadStream(arrays.waifuImgs[index]);
	message.client.sendFile(message.channel, waifuStream, "waifu.png");
};

exports.ok = function(message, user){
	var index = Math.floor(Math.random() * arrays.okImgs.length);
	var okStream = fs.createReadStream(arrays.okImgs[index]);
	message.client.sendFile(message.channel, okStream, "ok.png");
};

exports.rags = function(message, user){
	var index = Math.floor(Math.random() * arrays.ragsImgs.length);
	var ragsStream = fs.createReadStream(arrays.ragsImgs[index]);
	message.client.sendFile(message.channel, ragsStream, "rags.png");
};

exports.bruciepie = function(message, user){
	var index = Math.floor(Math.random() * arrays.bruceImgs.length);
	var bruceStream = fs.createReadStream(arrays.bruceImgs[index]);
	message.client.sendFile(message.channel, bruceStream, "Brucie.png");
};

exports.showmeyourmoves = function(message, user){
	var index = Math.floor(Math.random() * arrays.falconImgs.length);
	var falconStream = fs.createReadStream(arrays.falconImgs[index]);
	message.client.sendFile(message.channel, falconStream, "CFalc.png");
};

exports.thumb = function(message){
	var thumbStream = fs.createReadStream(imgs.thumbImg);
	message.client.sendFile(message.channel, thumbStream, 'thumb.jpg');
};

exports.panGasm = function(message){
	var panStream = fs.createReadStream(imgs.panImg);
	message.client.sendFile(message.channel, panStream, 'PanGasm.png');
}
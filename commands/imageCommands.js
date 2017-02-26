var fs		= require('fs');
var arrays	= require('../data/arrays');
var imgs	= require("../data/imgPaths");
var common  = require('./common');
var streamToBuffer = require('stream-to-buffer');

exports.randomImage = function(message, user, arr){
	var index = Math.floor(Math.random() * arr.length);
	var imgStream = fs.createReadStream(arr[index]);
	streamToBuffer(imgStream, function(err, buffer) {
        message.channel.sendFile(buffer, "img.png")
            .then(common.success)
            .catch(common.error);
    });
};

exports.waifu = function(message, user){
	var index = Math.floor(Math.random() * arrays.waifuImgs.length);
	var waifuStream = fs.createReadStream(arrays.waifuImgs[index]);
	streamToBuffer(waifuStream, function(err, buffer){
        message.channel.sendFile(buffer, "waifu.png")
            .then(common.success)
            .catch(common.error);
	})
};

exports.ok = function(message, user){
	var index = Math.floor(Math.random() * arrays.okImgs.length);
	var okStream = fs.createReadStream(arrays.okImgs[index]);
	streamToBuffer(okStream, function(err, buffer) {
        message.channel.sendFile(buffer, "ok.png")
            .then(common.success)
            .catch(common.error);
    });
};

exports.rags = function(message, user){
	var index = Math.floor(Math.random() * arrays.ragsImgs.length);
	var ragsStream = fs.createReadStream(arrays.ragsImgs[index])
	streamToBuffer(ragsStream, function(err, buffer) {
        message.channel.sendFile(buffer, "rags.png")
            .then(common.success)
            .catch(common.error);
    });
};

exports.bruciepie = function(message, user){
	var index = Math.floor(Math.random() * arrays.bruceImgs.length);
	var bruceStream = fs.createReadStream(arrays.bruceImgs[index]);
	streamToBuffer(bruceStream, function(err, buffer) {
        message.channel.sendFile(buffer, "Brucie.png")
            .then(common.success)
            .catch(common.error);
    });
};

exports.showmeyourmoves = function(message, user){
	var index = Math.floor(Math.random() * arrays.falconImgs.length);
	var falconStream = fs.createReadStream(arrays.falconImgs[index]);
	streamToBuffer(falconStream, function(err, buffer) {
        message.channel.sendFile(buffer, "CFalc.png")
            .then(common.success)
            .catch(common.error);
    });
};

exports.thumb = function(message){
	var thumbStream = fs.createReadStream(imgs.thumbImg);
	streamToBuffer(thumbStream, function(err, buffer) {
        message.channel.sendFile(buffer, 'thumb.jpg')
            .then(common.success)
            .catch(common.error);
    });
};

exports.panGasm = function(message){
	var panStream = fs.createReadStream(imgs.panImg);
	streamToBuffer(panStream, function(err, buffer) {
        message.channel.sendFile(buffer, 'PanGasm.png')
            .then(common.success)
            .catch(common.error);
    });
};

exports.dolphin = function(message){
	var dolphinStream = fs.createReadStream(imgs.dolphinImg);
	console.log(typeof(dolphinStream));
	streamToBuffer(dolphinStream, function(err, buffer) {
        message.channel.sendFile(buffer, 'dolphinKing.png')
            .then(common.success)
            .catch(common.error);
    });
};

var fs		= require('fs');
var arrays	= require('../data/arrays');
var imgs	= require("../data/imgPaths");
var common  = require('./common');
var streamToBuffer = require('stream-to-buffer');
const request = require('request-promise')

const s3 = require('../helpers/S3Helper')
const bucket = 'discord-cookie-bot'
async function getImage(prefix){
    const key = 'images/' + prefix
    return await s3.get(bucket, key)
}
async function putImage(prefix, buf, contentType){
    const key = 'images/' + prefix;
    return await s3.put(bucket, key, buf, contentType)
}
async function getRandomImage(folder){
    const key = 'images/' + folder
    const bucketContents = await s3.list(bucket, key)
    console.log(bucketContents.Contents)
    const item = bucketContents.Contents[Math.floor(Math.random() * bucketContents.Contents.length)]
    console.log(item)
    return await s3.get(bucket, item.Key)
}

exports.randomImage = function(message, user, arr){
	var index = Math.floor(Math.random() * arr.length);
	var imgStream = fs.createReadStream(arr[index]);
	streamToBuffer(imgStream, function(err, buffer) {
        message.channel.sendFile(buffer, "img.png")
            .then(common.success)
            .catch(common.error);
    });
};

exports.waifu = async function(message, user){
   const image = await getRandomImage('waifu')
   return message.channel.sendFile(image.Body, 'waifu.png')
        .then(common.success)
        .catch(common.error);
};

exports.sandler = async function(message){
	const image = await getRandomImage('sandler')
    return message.channel.sendFile(image.Body, 'sandler.png')
        .then(common.success)
        .catch(common.error);
};

exports.ok = async function(message, user){
	const image = await getRandomImage('ok')
    return message.channel.sendFile(image.Body, 'ok.png')
        .then(common.success)
        .catch(common.error);
};

exports.rags = async function(message, user){
	const image = await getRandomImage('rags')
    return message.channel.sendFile(image.Body, 'rags.png')
        .then(common.success)
        .catch(common.error);
};

exports.bruciepie = async function(message, user){
	const image = await getRandomImage('bruce')
    return message.channel.sendFile(image.Body, 'bruce.png')
        .then(common.success)
        .catch(common.error);
};

exports.showmeyourmoves = async function(message, user){
	const image = await getRandomImage('falcon')
    return message.channel.sendFile(image.Body, 'falcon.png')
        .then(common.success)
        .catch(common.error);
};

exports.thumb = async function(message){
	const image = await getImage('thumb.jpg')
    return message.channel.sendFile(image.Body, 'thumb.png')
        .then(common.success)
        .catch(common.error);
};

exports.panGasm = async function(message){
	const image = await getImage('PanGasm.png')
    return message.channel.sendFile(image.Body, 'pangasm.png')
        .then(common.success)
        .catch(common.error);
};

exports.dolphin = async function(message){
	const image = await getImage('dolphin.jpg')
    return message.channel.sendFile(image.Body, 'dolphin.png')
        .then(common.success)
        .catch(common.error);
};

exports.put = async function(message){
    //console.log(message.content)
    const usage = '!put USAGE: !put <target command> <optional: url> or !put <target> (attach image to message)'
    const split = message.content.split(' ')

    let type
    if(split.length >= 3)
        type = 'param'
    else if(message.attachments)
        type = 'attachment'
    else
        type = 'error'

    let url, key
    const targetDir = split[1]
    switch(type){
        case 'param':
            url = split[2]
            key = url.substring(url.lastIndexOf('/') + 1)
            break;
        case 'attachment':
            const attachments = message.attachments.first()
            url = attachments.url
            key = attachments.filename
            break;
        default:
            return message.reply(usage)
    }
    
    // format key and upload
    const keyPath = ['images', targetDir, key].join('/')
    await s3.uploadUrlImageToS3(url, bucket, keyPath)

    // on success
    message.reply('successfully added ' + key + ' to command ' + targetDir)
    return true
};

var fs		= require('fs');
var path    = require('path');
var arrays	= require('../data/arrays');
var imgs	= require("../data/imgPaths");
var common  = require('./common');
var streamToBuffer = require('stream-to-buffer');
const request = require('request-promise')

const s3 = require('../helpers/S3Helper')
const bucket = 'discord-cookie-bot'
function getImage(prefix){
    const key = 'images/' + prefix
    return s3.get(bucket, key)
}
function putImage(prefix, buf, contentType){
    const key = 'images/' + prefix;
    return s3.put(bucket, key, buf, contentType)
}
function getRandomImage(folder){
    const key = 'images/' + folder
    return s3.list(bucket, key).then(bucketContents => {
        console.log(bucketContents.Contents)
        const item = bucketContents.Contents[Math.floor(Math.random() * bucketContents.Contents.length)]
        console.log(item)
        return s3.get(bucket, item.Key)
            .then(image => {
                return {
                    Filename: item.Key,
                    File: image
                }
            })
    })
}
function getContentType(uri){
    return request.head(uri)
        .then(data => {
            console.log(data)
            return data['content-type']
        })
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

exports.waifu = function(message, user){
   getRandomImage('waifu').then(image => {
       console.log(image)
       console.log('sending: %s', image.Filename)
        return message.channel.sendFile(image.File.Body, image.Filename)
            .then(common.success)
            .catch(common.error);
        })
};

exports.sandler = function(message){
	getRandomImage('sandler').then(image => {
        return message.channel.sendFile(image.File.Body, image.Filename)
            .then(common.success)
            .catch(common.error);
        })
};

exports.ok = function(message, user){
	getRandomImage('ok').then(image => {
        return message.channel.sendFile(image.File.Body, image.Filename)
            .then(common.success)
            .catch(common.error);
        })
};

exports.rags = function(message, user){
	getRandomImage('rags').then(image => {
        return message.channel.sendFile(image.File.Body, image.Filename)
            .then(common.success)
            .catch(common.error);
        })
};

exports.bruciepie = function(message, user){
	getRandomImage('bruce').then(image => {
        return message.channel.sendFile(image.File.Body, image.Filename)
            .then(common.success)
            .catch(common.error);
        })
};

exports.showmeyourmoves = function(message, user){
	getRandomImage('falcon').then(image => {
        return message.channel.sendFile(image.image.Body, image.Key)
            .then(common.success)
            .catch(common.error);
        })
};

exports.thumb = function(message){
	getImage('thumb.jpg').then(image => {
        return message.channel.sendFile(image.Body, image.Key)
            .then(common.success)
            .catch(common.error);
        })
};

exports.panGasm = function(message){
	getImage('PanGasm.png').then(image => {
        return message.channel.sendFile(image.Body, image.Key)
            .then(common.success)
            .catch(common.error);
        })
};

exports.dolphin = function(message){
    getImage('dolphin.jpg')
        .then(image => {
            return message.channel.sendFile(image.Body, image.Key)
                .then(common.success)
                .catch(common.error);
        })
};

exports.put = function(message){
    //console.log(message.content)
    const usage = '!put USAGE: !put <target command> <optional: url> or !put <target> (attach image to message)'
    const split = message.content.split(' ')

    let type
    if(split.length < 2)
        return message.reply(usage)
    else if(split.length >= 3)
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
            //ext = key.charAt(key.length - 4) != '.' ? '.jpg' : path.extname(key)
            //key += ext
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
    let keyPath = ['images', targetDir, key].join('/')
    return Promise.resolve(keyPath.charAt(keyPath.length-4) === '.')
        .then(hasExtension => {
            if(hasExtension) return keyPath
            else return getContentType(url)
                .then(contentType => {
                    if(contentType.indexOf('image/') >= 0)
                        return keyPath + '.' + contentType.substring(contentType.lastIndexOf('/') + 1)
                    else 
                        throw new Error('cannot add non-image. You attempted to add content: ' + contentType)
                })
        })
        .then(newKeyPath => s3.uploadUrlImageToS3(url, bucket, newKeyPath))
        .then(() => {
            // on success
            message.reply('successfully added ' + key + ' to command ' + targetDir)
            return true
        })//https://cdn.discordapp.com/attachments/572472694977855498/576444341388705802/tumblr_oyrj7kp4zx1sy8x5ho5_r2_400.gif
        .catch(e => {
            console.error(e)
            message.reply('an error occured adding ' + key + ' to command ' + targetDir + '. Reason: ' + e.message)
            return true
        })
};

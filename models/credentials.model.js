const log      = require('../log');
const mongoose = require('mongoose');
let Schema     = mongoose.Schema;

let DiscordSchema = new Schema({
    env: String,
    token: String
});

let TwitterSchema = new Schema({
    env: String,
    consumer_key: String,
    consumer_secret: String,
    access_token_key: String,
    access_token_secret: String
});

let CredSchema = new Schema({
    twitter: [TwitterSchema],
    discord: [DiscordSchema]
});

let credentials = mongoose.model('Credentials', CredSchema, 'credentials');

credentials.getDiscordCredentialsByEnvironment = function(env){
    return new Promise(function(resolve, reject){
        var creds = null;
        credentials.find({'discord.env': env.toString()}, {'discord.$': 1}).lean().exec(function(err, docs){
            if(err){
                log.error(err.message);
                console.error(err.message);
            }

            if(docs){
                creds = docs[0].discord[0];
            }
        })
        .then(function(){
            resolve(creds);
        })
    })
};

credentials.getTwitterCredentialsByEnvironment = function(env){
    return new Promise(function(resolve, reject){
        var creds = null;
        credentials.find({'twitter.env': env.toString()}, {'twitter.$': 1}).lean().exec(function(err, docs){
            if(err){
                log.error(err.message);
                console.error(err.message);
            }

            if(docs){
                creds = docs[0].twitter[0];
            }
        })
        .then(function(){
            resolve(creds);
        })
    })
};

module.exports = credentials;
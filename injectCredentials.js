var mongoose = require('mongoose');
var Credentials = require('./models/credentials.model.js');

mongoose.connect('mongodb://localhost/cookiebot');

var c = new Credentials({
    twitter:[
        {
            env: "prod", 
            consumer_key: "B3ETse8Sa76aZYTJHB4hoSkOq", 
            consumer_secret: "AwBmDDXfAK9l2hUCafWVt43AIteFS2N51zEnypsVgXyLeGS4b7", 
            access_token_key: "4911814767-LGIRTg9NkWxb5utPYAVesLi1317WlddlTeDWAFY", 
            access_token_secret: "4hSWvehLgBmJVvBlEl4Gd66R9H3dSyZ49ZaAWxgbsQmup" 
        }
    ],
    discord:[
        {
            "env" : "prod",
            "token" : "Mjg1MTE2MzIxMDU2ODE3MTUz.C5OOGg.Z_YBTAbANy3AAw3m6WTlvXwK_wQ"
        },
        {
            "env" : "test",
            "token" : "Mjg1MTQyMjY4OTkyODE1MTA0.C5OOzw.ltJwqy2DHMe5wLktLIUQkUL76lw"
        }
    ]
});

c.save(function(err, creds){
    if(err)
        console.error(err.message);
    else
        console.log(creds);
});
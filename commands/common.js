

var success = function(data){
    console.log('Succeeded!');
};

var error = function(err){
    if(err){
        console.error(err.message);
        console.error(err.stack);
    }
};

module.exports = {
    success: success,
    error: error
};
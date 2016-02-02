var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//DB Objects
var frames = new Schema({
	name: String, 
	jab{
		jab1: Number,
		jab2: Number,
		jab3: Number,
		jab4: Number, 
		jab5: Number,
		jab6: Number
	},
	dash: Number,
	tilt{
		ftilt: Number,
		uptilt: Number,
		dtilt: Number
	},
	smash{
		fsmash: Number,
		upsmash: Number,
		dsmash: Number
	},
	air{
		nair: Number,
		uair: Number,
		dair: Number,
		bair: Number
	},
	special{
		neutralB: Number,
		overB: Number,
		upB: Number,
		downB: Number
	}
});

module.exports = mongoose.model('Frames', frames);
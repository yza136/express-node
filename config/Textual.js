var mongoose = require('./db');


var TextualSchema =mongoose.Schema({
    openid:String,
	content:String,
	imgUrls:Array,
	nub:String
})

var TextualModel=mongoose.model("Textual",TextualSchema,"textual")


module.exports = TextualModel;
var mongoose = require('./db');


var TextualSchema =mongoose.Schema({
    openid:String,
	content:String,
	imgUrls:Array

})

var TextualModel=mongoose.model("Textual",TextualSchema,"textual")

module.exports = TextualModel;
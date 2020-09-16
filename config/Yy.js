var mongoose = require('./db');
var YYSchema =mongoose.Schema({
    username:String,
	password:String,
})

var YYModel=mongoose.model("Yy",YYSchema,"yy")

module.exports = YYModel;
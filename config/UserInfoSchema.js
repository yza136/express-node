var mongoose = require('./db');


var UersSchema =mongoose.Schema({
    nickName:String,
	gender:Number,
	language:String,
	city:String,
	province:String,
	country:String,
	avatarUrl:String,
	openid:String,
	session_key:String
})

var UserModel=mongoose.model("User",UersSchema,"user")

module.exports = UserModel;
var mongoose = require('./db');

var  PraiseSchema=mongoose.Schema({
	// _id:"ObjectId",
	openid:String,
	uid:'ObjectId',
	status:"Boolean",
	nub:String
})

var PraiseModel=mongoose.model("Praise",PraiseSchema,"praise")

module.exports = PraiseModel;
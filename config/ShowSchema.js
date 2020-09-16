var mongoose = require('./db');
var UserModel=require('./UersSchema')
var TextualSchema =mongoose.Schema({
    openid:{ type: String, ref: 'TextualSchema' },
	content:String,
	imgUrls:Array,
	nub:String

})


var TextualModel=mongoose.model("Textual",TextualSchema,"textual")
TextualModel.find({}).populate('openid').exec(function(err,docs){
	console.log(docs)
})
// TextualModel.aggregate([{
//    $lookup:
//      {
//        from:"user",
//        localField:"openid" ,
//        foreignField:"openid",
//        as: "ad"
//      }
// }],function(err,docs){
// 	console.log(docs[].ad)
// })
module.exports = TextualModel;
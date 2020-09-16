var express = require('express'),
	router = express.Router(),
	 mongoose = require("mongoose"),
	 PraiselModel=require('../config/PraiseSchema'),
	 TextualModel=require('../config/Textual');

router.post('/', async function(req, res, next) {
		let PraseData=req.body,
			status=req.body.status,
			nub=req.body.nub,
			PraseLength=Object.keys(PraseData).length,
			id=req.body.uid,
			sid=mongoose.Types.ObjectId(id),
			openid=req.body.openid;
			
		// if(id==null){
		// 	delete PraseData._id
		// 	// PraiselModel.create(PraseData)
		// 	
		// }else{
			
			let DbPrase=await PraiselModel.find({'uid':sid,'openid':openid});
				// Dbopenid=DbPrase[0].openid;
				// console.log(DbPrase)
			if(DbPrase.length>0){
				let Dbopenid=DbPrase[0].openid;
					_id=DbPrase[0]._id
				
				if(Dbopenid==openid){
					
					PraiselModel.remove({'_id':_id},function(err,doc){
						console.log("r")
					})
				 TextualModel.update({'_id':sid},{'nub':nub},function(err,doc){
						console.log(doc)
					})
				}else{
				await  TextualModel.update({'_id':sid},{'nub':nub},function(err,doc){
						console.log(doc)
					})
					delete PraseData._id
					delete PraseData.nub
					PraiselModel.create(PraseData)
					console.log("c")
				}
			
			}else{
				await TextualModel.update({'_id':sid},{'nub':nub},function(err,doc){
						console.log(doc)
					})
					delete PraseData._id
					delete PraseData.nub
					PraiselModel.create(PraseData)
					console.log(PraseData)
			}
});
module.exports = router;

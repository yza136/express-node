var express = require('express');
var router = express.Router();
var TextualModel=require('../config/Textual')


router.post('/',  function(req, res, next) {
 let page= req.body.pages,
	 openid= req.body.openid,
	 PageNub="";
 TextualModel.count(function(err,douc){
        PageNub=Math.round(douc/3);
 })
	
var data= TextualModel.aggregate([
	
	 {$lookup:{
        from:"user",
        localField:"openid" ,
        foreignField:"openid",
        as: "user"
      }},

	  {$lookup:{
	     from:"praise",
	     localField:"_id" ,
	     foreignField:"uid",
	     as: "praise"
	   }},
// 	 
	  // {
	  // 	$match:{
	  // 		 $and:[{"praise.status":1},{'openid':openid}]
	  // 		}
	  // },  
	// {
	// 		 $group:{
	// 			 _id: "$openid",
	// 		 }
	// },
		  {$project:{
				"content":1,
				"imgUrls":1,
				"openid":openid,
				"user":1,
				"praise.uid":1,
				"praise.status":{ $or: [{$eq:["$openid","oK7n70NIC7IYuKeQuhuB-QmmOXpw"]},{$eq:["$openid","1545454"]}] }
				// "praise.status": {$and:[{"_	id":'1'},{'openid':"eterjthdvasdbf"}] },
				// {$eq:{["$praise.status", []],["$openid",openid]}}
				
			}},
		
		  {$sort:{"_id":-1}},
		  {$skip:3*page},
		  {$limit:3},
		 

	],function(err,docs){
		console.log(docs)
		res.json({docs,"PageNub":PageNub})
	})
// 	.exec(function(err,docs){
// 	console.log(docs)
// 	res.json({docs})
// })
});

module.exports = router;

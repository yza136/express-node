var express = require('express'),
	router = express.Router(),
	mongoose = require("mongoose"),
	TextualModel=require('../config/Textual');


router.post('/',  function(req, res, next) {
 let page= req.body.pages,
	 openid= req.body.openid,
	 PageNub="";
	 console.log(openid)
 TextualModel.count(function(err,douc){
        PageNub=Math.round(douc/3);
 })
TextualModel.aggregate([
	
	{$lookup:{
        from:"user",
        localField:"openid" ,
        foreignField:"openid",
        as: "user"
      }},
		
	// {$lookup:{
	//    from:"praise",
	//    localField:"_id" ,
	//    foreignField:"uid",
	//    as: "praise"
	//  }},
	// 		
		
	  {$lookup:{
	    from:"praise",
		let: { tid: "$_id"},
	    pipeline: [
              { $match:
                 { $expr:
                    { $and:
                       [
                         {$eq: [ "$uid",'$$tid' ] },
						 {$eq:["$openid",openid]}
                        
                       ]
                    }
                 }
              },
           
           ],
	     as: "praise"
	   }},

	 //  {$project:{
		// 		"content":1,
		// 		"imgUrls":1,
		// 		"openid":'$openid',
		// 		"user":1,
		// 		"nub":1,
		// 		"praise._id":1,
		// 		"praise.uid":1,
		// 		"praise.openid":1,
		// 		"praise.status":{$eq:["$praise.openid",[openid]]}
		// 		// { $and: [{$eq:["$openid",openid]},{$eq:["$praise.status",[true]]}] }
		// 		// { $and: [{$eq:["$openid",openid]},{$eq:["$praise.status",[1]]}] }
		// }},
		// 
	  {$sort:{"_id":-1}},
	  {$skip:3*page},
	  {$limit:3},
		 
	],function(err,docs){
		console.log(docs)
		res.json({docs,"PageNub":PageNub})
	})
});

module.exports = router;

var mongoose = require('./db');

var  NewSchema=mongoose.Schema({
	price:String,
	item:String,
	ordered:String
})

var NewModel=mongoose.model("New",NewSchema,"new")

NewModel.aggregate([
   {
      $lookup:
         {
           from: "warehouses",
        
           pipeline: [
              { $match:
                 { $expr:
                    { $and:
                       [
                         { $eq: [ "$stock_item",  ";" ] },
                         { $gte: [ "$instock", "$$order_qty" ] }
                       ]
                    }
                 }
              },
              
           ],
           as: "stockdata"
         }
    }
],function(err,doc){
	console.log(doc)
})


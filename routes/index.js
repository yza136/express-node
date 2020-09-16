var express = require('express');
var session=require('express-session');
var request = require('request');
var jwt = require('jsonwebtoken');
var sha1=require('node-sha1');
var fs=require("fs");
var UserModel=require('../config/UersSchema')
var TextualModel=require('../config/Textual')
var YYModel=require('../config/Yy')
var app=express();
var multer  = require('multer');
var upload = multer({dest: 'upload_tmp/'});
var router = express.Router();
// router.use(session({
//     name: 'session-name', // 这里是cookie的name，默认是connect.sid
//     secret: 'my_session_secret', // 建议使用 128 个字符的随机字符串
//     resave: true,
//     saveUninitialized: false,
//     cookie: { maxAge: 60 * 1000, httpOnly: true }
// }));

/* GET home page. */
router.get('/', function(req, res, next) {
console.log(req)
  res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Method:POST,GET');
  res.json({"小妹":"333"})

});

/*登录*/
router.get('/login', function(req, res, next) {
   let 
		code=req.query.code,   
		rawData=req.query.rawData,   
		signature=req.query.signature, 
	    //前端传来code、signature 、rawData

		appid="wx2bd23db1d3a0a9e8",
		secret="dd3acf163da3c6dacdcb0adc651604a3";
		//开发者的appid secret
	
		request(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,
				(error, response, body)=>{
					const data = JSON.parse(body);
					let session_key=data.session_key,   //code 换取session_key
						state="true",   //登录状态
						openid=data.openid;//code 换取openid
						
						
					let	signature1=sha1(rawData + session_key);			
						if (signature1==signature) {
							let	userinfo =JSON.parse(rawData)  //字符串转换对象
							UserModel.find({openid: openid},function(err,doc){
									userinfo.openid=openid
									userinfo.session_key=session_key
									console.log(userinfo)
								if(doc.length==0){
								        UserModel.create(userinfo)  //openid 没存过，那么存进数据库
								    }else{
										 UserModel.update({openid:openid},userinfo)  //openid  存过 更新数据库
									} 
							})//查询openid是否有存过数据库
							res.json({"openid":openid,"rawData":userinfo,"state":state})
							
						} else{
							res.json({"token":"","state":"false"})  
						}
						
				
						
		})//通过微信接口  获取到session_key openid
		
		
});
/*接收文本*/
router.post('/AcceptText',upload.any(),function(req, res, next){
	let content=req.body.content,   //发布内容
		openid=req.body.openid,     //用户的openid
		flieLenght=req.body.flieLenght,   //图片的长度
		fliekey=req.body.i,       //  上传图片数组的键值
		originalname=req.files[0].originalname,  //  图片的资源名称
		imgUrl=JSON.parse(req.body.imgUrl),   //获取图片url链接
		imgUrls=[],  // 存储 url 
		Reg=new RegExp("wxfile://|http://tmp/") 
		path=req.files[0].path,  //文件的信息
		obj={'openid':openid,'content':content,'imgUrls':imgUrls,'nub':0}, 
		des_file="./public/images/"+originalname;
		imgUrl.forEach((v,i)=>{
		  let img=v.replace(Reg,"")
			 imgUrls.push(img) 
		})//修改url  存储
		
		fs.readFile(path,function(err,data){
			fs.writeFile(des_file,data,function(err){
				if(err){
					console.log(err)
				}else{
					res.json({"img":originalname,"state":"false"})
					if(fliekey==flieLenght-1){
						TextualModel.create(obj)
					}
				}
			})
		})

	
	})
	// 	obj={'content':content}
	// TextualModel.create(obj)
	// console.log(content)
	// res.json({"dd":"content})  
router.post('/checklogin',(req,res)=>{
	let {username,password}=req.body;
	YYModel.find({username,password},function(err,doc){
		if(err){
			throw err
		}else{
			res.send(doc)
		}
		
	})
})
module.exports = router;
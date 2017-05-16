
var http = require('http');
var mysql = require('mysql');
var db = mysql.createPool({
	database : 'cfo_singapore',
     user : 'cio_choice',
	password : '10gXWOqeaf',
    host :'cxohonour.com',
 });

 var CRUD = require('mysql-crud');
 var answerCRUD=CRUD(db, 'answer');



 exports.createNewAnswer = function(req, res) {

    var item_ID = req.body.item_ID;
    var userID = req.body.userID;

    var user_answer = req.body.user_answer;
    var stringAns = user_answer.toString();
    var dataAns = stringAns.split(',');


 	dataAns.forEach(function(y){
 		answerCRUD.create({'item_ID' :item_ID,'userID' : userID,'user_answer' : y}, function (err, vals) {

 			if(!err){
 				var resdata={status:true,
 					message:'user answer successfully added'};
 					//res.jsonp(resdata);
 			}else{
 					var resdata={status:false,
 					message:'record not added '};
 					//res.jsonp(resdata);
 			}

 		});

 	})

 };

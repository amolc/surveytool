
var http = require('http');
var mysql = require('mysql');
var db = mysql.createPool({
	database : 'cfo_singapore',
     user : 'ftdev',
	password : '10gXWOqeaf',
    host :'apps.fountaintechies.com',
 });

 var CRUD = require('mysql-crud');
 var answerCRUD=CRUD(db, 'answer');


 
exports.createNewAnswer = function(req, res) {

   var item_ID = req.body.item_ID;
   var userID = req.body.userID;
   var user_answer = req.body.user_answer;

	answerCRUD.create({'item_ID' :item_ID,'userID' : userID,'user_answer' : user_answer}, function (err, vals) {

		if(!err){
			var resdata={status:true,
				message:'user answer successfully added'};
				res.jsonp(resdata);
		}else{
				var resdata={status:false,
				message:'record not added '};
				res.jsonp(resdata); 
				}
		});
	 };


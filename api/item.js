
var http = require('http');
var mysql = require('mysql');
var db = mysql.createPool({
	database : 'cfo_singapore',
     user : 'cio_choice',
	password : '10gXWOqeaf',
    host :'cxohonour.com',
 });

 var CRUD = require('mysql-crud');
 var itemCRUD=CRUD(db, 'item');


 exports.allitem = function(req, res) {
      var query = "SELECT * from item";
			db.query(query, function(err, rows){
    res.jsonp(rows);
   });
 };


exports.findItem = function(req, res) {

 	var id = parseInt(req.params.id);
 	console.log(id);
 	itemCRUD.load({catID : id}, function (err, val) {res.jsonp(val);});

};

exports.findItemQty = function(req, res) {

 	var id = parseInt(req.params.catID);
	 console.log(id);
	var query = "select count(*) from item where `catID` = " + id;
	db.query(query, function(err, rows){
		res.jsonp(rows);
   });
 	

};

exports.findpinkIdByItemid = function(req, res) {
 		var itemid = parseInt(req.params.itemid);
		var query = "select pink_ids from item where `item_ID`=" + itemid;
				db.query(query, function(err, rows){
				var pinkids = rows[0]['pink_ids'].split(',') ;
				var tagsname =[];
				for(var index=0; index < pinkids.length ; index++){
						tagsname.push({text: pinkids[index]});
				}
				//var tags = {tagsname};
				res.jsonp(tagsname);
				console.log(tagsname);
			});
};






/******************for create new municipality it inster value in to data base*****************/

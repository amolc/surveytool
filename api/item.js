
var http = require('http');
var mysql = require('mysql');
var db = mysql.createPool({
	database : 'cfo_singapore',
     user : 'ftdev',
	password : '10gXWOqeaf',
    host :'apps.fountaintechies.com',
 });

 var CRUD = require('mysql-crud');
 var itemCRUD=CRUD(db, 'item');


 exports.allitem = function(req, res) {
      var query = "SELECT * from item";
db.query(query, function(err, rows){
    res.jsonp(rows);
   });
 };

// exports.allitembycategory = function(req, res) {
//     var catId  = req.body.categoryId
//     //console.log(catId);
//     //console.log("entered allitembycategory");
//       var query = "SELECT * from item where catID = " + catId;
// db.query(query, function(err, rows){
//     res.jsonp(rows);
//    });
//  };

  exports.findItem = function(req, res) {

 	var id = parseInt(req.params.id);
 	console.log(id);
 	itemCRUD.load({catID : id}, function (err, val) {res.jsonp(val);});
 	    
}; 

/******************for create new municipality it inster value in to data base*****************/

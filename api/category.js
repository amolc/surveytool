
var http = require('http');
var mysql = require('mysql');
var db = mysql.createPool({
	database : 'cfo_singapore',
     user : 'cio_choice',
	password : '10gXWOqeaf',
    host :'cxohonour.com',
 });

 var CRUD = require('mysql-crud');
 var categoryCRUD=CRUD(db, 'category');


 exports.allcategory = function(req, res) {
      var query = "SELECT * from category";
db.query(query, function(err, rows){
    res.jsonp(rows);
   });
 };




/******************for create new municipality it inster value in to data base*****************/

var connect = require('connect');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var http = require("http").createServer(app);
var path = require('path');
var category = require('./api/category.js');
var item = require('./api/item.js');

//app = require('./api/category');
//var http = require("http").createServer(app);
app.get('/api/allcategory', category.allcategory);
app.post('/api/allitembycategory', item.allitembycategory);


var survey = connect();
survey.use(serveStatic('survey'));
app.use('/',survey);
http.listen(3000);
console.log("Magic at 3000");

var connect = require('connect');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var http = require("http").createServer(app);
var path = require('path');

var category = require('./api/category.js');
var item = require('./api/item.js');
var answer = require('./api/answer.js')

var http = require("http").createServer(app);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Credentials', false);
  next();
});

app.use(bodyParser.json({ limit: '50mb', extended: true, type:'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, type:'application/x-www-form-urlencoding' }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ limit: '50mb' }));


app.get('/api/allcategory', category.allcategory);
app.get('/api/item/:id', item.findItem);
app.post('/api/answer', answer.createNewAnswer)


var survey = connect();
survey.use(serveStatic('survey'));
app.use('/',survey);
http.listen(3000);
//console.log("Magic at 3000");

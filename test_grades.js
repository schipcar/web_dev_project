var sqlite3 = require('sqlite3').verbose();
var http = require('http');
    fs = require('fs');
    url = require('url');
    request = require('request');
    myParser = require("body-parser");
    express = require("express");
    pag = require('https');
    db = 0
var row_sent = 2;
var row_student = 0;
var string_student = "SELECT * FROM grades";


function renew() {
  db = new sqlite3.Database('./canvas.db', (err) => {
  if (err) {
    console.error(err.message);
  } 
  db.all("SELECT * FROM grades", function(err, row) {
    row_sent=row
  });
  db.all(string_student, function(err, row) {
    console.log(row)
    row_student=row
  });
});
}
renew()

var app = express();
app.use(myParser.urlencoded({ extended: true }));
app.get("/getdictionary", function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Max-Age', 2592000);
  res.setHeader('Content-Type', 'application/json');
  renew()
  res.send(JSON.stringify(row_sent)); 
});
app.post('/putdictionary', function(req, res) {
  db.run('INSERT INTO grades(email, punctuation, possible, course_name) VALUES(?,?,?,?)', [req.body.email, req.body.punctuation, req.body.possible, req.body.course_name]);
  renew()
  res.status(204).send()
});
app.post('/gradestudent', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.setHeader('Access-Control-Max-Age', 2592000);
  res.setHeader('Content-Type', 'application/json');
  string_student = 'SELECT * FROM grades WHERE email=' + '"' + String(req.body.student) + '"'
  renew()
  res.status(204).send()
});
app.get('/gradestudent2', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Max-Age', 2592000);
  res.setHeader('Content-Type', 'application/json');
  renew()
  res.send(JSON.stringify(row_student)); 
});
app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});



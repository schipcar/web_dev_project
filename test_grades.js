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


function renew() {
  db = new sqlite3.Database('./canvas.db', (err) => {
  if (err) {
    console.error(err.message);
  } 
  db.all("SELECT * FROM grades", function(err, row) {
    row_sent=row
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
  db.run('INSERT INTO grades(id, student, name, status, punctuation, possible) VALUES(?,?,?,?,?,?)', [req.body.id, req.body.student, req.body.name, req.body.status, req.body.punctuation, req.body.possible]);
  renew()
  res.status(204).send()
});
app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:3000/');
});



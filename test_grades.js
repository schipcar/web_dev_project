var sqlite3 = require('sqlite3').verbose();
var http = require('http');
    fs = require('fs');
    url = require('url');
    request = require('request');
    myParser = require("body-parser");
    express = require("express");
    pag = require('https');
var row_sent = 2;



let db = new sqlite3.Database('./canvas.db', (err) => {
  if (err) {
    console.error(err.message);
  } 
  db.all("SELECT * FROM grades", function(err, row) {
    row_sent=row
  });
});



http.createServer(function(req, response){
  var path = url.parse(req.url).pathname;
  if(path=="/getdictionary"){
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.setHeader('Access-Control-Max-Age', 2592000);
      response.setHeader('Content-Type', 'application/json');
      const jsonContent = JSON.stringify(row_sent);
      response.end(jsonContent);
      console.log(jsonContent); 
    }
    }
).listen(8080);

console.log("server initialized");

var app     = express();
app.use(myParser.urlencoded({ extended: true })); 
app.post('/putdictionary', function(req, res) {
  db.run('INSERT INTO grades(id, student, name, status, punctuation, possible) VALUES(?,?,?,?,?,?)', [req.body.id, req.body.student, req.body.name, req.body.status, req.body.punctuation, req.body.possible]);
  res.send("")
});
app.listen(3000, function() {
  console.log('Server running at http://127.0.0.1:3000/');
});



var sqlite3 = require('sqlite3').verbose();
var http = require('http');
    fs = require('fs');
    url = require('url');
var row_sent = 2;



let db = new sqlite3.Database('./canvas.db', (err) => {
  if (err) {
    console.error(err.message);
  } 
  db.all("SELECT * FROM grades", function(err, row) {
    row_sent=row
  });
});



http.createServer(function(request, response){
  var path = url.parse(request.url).pathname;
  if(path=="/getdictionary"){
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.setHeader('Access-Control-Max-Age', 2592000);
      response.setHeader('Content-Type', 'application/json');
      const jsonContent = JSON.stringify(row_sent);
      response.end(jsonContent);
      console.log(jsonContent); 

  }
}).listen(8080);
console.log("server initialized");



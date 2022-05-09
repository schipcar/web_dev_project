var sqlite3 = require('sqlite3').verbose();
var http = require('http'),
    fs = require('fs');

let db = new sqlite3.Database('./test.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the my database.');
});


fs.readFile('./grades.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(8080);
});






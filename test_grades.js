var sqlite3 = require('sqlite3').verbose();
var http = require('http');
    fs = require('fs');
    url = require('url');
var student1 = 900;
var assignment1 = 0;
var status1 = "completed";
var punctuation1 = 80;
var possible1 = 900;
var row1 = 2;



let db = new sqlite3.Database('./canvas.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  
  db.all("SELECT * FROM grades", function(err, row) {
    row1=row
    //student1 = row.student
    //assignment1 = row.name
    //status1 = row.status
    //punctuation1 = row.punctuation
    //possible1 = row.possible
    //prueba = json1_extension(row)
    console.log(row);
  });
  Connected();

  function Connected() {
    console.log('Connected to the my database.');
  }});



http.createServer(function(request, response){
  var path = url.parse(request.url).pathname;
  if(path=="/getdictionary"){
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      response.setHeader('Access-Control-Max-Age', 2592000);
      response.setHeader('Content-Type', 'application/json');
      //const response_data = {student: student1, name: assignment1, status: status1, punctuation: punctuation1, possible: possible1};
      //const jsonContent = JSON.stringify(response_data);
      const jsonContent = JSON.stringify(row1);
      response.end(jsonContent);
      console.log(jsonContent); 

  }
}).listen(8080);
console.log("server initialized");


json1_extension = function(_records){
  var _json = [];
  var _columns = _records[0].columns;
  var _values = _records[0].values;
  for (var i = 0; i < _values.length; i++) {
    var _row_json = {};
    var _row = _values[i];
    for (var k = 0; k < _row.length; k++) {
      _row_json[_columns[k]] = _row[k];
      _json.push(_row_json)};
    };
  return _json;
};

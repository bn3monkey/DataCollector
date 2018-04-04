
var express = require('express');
var app = express();
var csvparser = require("json2csv").Parser;
fields = ['id','seq','device','unit','type','value','ip','time'];

mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'bn3monkey',
    password: 'p5j6g2h0',
    database: 'mydb'
})
connection.connect();


app.get("/download", function(req, res) {
  console.log("param=" + req.query);

  var qstr = 'select * from sensors ';
  connection.query(qstr, function(err, rows, cols) {
    if (err) {
      throw err;
      res.send('query error: '+ qstr);
      return;
    }

    console.log("Got "+ rows.length +" records");
  
    const parser = new csvparser({fields});
    const csv = parser.parse(rows);
    res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    res.set('Content-Type', 'test/csv');
    res.status(200).send(csv);

  });

});



function insert_sensor(device, unit, type, value, seq, ip) {
  obj = {};
  obj.seq = seq;
  obj.device = device;
  obj.unit = unit;
  obj.type = type;
  obj.value = value;
  obj.ip = ip.replace(/^.*:/, '')

  var query = connection.query('insert into sensors set ?', obj, function(err, rows, cols) {
    if (err) throw err;
    console.log("database insertion ok= %j", obj);
  });
}

app.get('/log', function(req, res) {
  r = req.query;
  console.log("GET %j", r);

  insert_sensor(r.device, r.unit, r.type, r.value, r.seq, req.connection.remoteAddress);
  res.end('OK:' + JSON.stringify(req.query));
});


var server = app.listen(3001, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('listening at http://%s:%s', host, port)
});ubtitle: 'n grpah!'

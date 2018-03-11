var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var api = require('./api');
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use('/api', api)

io.on('connection', function (socket) {
  console.log("connected")
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});
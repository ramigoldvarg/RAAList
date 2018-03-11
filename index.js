var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var ObjectID = require('mongodb').ObjectID;

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
  socket.on('chat message', function (msg) {
    io.emit('new message', msg);
  });
  socket.on('like', function(index) {
    console.log('like ' + index)
  })
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});
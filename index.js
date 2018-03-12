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
app.use('/assets', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  // Check local storage
  res.sendFile(__dirname + "/public/index.html");
});

app.use('/api', api)

io.on('connection', function (socket) {
  socket.on('like', function (data) {
    console.log("hi");
  });
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});
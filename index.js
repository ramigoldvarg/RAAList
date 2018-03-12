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
  res.sendFile(__dirname + '/public/login.html');
});

app.get('/home', function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.use('/api', api)

io.on("connection", onSocketConnection);

function onSocketConnection(socket) {
    console.log("connected")
    socket.on('like', onClientJoined);
};

function onClientJoined(data) {
    console.log('liked');
};

http.listen(port, function () {
  console.log('listening on *:' + port);
});
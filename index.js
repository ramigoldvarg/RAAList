var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var ObjectID = require('mongodb').ObjectID;
var firebase = require('firebase');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var api = require('./api');
var port = process.env.PORT || 3000;

// Initialize Firebase
var config = {
  apiKey: "AIzaSyABWV2_2-g5C8ZcYcO4LlOwIKIPVQ-6AbQ",
  authDomain: "raalist-e881c.firebaseapp.com",
  databaseURL: "https://raalist-e881c.firebaseio.com",
  storageBucket: ""
};
firebase.initializeApp(config);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
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
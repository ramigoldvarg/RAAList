var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var ObjectID = require('mongodb').ObjectID;
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(bodyParser.json());


// Retrieve
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://raa:1234@ds111299.mlab.com:11299/hackathonraa';

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/songs', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    var dbo = db.db('hackathonraa');
    dbo.collection('Songs').find().toArray(function (err, result) {
      res.json(result);
    })
    db.close();
  });
});

app.post('/addsong', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    var dbo = db.db('hackathonraa');
    var newSong = {
      "trackId" : req.body.trackId,
      "Name" : req.body.Name,
      "Author" : req.body.Author,
      "Rating" : 0
    };

    dbo.collection('Songs').insert(newSong, function () {
      console.log("Added Successfully");
    });

    db.close();
  });
});

app.put('/addrating/:trackId/:id', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    var dbo = db.db('hackathonraa');

    dbo.collection('Songs').updateOne(
      { "trackId": parseInt(req.params.trackId), "_id" : ObjectID(req.params.id) },
      { $set: { "Rating": req.body.Rating + 1 } },
      function (err, object) {
        if (err) {
          console.log(err.message);  // returns error if no matching object found
        } else {
          console.log(object);
        }

      });
    db.close();
  });
});

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    io.emit('new message', msg);
  });
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});
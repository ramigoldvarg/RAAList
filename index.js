var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('new message', msg);
  });
  socket.on('like', function(index) {
    console.log('like ' + index)
  })
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
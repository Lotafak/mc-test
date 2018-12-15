var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, { origins: 'localhost:*'});

app.get('/', function(req, res){
  res.send('hello');
});

io.on('connection', function(socket){
  socket.emit('message', 'hello');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

const http     = require('http');
const express  = require('express');


const app      = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

var port = process.env.PORT || 3000;
var server = http.createServer(app)
.listen(port, function () {
  console.log('Listening on port ' + port + '.');
});

const socketIo = require('socket.io');
const io       = socketIo(server);

io.on('connection', function(socket) {
  console.log('A user has connected.', io.engine.clientsCount);
  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.emit('statusMessage', 'You have connected.');

  socket.on('disconnect', function() {
    console.log('A user has disconnected.', io.engine.clientsCount);
  });

});

module.exports = server;
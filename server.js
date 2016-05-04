const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const log = require('bunyan').createLogger({ name: 'b4n' });

const config = {
  port: process.env.PORT || 3000
};

app.use(express.static('public'));

const MAX_NUM_MESSAGES = 8;
const messages = [
  'Bunnies make wonderful companions',
  'Bunnies protect your home',
  'Petting bunnies reduces stress',
  'Bunnies are quiet',
  'Bunnies are easily trained',
  'Bunnies are very clean pets',
  'Bunnies are so cute',
  'Bunnies are easy to rescue'
];

io.on('connection', function(socket) {
  log.info('user connected');
  messages.forEach(function(message) {
    socket.emit('message', message);
  });
  socket.on('disconnect', function() {
    log.info('user disconnected');
  });
  socket.on('message', function(message) {
    log.info('message: ' + message);
    io.emit('message', message);
    messages.push(message);
    while (messages.length > MAX_NUM_MESSAGES) {
      messages.shift();
    }
  });
});

http.listen(config.port, function(){
  log.info('listening on *:' + config.port);
});

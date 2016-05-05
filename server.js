const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const log = require('bunyan').createLogger({ name: 'b4n' });
const aws = require('aws-sdk');

const config = {
  port: process.env.PORT || 3000,
  awsRegion: process.env.AWS_REGION || "us-west-2",
  snsTopic: process.env.SNS_TOPIC
};
log.info('config = ' + JSON.stringify(config));

const sns = new aws.SNS({ region: config.awsRegion });

app.use(express.static('public'));

const MAX_NUM_MESSAGES = 8;
const messages = [
  'Bunnies usually don\'t eat children',
  'Bunnies don\'t bark',
  'Joni really wants a bunny and you love her',
  'Petting bunnies calms you down when you get stressed out',
  'Bunnies make people smile',
  'Bunnies are adorable',
  'Bunnies are awesome because they are sweet little bundles of fur that make you feel happy',
  'Bunnies > Robin'
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
    message = message.trim();
    if (!message) {
      log.info('empty message ignored');
      return;
    }
    log.info('message: ' + message);
    io.emit('message', message);
    messages.push(message);
    while (messages.length > MAX_NUM_MESSAGES) {
      messages.shift();
    }
    sns.publish({ TopicArn: config.snsTopic, Message: message }, function(err, data) {
      if (err) {
        log.error('Error publishing SNS message: ' + err);
      } else {
        log.info('SNS message sent: ' + message);
      }
    });
  });
});

http.listen(config.port, function(){
  log.info('listening on *:' + config.port);
});

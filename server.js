const express = require('express');
const app = express();
const http = require('http').Server(app);
const log = require('bunyan').createLogger({ name: 'b4n' });

const config = {
  port: process.env.PORT || 3000
};

app.use(express.static('public'));

http.listen(config.port, function(){
  log.info('listening on *:' + config.port);
});

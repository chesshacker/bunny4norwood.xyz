const express = require('express');
const app = express();
const http = require('http').Server(app);

const config = {
  port: process.env.PORT || 3000
};

app.use(express.static('public'));

http.listen(config.port, function(){
  console.log('listening on *:' + config.port);
});

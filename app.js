const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const path = require('path');
const seed = require('./server/seed/index.js');
const router = require('./server/routes/');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use('/', router);

const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=>{
  console.log('Example app listening on port 3000!');
});

io.on('connection', function (socket) {
  console.log('socket io connection success')
});
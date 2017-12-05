const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('./server/io/socket')(server);
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./server/routes/')(io);
const config = require('./config/index.js');
const seed = require('./server/seed');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.use('/', router);

const PORT = config.port;

server.listen(PORT, ()=>{
  console.log('Listening on port ' + PORT + ' !');
});

module.exports = app;

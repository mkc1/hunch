const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('./server/io/socket')(server);
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./server/routes/');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.use('/', router);

const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=>{
  console.log('Example app listening on port 3000!');
});

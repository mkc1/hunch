const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')))
// API routes
require('./server/routes')(app);

app.listen(PORT, ()=>{
  console.log('Example app listening on port 3000!');
})

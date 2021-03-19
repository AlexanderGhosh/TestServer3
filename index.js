const express = require('express');
const data = require('./data.json');

const app = express();

let port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("First Page");
});

app.get('/data', (req, res) => {
  res.send(data);
});

app.listen(port, () =>{
  console.log('Listening on: http://localhost:%s', port);
});

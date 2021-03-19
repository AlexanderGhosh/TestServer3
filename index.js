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
  var ipAddr = req.headers["x-forwarded-for"];
  if (ipAddr){
    var list = ipAddr.split(",");
    ipAddr = list[list.length-1];
  } else {
    ipAddr = req.connection.remoteAddress;
  }
  console.log('Listening on: http://%s:%s', ipAddr, port);
});

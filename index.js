const express = require('express');
const data = require('./data.json');
const config = require('./src/config');
const {getIP} = require('./src/utils');
const {getOne} = require('./src/database/querys');
const {createConnection} = require('./src/database/mongo');

const app = express();

app.get('/', (req, res) => {
  if(!config.ip_adress){
    config.ip_adress = getIP(req);
  }
  res.send("First Page");
});

app.get('/data', (req, res) => {
  res.send(await getAll());
});

app.get('/config', (req, res) => {
  res.send(config);
});

app.get('/:name', async (req, res) => {
  let t = await getOne({ Name: req.params.name });
  console.log(t);
  res.send(t)
});

app.listen(config.port, (req, res) =>{
  console.log('Listening on: %s', config.port);
  console.log('Started in %s', config.is_debug  ? 'DEBUG' : 'RELEASE');
  createConnection();
});

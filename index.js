const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = require('./src/config');
const {getIP, isAuthenticated} = require('./src/utils');
const {getOne, getAll} = require('./src/database/querys');
const {createConnection} = require('./src/database/mongo');
const { auth, requiresAuth } = require('express-openid-connect');

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: config.client_secret,
  baseURL: config.auth0_base_url,
  clientID: config.client_ID,
  issuerBaseURL: config.auth0_domain
};

const app = express();
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(authConfig));
app.use('/favicon.ico', express.static('images/favicon.ico'));

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(req.oidc.user);
});

app.get('/data', async (req, res) => {
  res.send(await getAll());
});

app.get('/config', (req, res) => {
  res.send(config);
});

app.get('/jwt', (req, res) => {
    let privateKey = fs.readFileSync('./private.pem', 'utf8');
    let token = jwt.sign({ "body": "stuff" }, privateKey, { algorithm: 'HS256'});
    res.send(token);
});
app.get('/callback', (res, req) =>{
  res.send("Callback page");
});


app.get('/:name', isAuthenticated, async (req, res) => {
  let t = await getOne({ Name: req.params.name });
  console.log('User: %s', t);
  res.send(t)
});




app.listen(config.port, (req, res) =>{
  console.log('Listening on: %s', config.port);
  console.log('Started in %s', config.is_debug  ? 'DEBUG' : 'RELEASE');
  createConnection();
});

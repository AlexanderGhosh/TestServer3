const jwt = require('jsonwebtoken');
const fs = require('fs');

function getIP(req) {
  var ipAddr = req.headers["x-forwarded-for"];
  if (ipAddr){
    var list = ipAddr.split(",");
    ipAddr = list[list.length-1];
  } else {
    ipAddr = req.connection.remoteAddress;
  }
  return ipAddr;
}

function isAuthenticated(req, res, next) {
  if (typeof req.headers.authorization !== "undefined") {
    // retrieve the authorization header and parse out the
    // JWT using the split function
    let token = req.headers.authorization.split(" ")[1];
    let privateKey = fs.readFileSync('./private.pem', 'utf8');
    // Here we validate that the JSON Web Token is valid and has been
    // created using the same private pass phrase
    jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {

    // if there has been an error...
    if (err) {
      // shut them out!
      res.status(401).json({ error: "Not Authorized" });
      console.log("Not Authorized0");
      return;
    }
    console.log(user);
    // if the JWT is valid, allow them to hit
    // the intended endpoint
    return next();
    });
  }
  else {
    // No authorization header exists on the incoming
    // request, return not authorized and throw a new error
    res.status(401).json({ error: "Not Authorized" });
    console.log("Not Authorized1");
    return;
  }
}

module.exports = {
  getIP,
  isAuthenticated
};

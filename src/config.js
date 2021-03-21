if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// const DEBUG_MODE = (process.env.DEBUG || "Y") == 'Y';
const DEBUG_MODE = process.env.NODE_ENV !== 'production';
const DEBUG_PORT = 3000;

const MONGO_URI = "";
const COLLECTION_NAME = "TestCollection";
const DATABASE_NAME = "TestDatabase";

const constants = {
  is_debug: DEBUG_MODE,
  db_uri: process.env.MONGO_URI || MONGO_URI,
  collection_name: process.env.COLLECTION_NAME || COLLECTION_NAME,
  database_name: process.env.DATABASE_NAME || DATABASE_NAME,
  ip_adress: null,
  client_secret: process.env.AUTH0_CLIENT_SECRET,
  client_ID: process.env.AUTH0_CLIENT_ID,
  auth0_domain: process.env.AUTH0_DOMAIN,
  auth0_base_url: DEBUG_MODE ? 'http://localhost:' + DEBUG_PORT : 'https://alexs-test-server3.herokuapp.com'
}

const debug = {
  port: DEBUG_PORT
};

const release = {
  port: process.env.PORT || 5000
};

module.exports = {...(DEBUG_MODE ? debug : release), ...constants};

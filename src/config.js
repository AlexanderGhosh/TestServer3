const DEBUG_MODE = (process.env.DEBUG || "Y") == 'Y';

const MONGO_URI = "mongodb+srv://Admin:TestPassword1@maincluster.lzdrc.mongodb.net/TestDatabase?retryWrites=true&w=majority";
const COLLECTION_NAME = "TestCollection";
const DATABASE_NAME = "TestDatabase";

const constants = {
  is_debug: DEBUG_MODE,
  db_uri: process.env.MONGO_URI || MONGO_URI,
  collection_name: process.env.COLLECTION_NAME || COLLECTION_NAME,
  database_name: process.env.DATABASE_NAME || DATABASE_NAME,
  ip_adress: null
}

const debug = {
  port: 3000
};

const release = {
  port: process.env.PORT || 5000
};

module.exports = {...(DEBUG_MODE ? debug : release), ...constants};

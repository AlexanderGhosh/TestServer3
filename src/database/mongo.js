const {MongoClient} = require('mongodb');
const config = require('../config');

const client = new MongoClient(config.db_uri, { useNewUrlParser: true, useUnifiedTopology: true });
let collection = null;

async function createConnection() {
  try{
    await client.connect();
    collection = client.db(config.database_name).collection(config.collection_name);
    console.log('---------------------------Connection Made---------------------------');
  }
  catch(e){
    console.error(e);
    await client.close();
  }
}

async function getCollection() {
  if(!collection){
    collection = await createConnection();
  }
  return collection;
}

module.exports = {
  getCollection,
  createConnection
}

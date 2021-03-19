const config = require('../config');
const {ObjectID} = require('mongodb');
const {getCollection} = require('./mongo');

async function getOne(query) {
  const collection = await getCollection();
  return await collection.findOne(query);
}
async function getMany(query) {
  const collection = await getCollection();
  return await collection.find(query).toArray();
}

async function getAll() {
  return await getMany({});
}

async function getID(id) {
  return await getOne({ _id: new ObjectID(id) });
}

module.exports = {
  getOne,
  getMany,
  getAll,
  getID
};

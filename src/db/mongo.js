const { MongoClient } = require("mongodb");
const { dbConfig } = require("@/config");

let mongoClient;

const init = async () => {
  try {
    const { username, password, host, port } = dbConfig.mongo;
    const uri = `mongodb://${username}:${password}@${host}:${port}`;
    const client = new MongoClient(uri, {
      family: 4,
    });
    await client.connect();
    mongoClient = client;
    // do some initial setup

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

const getMongoClient = () => {
  if (!mongoClient) {
    throw new Error("MongoDB connection not established");
  }
  return mongoClient;
};

module.exports = {
  init,
  getMongoClient,
};

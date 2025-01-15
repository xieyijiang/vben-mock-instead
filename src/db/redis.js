const { createClient } = require("redis");
const { dbConfig } = require("@/config");

let redisClient;

const init = async () => {
  const { username, password, host, port } = dbConfig.redis;
  const url = `redis://${username}:${password}@${host}:${port}`;
  try {
    const client = await createClient({ url })
      .connect();
    redisClient = client;
    console.log("Redis connected");
  } catch (error) {
    console.error("Redis connection error:", error);
  }
};

const getCLient = () => {
  if (!redisClient) {
    throw new Error("Redis connection not established");
  }
  return redisClient;
};

module.exports = {
  init,
  getCLient,
};

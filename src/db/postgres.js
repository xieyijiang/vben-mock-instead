const pg = require("pg");
const { dbConfig } = require("@/config");

let pgClient;
let retryCount = 0;
const MAX_RETRIES = 3;

const createTables = async (client) => {
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      avatar VARCHAR(255),
      status SMALLINT NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    );
  `);
};

const init = async () => {
  try {
    const { Client } = pg;
    const client = new Client(dbConfig.postgres);
    await client.connect();
    pgClient = client;
    
    // 初始化表结构
    await createTables(client);
    
    console.log("Postgres connected and initialized");
  } catch (error) {
    console.error("Postgres connection error:", error);
    
    if (retryCount < MAX_RETRIES) {
      retryCount++;
      console.log(`Retrying connection... Attempt ${retryCount}`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return init();
    }
    
    throw new Error("Failed to connect to Postgres after multiple attempts");
  }
};

const getPGClient = () => {
  if (!pgClient) {
    throw new Error("Postgres connection not established");
  }
  return pgClient;
};

module.exports = { init, getPGClient };

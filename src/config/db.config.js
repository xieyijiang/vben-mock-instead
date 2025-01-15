module.exports = {
  // https://redis.io/docs/latest/develop/clients/nodejs/
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
    username: process.env.REDIS_USERNAME || "",
    password: process.env.REDIS_PASSWORD || "",
  },
  // https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connect/
  mongo: {
    host: process.env.MONGO_HOST || "localhost",
    port: Number(process.env.MONGO_PORT) || 27017,
    username: process.env.MONGO_USERNAME || "",
    password: process.env.MONGO_PASSWORD || "",
    database: process.env.MONGO_DATABASE || "vben-mock-instead",
  },
  // https://node-postgres.com/apis/client#new-client
  postgres: {
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USERNAME || "",
    password: process.env.POSTGRES_PASSWORD || "",
    database: process.env.POSTGRES_DATABASE || "vben-mock-instead",
  },
  // https://sidorares.github.io/node-mysql2/docs#using-connection-pools
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    port: Number(process.env.MYSQL_PORT) || 3306,
    user: process.env.MYSQL_USERNAME || "root",
    password: process.env.MYSQL_PASSWORD || "root",
    database: process.env.MYSQL_DATABASE || "vben-mock-instead",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  },
};

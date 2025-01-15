require("module-alias/register");
require("dotenv").config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env",
});
const express = require("ultimate-express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");
const {
  appConfig,
  corsConfig,
  helmetConfig,
  rateLimitConfig,
} = require("@/config");
const { appRoutes, authRoutes, userRoutes } = require("@/routes");
const { redis, postgres, mysql, mongo } = require("@/db");

const app = express();

app.use(cors(corsConfig));
app.use(cookieParser());
app.use(compression()); // compress all requests
app.use(helmet(helmetConfig)); // secure app
app.use(rateLimit(rateLimitConfig));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "views")));
app.use([appRoutes, authRoutes, userRoutes]);

// https://expressjs.com/en/guide/behind-proxies.html
app.set("trust proxy", "loopback");

const startApp = async () => {
  const { name, port, useRedis, usePostgres, useMysql, useMongo } = appConfig;
  try {
    if (useRedis) await redis.init();
    if (usePostgres) await postgres.init();
    if (useMysql) await mysql.init();
    if (useMongo) await mongo.init();
    app.listen(port, () => {
      console.log(`${name} listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start:", error);
  }
};

startApp();

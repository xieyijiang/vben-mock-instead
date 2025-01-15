const appConfig = require("./app.config");
const corsConfig = require("./cors.config");
const dbConfig = require("./db.config");
const helmetConfig = require("./helmet.config");
const rateLimitConfig = require("./rateLimit.config");

module.exports = {
  appConfig: appConfig,
  corsConfig: corsConfig,
  dbConfig: dbConfig,
  helmetConfig: helmetConfig,
  rateLimitConfig: rateLimitConfig
}

module.exports = {
  name: process.env.APP_NAME || "vben-mock-instead",
  port: Number(process.env.PORT) || 3000,
  useMock: process.env.USE_MOCK === "true",
  useRedis: process.env.USE_REDIS === "true",
  usePostgres: process.env.USE_POSTGRES === "true",
  useMysql: process.env.USE_MYSQL === "true",
  useMongo: process.env.USE_MONGO === "true",
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "YOUR_ACCESS_TOKEN_SECRET",
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "YOUR_REFRESH_TOKEN_SECRET",
};

const { appConfig } = require("@/config");
const { vbenMock } = require("@/mock");
const { redis, mongo, mysql } = require("@/db");

class UserModel {
  /**
   * Find user by username and password
   * @param {UserInfo} query
   * @returns {Promise<UserInfo|null>} user object or null
   */
  static async findOne(query) {
    const { username, password } = query;

    //#region Mock
    if (appConfig.useMock) {
      const { MOCK_USERS } = vbenMock;
      const findUser = MOCK_USERS.find(
        (item) => item.username === username && item.password === password
      );

      return findUser;
    }
    //#endregion

    // Redis
    if (appConfig.useRedis) {
      try {
        const client = redis.getClient();
        const key = `user:${username}`;
        const value = await client.get(key);
        if (value) {
          return JSON.parse(value);
        }
      } catch (error) {
        console.error("Redis connection error:", error);
      }
    }

    // Postgres
    if(appConfig.usePostgres) {
      const client = postgres.getClient();
      const query = {
        text: "SELECT * FROM users WHERE username = $1 AND password = $2",
        values: [username, password],
        rowMode: "array",
      };
      const { rows } = await client.query(query);
      if (rows[0] && appConfig.useRedis) {
        try {
          const redisClient = redis.getClient();
          const key = `user:${username}`;
          await redisClient.set(key, JSON.stringify(rows[0]), "EX", 60);
        } catch (error) {
          console.error("Redis connection error:", error);
        }
      }
      return rows[0] || null;
    }

    // MySQL
    if (appConfig.useMysql) {
      const mysqlPool = mysql.getPool();
      const [rows, fields] = await mysqlPool.execute(
        "SELECT * FROM `users` WHERE `username` =? AND `password` =?",
        [username, password]
      );
      if (rows[0] && appConfig.useRedis) {
        try {
          const redisClient = redis.getClient();
          const key = `user:${username}`;
          await redisClient.set(key, JSON.stringify(rows[0]), "EX", 60);
        } catch (error) {
          console.error("Redis connection error:", error);
        }
      }
      return rows[0] || null;
    }

    // MongoDB
    if (appConfig.useMongo) {
      const mongoClient = mongo.getClient();
      const db = mongoClient.db("vben-mock-instead");
      const findUser = await db
        .collection("users")
        .findOne({ username, password });
      if (findUser && appConfig.useRedis) {
        try {
          const client = redis.getClient();
          const key = `user:${username}`;
          await client.set(key, JSON.stringify(findUser), "EX", 60);
        } catch (error) {
          console.error("Redis connection error:", error);
        }
      }
      return findUser;
    }
  }

  static async findCodes(query) {
    const { username } = query;

    //#region Mock
    if (appConfig.useMock) {
      const { MOCK_CODES } = vbenMock;
      const codes =
        MOCK_CODES.find((item) => item.username === username)?.codes ?? [];
      return codes;
    }
    //#endregion

    // MongoDB
    const db = mongo.getDB();
    const codes = await db.collection("codes").findOne({ username });
    return codes;

    // MySQL
    const [rows, fields] = await mysql.pool.execute(
      "SELECT * FROM `codes` WHERE `username` =?",
      [username]
    );
    return rows[0] || null;
  }
}

module.exports = UserModel;

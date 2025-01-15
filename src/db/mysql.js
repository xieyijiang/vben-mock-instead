// https://sidorares.github.io/node-mysql2/docs#using-connection-pools
const { dbConfig } = require("@/config");
const mysql2 = require("mysql2/promise");

let mysqlPool;

const init = async () => {
  try {
    const pool = mysql2.createPool(dbConfig.mysql);
    const connection = await pool.getConnection();
    mysqlPool = pool;
    // do some initial setup

    await connection.release();
    console.log("MySQL connected");
  } catch (err) {
    console.error("MySQL connection error:", err);
  }
};

const getPool = () => {
  if (!mysqlPool) {
    throw new Error("MySQL connection not established");
  }
  return mysqlPool;
};

module.exports = { init, getPool };

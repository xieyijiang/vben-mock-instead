const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "access_token_secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh_token_secret";

function generateAccessToken(userInfo) {
  return jwt.sign(userInfo, ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
}

function generateRefreshToken(userInfo) {
  return jwt.sign(userInfo, REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
}

module.exports = {
  generateAccessToken,
  generateRefreshToken
};

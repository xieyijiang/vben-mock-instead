const jwt = require("jsonwebtoken");
const { UserModel } = require("@/models");
const { errorUtils } = require("@/utils");

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "access_token_secret";

async function verifyAccessToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader?.startsWith("Bearer")) {
    return res
      .status(401)
      .json(
        errorUtils.errObj(401, { error: "Authorization header is invalid" })
      );
  }

  const token = authHeader.split(" ")[1];
  try {
    const { username, password } = jwt.verify(token, ACCESS_TOKEN_SECRET);

    const user = await UserModel.findOne({ username, password });

    if (!user) {
      return res
        .status(401)
        .json(errorUtils.errObj(401, { error: "User not found" }));
    }
    req.userinfo = user;

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json(errorUtils.errObj(500));
  }
}

module.exports = verifyAccessToken;

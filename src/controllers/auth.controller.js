const { UserModel } = require("@/models");
const { jwtUtils, errorUtils } = require("@/utils");

class AuthController {
  async codes(req, res) {
    const { username } = req.userinfo;

    if (!username) return res.status(401).json(errorUtils.errObj(401));

    try {
      const codes = await UserModel.findCodes({ username });
      res.status(200).json({
        code: 0,
        data: codes,
        error: null,
        message: "ok",
      });
    } catch (err) {
      res.status(500).json(errorUtils.errObj(500));
    }
  }

  async login(req, res) {
    const { username, password } = req.body;

    if (!password || !username) {
      return res.status(400).json(
        errorUtils.errObj(400, {
          message: "Username and password are required",
        })
      );
    }

    const findUser = await UserModel.findOne({ username, password });

    if (!findUser) {
      res.cookie("jwt", "", { maxAge: 0 });
      return res.status(403).json(
        errorUtils.errObj(403, {
          message: "Username or password is incorrect.",
        })
      );
    }

    try {
      const accessToken = jwtUtils.generateAccessToken(findUser);
      const refreshToken = jwtUtils.generateRefreshToken(findUser);

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
      });
      res.status(200).json({
        code: 0,
        data: {
          ...findUser,
          accessToken,
        },
        error: null,
        message: "ok",
      });
    } catch (err) {
      res.status(500).json(errorUtils.errObj(500));
    }
  }

  async logout(req, res) {
    const refreshToken = req.cookies.jwt;
    const result = {
      code: 0,
      data: "",
      error: null,
      message: "ok",
    };
    if (!refreshToken) {
      return res.status(200).json(result);
    }

    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json(result);
  }
}

module.exports = new AuthController();

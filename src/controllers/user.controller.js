const { errorUtils } = require("@/utils");

class UserController {
  async info(req, res) {
    const { userinfo } = req;
    if (!userinfo) {
      return res.status(401).json(errorUtils.errObj(401));
    }
    res.status(200).json({
      code: 0,
      data: userinfo,
      error: null,
      message: "ok",
    });
  }
}

module.exports = new UserController();

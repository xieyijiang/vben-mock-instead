const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { UserModel } = require("@/models");
const { appConfig } = require("@/config");
const { errorUtils } = require("@/utils");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: appConfig.accessTokenSecret,
};

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const { username, password } = jwtPayload;
      const user = await UserModel.findOne({ username, password });
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

async function jwtPassport(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json(errorUtils.errObj(500));
    }
    if (!user) {
      return res
        .status(401)
        .json(
          errorUtils.errObj(401, { error: "Authorization header is invalid" })
        );
    }
    req.userinfo = user;
    next();
  })(req, res, next);
}

module.exports = jwtPassport;

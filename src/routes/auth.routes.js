const express = require("ultimate-express");
const { authController } = require("@/controllers");
const { verifyAccessToken, jwtPassport } = require("@/middlewares");

const router = express.Router();

router.post("/api/auth/login", (req, res) => authController.login(req, res));
router.post("/api/auth/logout", (req, res) => authController.logout(req, res));
router.get("/api/auth/codes", jwtPassport, (req, res) => authController.codes(req, res));

module.exports = router;
const express = require("ultimate-express");
const { userController } = require("@/controllers");
const { verifyAccessToken } = require("@/middlewares");

const router = express.Router();

router.get("/api/user/info", verifyAccessToken, (req, res) => userController.info(req, res));

module.exports = router;
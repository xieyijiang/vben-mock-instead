const express = require("ultimate-express");
const { appController } = require("@/controllers");

const router = express.Router();

router.use("/api-docs", appController.swaggerServe());
router.get("/api-docs", appController.swaggerDoc());

router.get("/", (req, res) => appController.hello(req, res));
router.get("/favicon.ico", (req, res) => appController.favicon(req, res));

module.exports = router;
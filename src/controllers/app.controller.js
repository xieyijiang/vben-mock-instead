const swaggerUi =  require("swagger-ui-express");
const path = require("path");
const { swaggerUtils } =  require("@/utils");

class AppController {
  hello(req, res) {
    // res.send("Hello World!");
    res.sendFile(path.join(__dirname, "../views/index.html"));
  }

  favicon(req, res) {
    res.sendFile(path.join(__dirname, "../views/public/favicon.ico"));
  }

  swaggerServe() {
    return swaggerUi.serve;
  }

  swaggerDoc() {
    return swaggerUi.setup(swaggerUtils.genDocs());
  }
}

module.exports = new AppController();

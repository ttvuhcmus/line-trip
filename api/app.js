const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const routes = require("./server/routes");
const responseHandler = require("./server/libs/responseHandler");
const { swaggerDocs, swaggerUi } = require("./server/libs/swagger");
const app = express();

require("dotenv").config();
require("./server/connections/mongo");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(logger("dev"));
app.use(cors({ origin: "*" }));
app.use(responseHandler);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(routes);

app.listen(1233, function () {
  console.log("Line Trip api are runing!");
});

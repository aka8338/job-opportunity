const express = require("express");
const { expertRouter } = require("./expert.route");
const { employerRouter } = require("./employer.route");

const apiRouter = express.Router();

apiRouter.use("/expert", expertRouter);
apiRouter.use("/employer", employerRouter);

module.exports = apiRouter;

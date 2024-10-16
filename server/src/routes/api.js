const express = require("express");
const expert = require("./expert");
const employer = require("./employer");

const router = express.Router();

router.use("/expert", expert);
router.use("/employer", employer);

module.exports = router;

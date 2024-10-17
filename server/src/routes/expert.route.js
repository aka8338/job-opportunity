const express = require("express");
const {
  signup,
  login,
  expertProfile,
  editProfile,
} = require("../controllers/expert.controller");

const expertRouter = express.Router();

// expertRouter.get("/", home);

expertRouter.post("/auth/register", signup);

expertRouter.post("/auth/login", login);

expertRouter.get("/profile", expertProfile);

expertRouter.put("/profile", editProfile);


// employerRouter.get("/applicant/:id", applicant);

// employerRouter.put("/applicant/:id", applicant);

module.exports = {
  expertRouter,
};

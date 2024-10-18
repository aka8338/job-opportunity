const express = require("express");
const {
  signup,
  login,
  getJobs,
  editProfile,
  applyJob,
  logout,
} = require("../controllers/expert.controller");
const { getJobs } = require("../controllers/employer.controller");

const expertRouter = express.Router();

// expertRouter.get("/", home);

expertRouter.post("/auth/register", signup);

expertRouter.post("/auth/login", login);

expertRouter.get("/auth/logout", logout);

expertRouter.patch("/editProfile", editProfile);

expertRouter.get("/getJobs", getJobs);

expertRouter.post("/applyJob", applyJob);

// employerRouter.get("/applicant/:id", applicant);

// employerRouter.put("/applicant/:id", applicant);

module.exports = {
  expertRouter,
};

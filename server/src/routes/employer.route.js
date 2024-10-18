const express = require("express");
const {
  signup,
  login,
  editProfile,
  postJob,
  getJobs,
  editJob,
  deleteJob,
  getApplicants,
  logout,
} = require("../controllers/employer.controller");

const employerRouter = express.Router();

// employerRouter.get("/", home);

employerRouter.post("/auth/register", signup);

employerRouter.post("/auth/login", login);

employerRouter.get("/auth/logout", logout);

employerRouter.patch("/editProfile", editProfile);

employerRouter.post("/postJob", postJob);

employerRouter.get("/getJobs", getJobs);

employerRouter.patch("/editJob/:jobId", editJob);

employerRouter.delete("/removeJob/:jobId", deleteJob);

employerRouter.get("/applicants", getApplicants);

// employerRouter.get("/applicant/:id", applicant);

// employerRouter.put("/applicant/:id", applicant);

module.exports = {
  employerRouter,
};

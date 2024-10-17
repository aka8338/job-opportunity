const express = require("express");
const {
  signup,
  login,
  companyProfile,
  editProfile,
  postJob,
  getJobs,
  editJob,
  deleteJob,
  getApplicants,
} = require("../controllers/employer.controller");

const employerRouter = express.Router();

// employerRouter.get("/", home);

employerRouter.post("/auth/register", signup);

employerRouter.post("/auth/login", login);

employerRouter.get("/profile", companyProfile);

employerRouter.put("/profile", editProfile);

employerRouter.post("/job", postJob);

employerRouter.get("/jobs", getJobs);

employerRouter.put("/job/:id", editJob);

employerRouter.delete("/job/:id", deleteJob);

employerRouter.get("/applicants", getApplicants);

// employerRouter.get("/applicant/:id", applicant);

// employerRouter.put("/applicant/:id", applicant);

module.exports = {
  employerRouter,
};

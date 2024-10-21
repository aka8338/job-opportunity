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
  examineApplicant,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/employer.controller");

const employerRouter = express.Router();

employerRouter.post("/signup", signup);

employerRouter.post("/login", login);

employerRouter.get("/logout", logout);

employerRouter.patch("/editProfile", editProfile);

employerRouter.post("/postJob", postJob);

employerRouter.get("/getJobs", getJobs);

employerRouter.patch("/editJob/:jobId", editJob);

employerRouter.delete("/removeJob/:jobId", deleteJob);

employerRouter.get("/applicants", getApplicants);

employerRouter.patch("/applicant/:id", examineApplicant);

employerRouter.post("/verify", verifyEmail);

employerRouter.post("/forgot-password", forgotPassword);

employerRouter.post("/reset-password/:token", resetPassword);

module.exports = {
  employerRouter,
};

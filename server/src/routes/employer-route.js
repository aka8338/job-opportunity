const express = require("express");
const {
  signup,
  login,
  editProfile,
  postJob,
  editJob,
  deleteJob,
  getApplicants,
  examineApplicant,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/employer-controller");

const employerRouter = express.Router();

employerRouter.post("/signup", signup);

employerRouter.post("/login", login);

employerRouter.patch("/editProfile", editProfile);

employerRouter.post("/postJob", postJob);

employerRouter.patch("/editJob/:jobId", editJob);

employerRouter.delete("/removeJob/:jobId", deleteJob);

employerRouter.get("/applicants/:jobId", getApplicants);

employerRouter.patch("/applicant", examineApplicant);

employerRouter.post("/verify", verifyEmail);

employerRouter.post("/forgot-password", forgotPassword);

employerRouter.post("/reset-password/:token", resetPassword);

module.exports = {
  employerRouter,
};

const express = require("express");
const {
  signup,
  login,
  getJobs,
  editProfile,
  applyJob,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/expert.controller");

const expertRouter = express.Router();

// expertRouter.get("/", home);

expertRouter.post("/auth/register", signup);

expertRouter.post("/auth/login", login);

expertRouter.get("/auth/logout", logout);

expertRouter.patch("/editProfile", editProfile);

expertRouter.get("/getJobs", getJobs);

expertRouter.post("/applyJob", applyJob);

expertRouter.post("/verify", verifyEmail);

expertRouter.post("/forgot-password", forgotPassword);

expertRouter.post("/reset-password/:token", resetPassword);

module.exports = {
  expertRouter,
};

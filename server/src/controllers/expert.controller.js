const {
  addExpert,
  loginExpert,
  updateExpert,
  fatchJobs,
  submitJob,
} = require("../models/expert.model");
const generateTokenSetCookie = require("../utils/generateTokenSetCookies");

// expert sign up by providing basic information
const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;
    await addExpert(email, password, firstName, lastName, phone)
      .then((result) => {
        res.status(201).json({ message: "Expert added successfully", result });
        // Generate token and set cookie
        generateTokenSetCookie(res, result.expertId);
      })
      .catch((error) => {
        res.status(400).json({ message: "Expert not added", error });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    await loginExpert(email, password)
      .then((result) => {
        res
          .status(200)
          .json({ message: "Expert logged in successfully", result });
        // Generate token and set cookie
        generateTokenSetCookie(res, result.expertId);
      })
      .catch((error) => {
        res.status(400).json({ message: "Expert not logged in", error });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logout successfully" });
};

const editProfile = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    await updateExpert(email, password, firstName, lastName)
      .then((result) => {
        res
          .status(200)
          .json({ message: "Expert profile updated successfully", result });
      })
      .catch((error) => {
        res.status(400).json({ message: "Expert profile not updated", error });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getJobs = async (req, res) => {
  try {
    await fatchJobs()
      .then((result) => {
        res.status(200).json({ message: "Jobs fetched successfully", result });
      })
      .catch((error) => {
        res.status(400).json({ message: "Jobs not fetched", error });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const applyJob = async (req, res) => {
  try {
    const { expertId, jobId } = req.body;
    await submitJob(expertId, jobId)
      .then((result) => {
        res.status(200).json({ message: "Job applied successfully", result });
      })
      .catch((error) => {
        res.status(400).json({ message: "Job not applied", error });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  signup,
  login,
  editProfile,
  getJobs,
  applyJob,
  logout,
};

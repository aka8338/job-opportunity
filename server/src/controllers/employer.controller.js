const {
  addCompany,
  loginCompany,
  updateCompany,
  addJob,
  fatchJobs,
  updateJob,
  removeJob,
  fatchApplicants,
} = require("../models/employer.model");

const signup = async (req, res) => {
  try {
    const { email, password, companyName, companyDescription, contactNumber } =
      req.body;
    await addCompany(
      email,
      password,
      companyName,
      companyDescription,
      contactNumber
    )
      .then((result) => {
        res.status(201).json({ message: "Company added successfully", result });
      })
      .catch((error) => {
        res.status(400).json({ message: "Company not added", error });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    await loginCompany(email, password)
      .then((result) => {
        res
          .status(200)
          .json({ message: "Company logged in successfully", result });
      })
      .catch((error) => {
        res.status(400).json({ message: "Company not logged in", error });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const editProfile = async (req, res) => {
  try {
    const { email, companyName, contactNumber, companyDescription } = req.body;
    await updateCompany(email, companyName, contactNumber, companyDescription)
      .then((result) => {
        res
          .status(200)
          .json({ message: "Company profile updated successfully", result });
      })
      .catch((error) => {
        res.status(400).json({ message: "Company profile not updated", error });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const postJob = async (req, res) => {
  try {
    const {
      companyId,
      jobTitle,
      jobDescription,
      jobLocation,
      jobType,
      salary,
      requiredSkills,
    } = req.body;
    await addJob(
      companyId,
      jobTitle,
      jobDescription,
      jobLocation,
      jobType,
      salary,
      requiredSkills
    )
      .then((result) => {
        res.status(201).json({ message: "Job added successfully", result });
      })
      .catch((error) => {
        res.status(400).json({ message: "Job not added", error });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getJobs = async (req, res) => {
  try {
    const { companyId } = req.body;
    await fatchJobs(companyId)
      .then((result) => {
        res
          .status(200)
          .json({ message: "Jobs retrieved successfully", result });
      })
      .catch((error) => {
        res.status(400).json({ message: "Jobs not retrieved", error });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const editJob = async (req, res) => {
  try {
    const {
      jobTitle,
      jobDescription,
      jobLocation,
      jobType,
      salary,
      requiredSkills,
    } = req.body;
    const { jobId } = req.params;
    await updateJob(
      jobId,
      jobTitle,
      jobDescription,
      jobLocation,
      jobType,
      salary,
      requiredSkills
    )
      .then((result) => {
        res.status(200).json({ message: "Job updated successfully", result });
      })
      .catch((error) => {
        res.status(400).json({ message: "Job not updated", error });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    await removeJob(jobId)
      .then((result) => {
        res.status(200).json({ message: "Job removed successfully", result });
      })
      .catch((error) => {
        res.status(400).json({ message: "Job not removed", error });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getApplicants = async (req, res) => {
  try {
    const { jobId } = req.body;
    await fatchApplicants(jobId)
      .then((result) => {
        res
          .status(200)
          .json({ message: "Applicants retrieved successfully", result });
      })
      .catch((error) => {
        res.status(400).json({ message: "Applicants not retrieved", error });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  signup,
  login,
  editProfile,
  postJob,
  getJobs,
  editJob,
  deleteJob,
  getApplicants,
};

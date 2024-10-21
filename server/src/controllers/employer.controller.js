const generateTokenSetCookie = require("../utils/generateTokenSetCookies");
const {
  sendWellcomeEmail,
  sendVerificationEmail,
  restPasswordEmail,
  restPasswordSuccessEmail,
} = require("../nodemailer/email");
const {
  addCompany,
  loginCompany,
  updateCompany,
  addJob,
  fatchJobs,
  updateJob,
  removeJob,
  fatchApplicants,
  updateApplicantStatus,
  verifyCompany,
  forgotPasswordCompany,
  resetPasswordCompany,
} = require("../models/employer.model");

const signup = async (req, res) => {
  try {
    const { email, password, companyName, companyDescription, contactNumber } =
      req.body;
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    await addCompany(
      email,
      password,
      companyName,
      companyDescription,
      contactNumber,
      verificationToken
    )
      .then(async (result) => {
        // Generate token and set cookie
        generateTokenSetCookie(res, result.expertId);
        try {
          await sendVerificationEmail(email, verificationToken);
          res.status(201).json({
            message: "Company added successfully",
            data: {
              email,
              companyDescription,
              companyName,
              contactNumber,
              companyId: result.insertId,
            },
          });
        } catch (emailError) {
          console.error("Error sending verification email:", emailError); // Log the email error
          res
            .status(500)
            .json({ message: "Company added but email not sent", emailError });
        }
      })
      .catch((error) => {
        console.error("Error adding company:", error); // Log the error
        res.status(400).json({ message: "Company not added", error });
      });
  } catch (error) {
    console.error("Internal server error:", error); // Log the error
    res.status(500).json({ message: "Internal server error", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    await loginCompany(email, password)
      .then((result) => {
        // Generate token and set cookie
        generateTokenSetCookie(res, result.expertId);
        res
          .status(200)
          .json({ message: "Company logged in successfully", result });
      })
      .catch((error) => {
        res.status(400).json({ message: "Invalid credentials", error });
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
    const { email, companyName, contactNumber, companyDescription } = req.body;
    const companyId = req.userId;
    await updateCompany(
      companyId,
      email,
      companyName,
      contactNumber,
      companyDescription
    )
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
      jobLevel,
    } = req.body;
    await addJob(
      companyId,
      jobTitle,
      jobDescription,
      jobLocation,
      jobType,
      salary,
      requiredSkills,
      jobLevel
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
    const companyId = req.userId;
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
      jobId,
      jobTitle,
      jobDescription,
      jobLocation,
      jobType,
      salary,
      requiredSkills,
    } = req.body;
    const companyId = req.userId;
    await updateJob(
      jobId,
      jobTitle,
      jobDescription,
      jobLocation,
      jobType,
      salary,
      requiredSkills,
      companyId
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
    const companyId = req.userId;
    await removeJob(jobId, companyId)
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
    const companyId = req.userId;
    await fatchApplicants(jobId, companyId)
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

const examineApplicant = async (req, res) => {
  try {
    const { applicantId, status } = req.body;
    const companyId = req.userId;
    await updateApplicantStatus(applicantId, status, companyId)
      .then((result) => {
        res
          .status(200)
          .json({ message: "Applicant status updated successfully", result });
      })
      .catch((error) => {
        res
          .status(400)
          .json({ message: "Applicant status not updated", error });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;
    const companyId = req.userId;
    await verifyCompany(companyId, token)
      .then(async (result) => {
        await sendWellcomeEmail(user.email, result.companyName);
        res
          .status(200)
          .json({ message: "Email verified successfully", result });
      })
      .catch((error) => {
        res.status(400).json({ message: "Email not verified", error });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    await forgotPasswordCompany(email)
      .then(async (result) => {
        await restPasswordEmail(email, result.restPasswordToken);
        res
          .status(200)
          .json({ message: "Password reset link sent successfully", result });
      })
      .catch((error) => {
        res
          .status(400)
          .json({ message: "Password reset link not sent", error });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    await resetPasswordCompany(token, password)
      .then(async (result) => {
        await restPasswordSuccessEmail(result.email);
        res
          .status(200)
          .json({ message: "Password reset successfully", result });
      })
      .catch((error) => {
        res.status(400).json({ message: "Password not reset", error });
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
  logout,
  examineApplicant,
  verifyEmail,
  forgotPassword,
  resetPassword,
};

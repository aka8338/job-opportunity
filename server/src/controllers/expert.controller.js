const {
  addExpert,
  loginExpert,
  updateExpert,
  fatchJobs,
  submitJob,
  verifyExpert,
  forgotPasswordExpert,
  resetPasswordExpert,
} = require("../models/expert.model");
const generateTokenSetCookie = require("../utils/generateTokenSetCookies");
const {
  sendWellcomeEmail,
  sendVerificationEmail,
  restPasswordEmail,
  restPasswordSuccessEmail,
} = require("../nodemailer/email");

// expert sign up by providing basic information
const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phoneNumber } = req.body;
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    await addExpert(
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      verificationToken
    )
      .then(async (result) => {
        // Generate token and set cookie
        generateTokenSetCookie(res, result.expertId);
        await sendVerificationEmail(email, verificationToken);
        res.status(201).json({
          message: "Expert added successfully",
          data: {
            email,
            firstName,
            lastName,
            phoneNumber,
            expertId: result.insertId,
          },
        });
      })
      .catch((error) => {
        if (error.code === "ER_DUP_ENTRY") {
          res.status(400).json({ message: "Expert already exists", error });
        } else {
          res.status(400).json({ message: "Expert not added", error });
        }
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
        // Generate token and set cookie
        generateTokenSetCookie(res, result.expertId);
        res
          .status(200)
          .json({ message: "Expert logged in successfully", result });
      })
      .catch((error) => {
        res.status(400).json({ message: "invalid cardinals", error });
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
    const expertId = req.userId;
    await updateExpert(expertId, email, firstName, lastName, phone)
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
    const { jobId } = req.body;
    const expertId = req.userId;
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

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;
    const expertId = req.userId;
    await verifyExpert(expertId, token)
      .then(async (result) => {
        if (result) {
          await sendWellcomeEmail(email);
          res.status(200).json({ message: "Company verified successfully" });
        } else {
          console.log(result);
          res.status(400).json({ message: "Invalid token" });
        }
      })
      .catch((error) => {
        res.status(400).json({ message: "Company not verified", error });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    await forgotPasswordExpert(email)
      .then(async (result) => {
        await restPasswordEmail(email, result.resetPasswordToken);
        res.status(200).json({ message: "Reset link sent successfully" });
      })
      .catch((error) => {
        res.status(400).json({ message: "Reset link not sent", error });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    await resetPasswordExpert(token, password)
      .then(async (result) => {
        await restPasswordSuccessEmail(result.email);
        res.status(200).json({ message: "Password reset successfully" });
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
  getJobs,
  applyJob,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
};

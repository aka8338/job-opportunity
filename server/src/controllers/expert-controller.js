const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const generateTokenSetCookie = require("../utils/generateTokenSetCookies");
const JobPosting = require("../models/jobPosting-model");
const JobApplication = require("../models/jobApplication");
const Expert = require("../models/expert-model");
const {
  sendVerificationEmail,
  sendWellcomeEmail,
  restPasswordEmail,
} = require("../nodemailer/email");

// expert sign up by providing basic information
const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName, contactNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const newExpert = await Expert.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      contactNumber,
      verificationToken,
    });
    // Generate token and set cookie
    generateTokenSetCookie(res, newExpert.id);
    await sendVerificationEmail(email, newExpert.verificationToken);
    res.status(201).json({ message: "Expert added successfully", newExpert });
  } catch (error) {
    res.status(400).json({ message: "Expert not added", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const expert = await Expert.findOne({ where: { email } });
    if (expert) {
      const isMatch = bcrypt.compare(password, expert.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      // Generate token and set cookie
      generateTokenSetCookie(res, expert.expertId);
      res
        .status(200)
        .json({ message: "Expert logged in successfully", expert });
      // Generate token and set cookie
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
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
    const { firstName, lastName, contactNumber } = req.body;
    const expertId = req.userId;
    const updatedExpert = await Expert.update(
      { firstName, lastName, contactNumber },
      { where: { expertId } }
    );
    res
      .status(200)
      .json({ message: "Expert profile updated successfully", updatedExpert });
  } catch (error) {
    res.status(400).json({ message: "Expert profile not updated", error });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await JobPosting.findAll();
    res.status(200).json({ message: "Jobs fetched successfully", jobs });
  } catch (error) {
    res.status(400).json({ message: "Jobs not fetched", error });
  }
};

const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const expertId = req.userId;
    const jobApplication = await JobApplication.create({ expertId, jobId });
    res
      .status(200)
      .json({ message: "Job applied successfully", jobApplication });
  } catch (error) {
    res.status(400).json({ message: "Job not applied", error });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const resetToken = crypto.randomBytes(20).toString("hex");
    const expert = await Expert.findOne({ where: { email } });
    if (expert) {
      await Expert.update(
        {
          resetPasswordToken: resetToken,
          resetPasswordExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        },
        { where: { email } }
      );
      // Assuming sendVerificationEmail is a function that sends an email
      await restPasswordEmail(email, resetToken);
      res.status(200).json({ message: "Email sent successfully" });
    } else {
      res.status(400).json({ message: "Email not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { verificationToken } = req.body;
    const expertId = req.userId;

    //
    const expert = await Expert.findOne({
      where: {
        expertId,
        verificationToken,
        verificationExpiresAt: { [Op.gt]: new Date() },
      },
    });
    console.log(verificationToken, expertId);

    if (expert) {
      //
      await Expert.update(
        {
          isVerified: true,
          verificationToken: null,
          verificationExpiresAt: null,
        },
        { where: { companyId } }
      );
      await sendWellcomeEmail(expert.email, expert.firstName + expert.lastName);
      res.status(200).json({ message: "Email verified successfully" });
    } else {
      res.status(400).json({ message: "Email not verified" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { resetToken, password } = req.body;
    const expert = await Expert.findOne({
      where: {
        resetPasswordToken: resetToken,
        resetPasswordExpiresAt: { [Op.gt]: new Date() },
      },
    });
    if (expert) {
      const hashedPassword = bcrypt.hash(password, 10);
      await Expert.update(
        {
          password: hashedPassword,
          resetPasswordToken: null,
          resetPasswordExpiresAt: null,
        },
        { where: { companyId: expert.companyId } }
      );
      await restPasswordSuccessEmail(expert.email);
      res.status(200).json({ message: "Password reset successfully" });
    } else {
      res.status(400).json({ message: "Invalid or expired reset token" });
    }
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

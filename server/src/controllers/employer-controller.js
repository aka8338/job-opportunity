const bycrypt = require("bcryptjs");
const crypto = require("crypto");
const { Op } = require("sequelize");
const generateTokenSetCookie = require("../utils/generateTokenSetCookies");
const Employer = require("../models/employer-model");
const JobPosting = require("../models/jobPosting-model");
const JobApplication = require("../models/jobApplication");
const Expert = require("../models/expert-model");
const { sendVerificationEmail } = require("../nodemailer/email");
const Profile = require("../models/profile  ");





const signup = async (req, res) => {
  try {
    const { email, password, companyName, companyDescription, contactNumber } =
      req.body;
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Hash the password using bcrypt
    const hashedPassword = await bycrypt.hash(password, 10);

    // Add a new company using Sequelize
    const newCompany = await Employer.create({
      email,
      password: hashedPassword, // Hash this password using a hashing algorithm like bcrypt in real scenarios
      companyName,
      companyDescription,
      contactNumber,
      verificationToken,
    });

    // Exclude password from the returned company object
    const { password: _, ...companyWithoutPassword } = newCompany.toJSON();

    generateTokenSetCookie(res, newCompany.companyId);
    await sendVerificationEmail(email, verificationToken);
    res.status(201).json({
      message: "Company added successfully",
      company: companyWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find company by email and password using Sequelize
    const company = await Employer.findOne({
      where: { email }, // In real apps, compare hashed passwords
    });

    if (!company) {
      return res.status(400).json({ message: "Invalid credentials" });
    } else {
      const isPasswordValid = await bycrypt.compare(password, company.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    }
    generateTokenSetCookie(res, company.companyId);
    res
      .status(200)
      .json({ message: "Company logged in successfully", company });
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
    const { companyName, contactNumber, companyDescription } = req.body;
    const companyId = req.userId; // Assuming you have the company ID stored in req.userId after authentication

    // Update company profile using Sequelize
    const updatedCompany = await Employer.update(
      { companyName, contactNumber, companyDescription },
      { where: { companyId } }
    );

    if (updatedCompany[0] === 0) {
      return res.status(400).json({ message: "Company profile not updated" });
    }

    res.status(200).json({ message: "Company profile updated successfully" });
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
      jobSalary,
      jobSkills,
      jobExperience,
      jobLevel,
    } = req.body;

    // Add a new job posting using Sequelize
    const newJob = await JobPosting.create({
      companyId,
      jobTitle,
      jobDescription,
      jobLocation,
      jobType,
      jobSalary,
      jobSkills,
      jobExperience,
      jobLevel,
    });

    res.status(201).json({ message: "Job added successfully", newJob });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getJobs = async (req, res) => {
  try {
    const { companyId } = req.body;

    // Fetch all jobs for the company using Sequelize
    const jobs = await JobPosting.findAll({ where: { companyId } });

    res.status(200).json({ message: "Jobs retrieved successfully", jobs });
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

    // Update the job posting using Sequelize
    const updatedJob = await JobPosting.update(
      {
        jobTitle,
        jobDescription,
        jobLocation,
        jobType,
        salary,
        requiredSkills,
      },
      { where: { jobId } }
    );

    if (updatedJob[0] === 0) {
      return res.status(400).json({ message: "Job not updated" });
    }

    res.status(200).json({ message: "Job updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Remove the job posting using Sequelize
    const deletedJob = await JobPosting.destroy({ where: { jobId } });

    if (!deletedJob) {
      return res.status(400).json({ message: "Job not removed" });
    }

    res.status(200).json({ message: "Job removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getApplicants = async (req, res) => {
  try {
    const { jobId } = req.body;

    // Fetch all applicants for a specific job posting using Sequelize
    const applicants = await JobApplication.findAll({
      where: { jobId },
      include: [Expert], // Assuming Expert is the applicant model
    });

    res
      .status(200)
      .json({ message: "Applicants retrieved successfully", applicants });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const examineApplicant = async (req, res) => {
  try {
    const { applicantId, status } = req.body;
    const companyId = req.userId; // Assuming you have the company ID stored in req.userId after authentication

    // Update the applicant status using Sequelize
    const updatedApplicant = await JobApplication.update(
      { status },
      { where: { applicationId: applicantId, companyId } }
    );

    if (updatedApplicant[0] === 0) {
      return res.status(400).json({ message: "Applicant status not updated" });
    }

    res.status(200).json({ message: "Applicant status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { verificationToken } = req.body;
    const companyId = req.userId; // Assuming you have the company ID stored in req.userId after authentication
    // Find company by email and verification token using Sequelize
    const company = await Employer.findOne({
      where: {
        companyId,
        verificationToken,
        verificationExpiresAt: { [Op.gt]: new Date() },
      },
    });

    if (!company) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    // Update the company's email verification status using Sequelize
    const updatedCompany = await Employer.update(
      {
        isVerified: true,
        verificationToken: null,
        verificationExpiresAt: null,
      },
      { where: { companyId } }
    );

    if (updatedCompany[0] === 0) {
      return res.status(400).json({ message: "Email not verified" });
    }

    await sendWellcomeEmail(company.email, company.companyName);
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Update the company's reset password token and expiry using Sequelize
    const updatedCompany = await Employer.update(
      {
        resetPasswordToken: resetToken,
        resetPasswordExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hour from now
      },
      { where: { email } }
    );

    if (updatedCompany[0] === 0) {
      return res.status(400).json({ message: "Reset password token not set" });
    }

    await sendResetPasswordEmail(email, resetToken);
    res.status(200).json({ message: "Reset password email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { resetToken, password } = req.body;

    // Find company by reset password token and expiry using Sequelize
    const company = await Employer.findOne({
      where: {
        resetPasswordToken: resetToken,
        resetPasswordExpiresAt: { [Op.gt]: new Date() },
      },
    });

    if (!company) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    // Hash the new password using bcrypt
    const hashedPassword = await bycrypt.hash(password, 10);

    // Update the company's password using Sequelize
    const updatedCompany = await Employer.update(
      {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpiresAt: null,
      },
      { where: { companyId: company.companyId } }
    );

    if (updatedCompany[0] === 0) {
      return res.status(400).json({ message: "Password not updated" });
    }

    res.status(200).json({ message: "Password reset successfully" });
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

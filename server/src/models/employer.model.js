const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const connection = require("../config/db");

async function addCompany(
  email,
  password,
  companyName,
  companyDescription,
  contactNumber,
  verificationToken
) {
  const verificationExpiresAt = Date.now() + 15 * 60 * 1000;
  // Number of salt rounds for bcrypt
  const saltRounds = 10;

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const query = `INSERT INTO employer (email, password, companyName, companyDescription, contactNumber, verificationToken, verificationExpiresAt, loginTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    email,
    hashedPassword,
    companyName,
    companyDescription,
    contactNumber,
    verificationToken,
    verificationExpiresAt,
    Date.now(),
  ];
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}

async function loginCompany(email, password) {
  const query = `SELECT * FROM employer WHERE email = ?`;
  const values = [email];
  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(query, values, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });

    if (result.length > 0) {
      const company = result[0];
      const isMatch = await bcrypt.compare(password, company.password);
      if (isMatch) {
        // Remove the password before sending the company object
        delete company.password;
        return company;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

async function updateCompany(
  companyId,
  email,
  companyName,
  contactNumber,
  companyDescription
) {
  const query = `UPDATE employer SET companyName = ?, contactNumber=?, companyDescription=?, email=?  WHERE companyId = ?`;
  const values = [
    companyName,
    contactNumber,
    companyDescription,
    email,
    companyId,
  ];
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}

async function addJob(
  companyId,
  jobTitle,
  jobDescription,
  jobLocation,
  jobType,
  salary,
  requiredSkills,
  jobLevel
) {
  const query = `INSERT INTO JobPosting (companyId, jobTitle, jobDescription, jobLocation, jobType, salary, requiredSkills, jobLevel) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    companyId,
    jobTitle,
    jobDescription,
    jobLocation,
    jobType,
    salary,
    requiredSkills,
    jobLevel,
  ];
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}

async function fatchJobs(companyId) {
  const query = `SELECT * FROM JobPosting WHERE companyId = ?`;
  const values = [companyId];
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}

async function updateJob(
  jobId,
  jobTitle,
  jobDescription,
  jobLocation,
  jobType,
  salary,
  requiredSkills,
  companyId
) {
  const query = `UPDATE JobPosting SET jobTitle = ?, jobDescription = ?, jobLocation = ?, jobType = ?, salary = ?, requiredSkills = ? WHERE jobId = ? AND companyId = ?`;
  const values = [
    jobTitle,
    jobDescription,
    jobLocation,
    jobType,
    salary,
    requiredSkills,
    jobId,
    companyId,
  ];
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}

async function removeJob(jobId, companyId) {
  const query = `DELETE FROM JobPosting WHERE jobId = ? and companyId = ?`;
  const values = [jobId, companyId];
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}

async function fatchApplicants(jobId, companyId) {
  const query = `SELECT * FROM JobApplication j JOIN expert e ON j.applicantId = e.expertId WHERE jobId = ? AND companyId = ?`;
  const values = [jobId, companyId];
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}

async function updateApplicantStatus(applicantId, status, companyId) {
  const query = `UPDATE JobApplication SET status = ? WHERE applicantId = ? AND companyId = ?`;
  const values = [status, applicantId, companyId];
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}

async function verifyCompany(companyId, token) {
  const query = `SELECT * FROM employer WHERE companyId = ? AND virficationToken = ? AND virficationTokenAt > NOW()`;
  const values = [companyId, token];

  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, result) => {
      if (error) {
        return reject(error);
      }
      if (result.length > 0) {
        const user = result[0];
        const updateQuery = `UPDATE employer SET isVirfied = ?, virficationToken = ?, virficationTokenAt = ? WHERE companyId = ?`;
        const updateValues = [true, null, null, companyId];
        connection.query(
          updateQuery,
          updateValues,
          (updateError, updateResult) => {
            if (updateError) {
              return reject(updateError);
            }
            resolve(updateResult);
          }
        );
      } else {
        resolve(null);
      }
    });
  });
}

async function forgotPasswordCompany(email) {
  const token = crypto.randomBytes(20).toString("hex");
  const query = `UPDATE employer SET resetPasswordToken = ?, resetPasswordExpiresAt = ? WHERE email = ?`;
  const values = [token, new Date.now() + 24 * 60 * 60 * 1000, email];
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve({ result, resetPasswordToken: token });
    });
  });
}

async function resetPasswordCompany(token, password) {
  const query = `SELECT * FROM employer WHERE resetPasswordToken = ? AND resetPasswordExpiresAt > NOW()`;
  const values = [token];
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, result) => {
      if (error) {
        return reject(error);
      }
      if (result.length > 0) {
        const user = result[0];
        bcrypt.hash(password, 10, (hashError, hashedPassword) => {
          if (hashError) {
            return reject(hashError);
          }
          const updateQuery = `UPDATE employer SET password = ?, resetPasswordToken = ?, resetPasswordExpiresAt = ? WHERE resetPasswordToken = ?`;
          const updateValues = [hashedPassword, null, null, token];
          connection.query(
            updateQuery,
            updateValues,
            (updateError, updateResult) => {
              if (updateError) {
                return reject(updateError);
              }
              resolve(updateResult);
            }
          );
        });
      } else {
        resolve(null);
      }
    });
  });
}

module.exports = {
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
};

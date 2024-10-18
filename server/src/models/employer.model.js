const bcrypt = require("bcryptjs");
const connection = require("../config/db");
async function addCompany(
  email,
  password,
  companyName,
  companyDescription,
  contactNumber,
  virficationToken
) {
  const virficationTokenAt = new Date.now() + 15 * 60 * 1000;
  // Number of salt rounds for bcrypt
  const saltRounds = 10;

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const query = `INSERT INTO employer (email, password, companyName, companyDescription, contactNumber, virficationToken, virficationTokenAt) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    email,
    hashedPassword,
    companyName,
    companyDescription,
    contactNumber,
    virficationToken,
    virficationTokenAt,
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
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      }
      if (result.length > 0) {
        const company = result[0];
        bcrypt.compare(password, company.password, (err, res) => {
          if (res) {
            resolve(company);
          } else {
            resolve(null);
          }
        });
      } else {
        resolve(null);
      }
    });
  });
}

async function updateCompany(
  email,
  companyName,
  contactNumber,
  companyDescription
) {
  const query = `UPDATE employer SET companyName = ?, contactNumber=?, companyDescription=?  WHERE email = ?`;
  const values = [companyName, contactNumber, companyDescription, email];
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
  requiredSkills
) {
  const query = `INSERT INTO JobPosting (companyId, jobTitle, jobDescription, jobLocation, jobType, salary, requiredSkills) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    companyId,
    jobTitle,
    jobDescription,
    jobLocation,
    jobType,
    salary,
    requiredSkills,
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
  requiredSkills
) {
  const query = `UPDATE JobPosting SET jobTitle = ?, jobDescription = ?, jobLocation = ?, jobType = ?, salary = ?, requiredSkills = ? WHERE jobId = ?`;
  const values = [
    jobTitle,
    jobDescription,
    jobLocation,
    jobType,
    salary,
    requiredSkills,
    jobId,
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

async function removeJob(jobId) {
  const query = `DELETE FROM JobPosting WHERE jobId = ?`;
  const values = [jobId];
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}

async function fatchApplicants(jobId) {
  const query = `SELECT * FROM JobApplication WHERE jobId = ?`;
  const values = [jobId];
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
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
};

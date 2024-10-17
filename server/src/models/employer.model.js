const connection = require("../config/db");
async function addCompany(
  email,
  password,
  companyName,
  companyDescription,
  contactNumber
) {
  const query = `INSERT INTO employer (email, password, companyName, companyDescription, contactNumber) VALUES (?, ?, ?, ?, ?)`;
  const values = [
    email,
    password,
    companyName,
    companyDescription,
    contactNumber,
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
  const query = `SELECT * FROM employer WHERE email = ? AND password = ?`;
  const values = [email, password];
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
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

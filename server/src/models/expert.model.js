const connection = require("../config/db");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

async function addExpert(
  email,
  password,
  firstName,
  lastName, // fixed typo from 'lasName' to 'lastName'
  phone,
  verificationToken
) {
  // Number of salt rounds for bcrypt
  const saltRounds = 10;

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const query = `INSERT INTO experts (email, password, firstName, lastName, phone, verificationToken, verificationExpiresAt, loginTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    email,
    hashedPassword, // Use the hashed password
    firstName,
    lastName, // Use the correct name
    phone,
    verificationToken,
    Date.now() + 15 * 60 * 1000,
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

async function loginExpert(email, password) {
  const query = `SELECT * FROM experts WHERE email = ?`;
  const values = [email];

  return new Promise((resolve, reject) => {
    connection.query(query, values, async (error, result) => {
      if (error) {
        reject(error);
      }

      if (result.length > 0) {
        // Compare the provided password with the stored hashed password
        const expert = result[0];
        const passwordMatch = await bcrypt.compare(password, expert.password);

        if (passwordMatch) {
          // Remove the password before sending the expert data to the client
          delete expert.password;
          resolve(expert); // Password matches, return the expert data without the password
        } else {
          resolve(null); // Password doesn't match
        }
      } else {
        resolve(null); // No expert found with that email
      }
    });
  });
}

async function updateExpert(expertId, email, password, firstName, lastName) {
  const query = `UPDATE experts SET email = ?, firstName = ?, lastName = ? WHERE expertId = ?`;
  const values = [expertId, firstName, lastName, email];

  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}

async function fatchJobs() {
  const query = `SELECT * FROM JobPosting`;

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}

async function submitJob(expertId, jobId) {
  const query = `INSERT INTO JobApplication (expertId, jobId) VALUES (?, ?)`;
  const values = [expertId, jobId];

  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}

async function verifyExpert(expertId, token) {
  const query = `SELECT * FROM experts WHERE expertId = ? AND verificationToken = ?`;
  const values = [expertId, token];

  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      }

      if (result.length > 0) {
        const query = `UPDATE experts SET isVerified = 1 WHERE expertId = ?`;
        const values = [expertId];

        connection.query(query, values, (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(true);
        });
      } else {
        resolve(false);
      }
    });
  });
}

async function forgotPasswordExpert(email) {
  const token = crypto.randomBytes(20).toString("hex");
  const query = `UPDATE experts SET resetPasswordToken = ?, resetPasswordExpiresAt = ? WHERE email = ?`;
  const values = [token, new Date.now() + 24 * 60 * 60 * 1000, email];

  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}

async function resetPasswordExpert(token, password) {
  const query = `SELECT * FROM experts WHERE resetPasswordToken = ? AND resetPasswordExpiersAt > NOW()`;
  const values = [token];

  return new Promise((resolve, reject) => {
    connection.query(query, values, async (error, result) => {
      if (error) {
        reject(error);
      }

      if (result.length > 0) {
        const expert = result[0];
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `UPDATE experts SET password = ?, resetPasswordToken = NULL, resetPasswordTokenAt = NULL WHERE expertId = ?`;
        const values = [hashedPassword, expert.expertId];

        connection.query(query, values, (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(true);
        });
      } else {
        resolve(false);
      }
    });
  });
}

module.exports = {
  addExpert,
  loginExpert,
  updateExpert,
  fatchJobs,
  submitJob,
  verifyExpert,
  forgotPasswordExpert,
  resetPasswordExpert,
};

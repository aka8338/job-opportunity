const connection = require("../config/db"); 
const bcrypt = require("bcrypt");

async function addExpert(
  email,
  password,
  firstName,
  lastName,  // fixed typo from 'lasName' to 'lastName'
  phone
) {
  // Number of salt rounds for bcrypt
  const saltRounds = 10;
  
  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const query = `INSERT INTO experts (email, password, firstName, lastName, phone) VALUES (?, ?, ?, ?, ?)`;
  const values = [
    email,
    hashedPassword,  // Use the hashed password
    firstName,
    lastName,  // Use the correct name
    phone,
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
          resolve(expert); // Password matches, return the expert data
        } else {
          resolve(null); // Password doesn't match
        }
      } else {
        resolve(null); // No expert found with that email
      }
    });
  });
}

module.exports = {
  addExpert,
  loginExpert
};

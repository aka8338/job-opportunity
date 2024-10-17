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

module.exports = {
  addCompany,
};

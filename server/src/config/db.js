require("dotenv").config(); // Load the .env file

const { Sequelize } = require("sequelize");

// Use environment variables from the .env file
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    // logging: (msg) => {
    //   if (msg.includes("Executing") || msg.includes("SELECT")) {
    //     // Ignore SELECT queries and general SQL executions
    //     return;
    //   }
    //   console.log(msg);
    // },
  }
);

module.exports = sequelize;

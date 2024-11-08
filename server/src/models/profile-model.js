const sequelize = require("../config/db");
const Sequelize = require("sequelize");

const Profile = sequelize.define("Profile", {
  skills: {
    type: Sequelize.JSON, // Store skills as a JSON array
    allowNull: false,
  },

  certifications: {
    type: Sequelize.JSON, // Store certifications as a JSON array
    allowNull: true,
  },
});
module.exports = Profile;

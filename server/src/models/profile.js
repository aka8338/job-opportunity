const sequelize = require("../config/db");
const Sequelize = require("sequelize");

const Profile = sequelize.define('Profile', {
    skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),  // Store skills as an array of strings
        allowNull: false
    },

    certifications: {
        type: DataTypes.ARRAY(DataTypes.STRING),  // Store certifications as an array of strings
        allowNull: true
    },

    profilePicture: {
        type: DataTypes.STRING,  // URL or path to the profile picture
        allowNull: true
    }
});
module.exports = Profile;
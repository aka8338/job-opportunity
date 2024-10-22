const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Employer = sequelize.define(
  "Employer",
  {
    companyId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    companyName: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    contactNumber: {
      type: Sequelize.STRING(15),
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    companyDescription: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    loginTime: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    resetPasswordToken: {
      type: Sequelize.STRING(255),
    },
    resetPasswordExpiresAt: {
      type: Sequelize.DATE,
    },
    verificationToken: {
      type: Sequelize.STRING(255),
    },
    verificationExpiresAt: {
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: (employer) => {
        employer.verificationExpiresAt = new Date(
          new Date().getTime() + 15 * 60 * 1000
        ); // 15 minutes from now
      },
    },
  }
);

module.exports = Employer;

const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Expert = sequelize.define(
  "Experts",
  {
    expertId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
    },
    contactNumber: {
      type: Sequelize.STRING(15),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    profilePicture: {
    type: Sequelize.BLOB("long"), 
    allowNull: true,
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
      beforeCreate: (expert) => {
        expert.verificationExpiresAt = new Date(
          new Date().getTime() + 15 * 60 * 1000
        ); // 15 minutes from now
      },
    },
  }
);

module.exports = Expert;

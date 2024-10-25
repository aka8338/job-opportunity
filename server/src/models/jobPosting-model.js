const Sequelize = require("sequelize");
const sequelize = require("../config/db");
const Employer = require("./employer-model");

const JobPosting = sequelize.define("JobPosting", {
  jobId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  jobTitle: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  jobDescription: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  jobType: {
    type: Sequelize.ENUM("fulltime", "parttime", "contract", "internship"),
    allowNull: false,
  },
  jobLocation: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  jobSalary: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  jobExperience: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  jobSkills: {
    type: Sequelize.TEXT,
    allowNull: false,
  },

  jobLevel: {
    type: Sequelize.ENUM("entry", "intermediate", "senior"),
    allowNull: false,
  },
  companyId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Employer,
      key: "companyId",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});

JobPosting.belongsTo(Employer, { foreignKey: "companyId" });

module.exports = JobPosting;

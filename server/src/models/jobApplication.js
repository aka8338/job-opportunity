const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const JobApplication = sequelize.define(
  "JobApplication",
  {
    applicationId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    jobId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Job ID is required",
        },
        isInt: {
          msg: "Job ID must be an integer",
        },
      },
    },
    expertId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Expert ID is required",
        },
        isInt: {
          msg: "Expert ID must be an integer",
        },
      },
    },
    applicationStatus: {
      type: Sequelize.ENUM("applied", "shortlisted", "rejected"),
      defaultValue: "shortlisted",
    },
    resume: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isUrl: {
          msg: "Resume must be a valid URL",
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

JobApplication.associate = (models) => {
  JobApplication.belongsTo(models.Job, {
    foreignKey: "jobId",
    as: "job",
  });
  JobApplication.belongsTo(models.Expert, {
    foreignKey: "expertId",
    as: "expert",
  });
};

module.exports = JobApplication;

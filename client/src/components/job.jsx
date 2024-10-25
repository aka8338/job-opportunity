import PropTypes from "prop-types";
import AuthStore from "../store/AuthStore";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  const { isEmployer } = AuthStore();
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden my-6 flex justify-between flex-col">
      <div className="bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-300 p-4 flex flex-col items-stretch">
        {/* Job Title */}
        <h2 className="text-3xl font-bold text-gray-900">{job.jobTitle}</h2>
        {/* Company Name */}
        <p className="text-xl font-medium text-gray-700 mt-2 capitalize">
          <span className=" text-lime-500 font-semibold">Company:</span>{" "}
          {job.Employer.companyName}
        </p>
      </div>
      <div className="p-4 space-y-4 flex flex-col items-stretch">
        {/* Job Description */}
        <strong className="text-lg text-gray-800">
          <span className=" text-lime-500 font-semibold">Description:</span>{" "}
          {job.jobDescription}
        </strong>
        {/* Job Type */}
        <p className="text-lg text-gray-800 capitalize">
          <span className=" text-lime-500 font-semibold">Type:</span>{" "}
          {job.jobType}
        </p>
        {/* Job Location */}
        <p className="text-lg text-gray-800">
          <span className=" text-lime-500 font-semibold">Location:</span>{" "}
          {job.jobLocation}
        </p>
        {/* Job Salary */}
        <p className="text-green-600 text-lg">
          <span className=" text-lime-500 font-semibold">Salary:</span>{" "}
          {job.jobSalary}
        </p>
        {/* Job Experience */}
        <p className="text-lg text-gray-800">
          <span className=" text-lime-500 font-semibold">Experience:</span>{" "}
          {job.jobExperience}
        </p>
        {/* Job Skills */}
        <p className="text-lg text-gray-800">
          <span className=" text-lime-500 font-semibold">Skills:</span>{" "}
          {job.jobSkills}
        </p>
        {/* Job Level */}
        <p className="text-red-800 text-lg capitalize">
          <span className=" text-lime-500 font-semibold">Level:</span>{" "}
          {job.jobLevel}
        </p>
      </div>
      {/* Apply Button */}
      <div className="p-4 bg-gray-300 flex justify-center">
        <Link
          to={"/jobDetails"}
          className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-colors duration-300 w-full text-center block"
        >
          {isEmployer ? "View" : "Apply Now"}
        </Link>
      </div>
    </div>
  );
};

JobCard.propTypes = {
  job: PropTypes.shape({
    jobTitle: PropTypes.string.isRequired,
    Employer: PropTypes.object.isRequired,
    jobDescription: PropTypes.string.isRequired,
    jobType: PropTypes.string.isRequired,
    jobLocation: PropTypes.string.isRequired,
    jobSalary: PropTypes.string.isRequired,
    jobExperience: PropTypes.string.isRequired,
    jobSkills: PropTypes.string.isRequired,
    jobLevel: PropTypes.string.isRequired,
  }).isRequired,
};

export default JobCard;

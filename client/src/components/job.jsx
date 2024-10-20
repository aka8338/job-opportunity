import PropTypes from "prop-types";

const JobCard = ({ job }) => {
  return (
    <div className="max-w-sm mx-auto bg-gradient-to-r from-yellow-300 via-amber-200 to-orange-200 rounded-lg shadow-2xl overflow-hidden my-6 space-y-4">
      <div className="px-6 py-4 space-y-2">
        {/* Job Title */}
        <h2 className="text-2xl font-extrabold ">{job.title}</h2>
        {/* Company and Location */}
        <p className=" text-base">Company Name: {job.company}</p>
        <p className=" text-base">Location: {job.location}</p>
        {/* Salary */}
        <p className="text-green-600 text-base">Salary: {job.salary}</p>
        {/* Job Level */}
        <p className="text-red-800 text-base">Level: {job.level}</p>
      </div>

      <div className="px-6 pt-4 pb-2">
        {/* Job Type */}
        <span className="inline-block bg-white text-purple-800 text-xs px-3 py-1 rounded-lg mr-2 mb-2">
          Job Type: {job.type}
        </span>
      </div>

      {/* Apply Button */}
      <div className="px-6 py-4">
        <a
          href={job.applyLink}
          className="bg-white hover:bg-gray-800 text-purple-800 hover:text-white font-bold py-2 px-4 rounded-full shadow-lg transition-colors duration-300"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

JobCard.propTypes = {
  job: PropTypes.shape({
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    applyLink: PropTypes.string.isRequired,
  }).isRequired,
};

export default JobCard;

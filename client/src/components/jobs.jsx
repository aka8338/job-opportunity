import PropTypes from "prop-types";
import AuthStore from "../store/AuthStore";
import { useNavigate } from "react-router-dom";
import JobDetails from "./jobDetails";

const JobCard = ({ job, jobId }) => {
  const { isEmployer, deleteJob } = AuthStore();
  const navigate = useNavigate();
  const handleApply = () => {
    navigate(`/applyJob/${jobId}`);
  };

  const handleView = () => {
    navigate(`/applicantStatus/${jobId}`);
  };

  const handleDelete = () => {
    // delete job
    deleteJob(jobId);
  };

  const handleEdit = () => {
    navigate("/postJob", { state: { jobId } });
  };

  return (
    <div className="max-w-md mx-auto rounded-xl dark:bg-slate-100 shadow-md overflow-hidden my-6 flex justify-between flex-col">
      <div className="bg-gradient-to-r from-green-400 via-green-300 to-green-200 p-4 flex flex-col items-stretch">
        {/* Job Title */}

        <h2 className="text-3xl font-bold text-gray-900">{job.jobTitle}</h2>

        {/* Company Name */}
        <p className="text-xl font-medium text-gray-700 mt-2 capitalize">
          <span className=" text-purple-500 font-semibold">Company:</span>{" "}
          {job.Employer.companyName}
        </p>
      </div>
      <JobDetails job={job} />
      {/* Apply Button */}
      <div className="p-4 bg-green-300 flex justify-between">
        {isEmployer ? (
          <>
            <button
              onClick={handleView}
              className="bg-sky-400 hover:bg-sky-500 text-white font-bold py-3 px-4 rounded shadow transition-colors duration-300 text-center"
            >
              view
            </button>
            <button
              onClick={handleEdit}
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-4 rounded shadow transition-colors duration-300 text-center"
            >
              edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-400 hover:bg-red-500 text-white font-bold py-3 px-4 rounded shadow transition-colors duration-300 text-center"
            >
              delete
            </button>
          </>
        ) : (
          <button
            onClick={handleApply}
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-md shadow-md transition-colors duration-300 w-full text-center block"
          >
            Apply
          </button>
        )}
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
  jobId: PropTypes.number.isRequired,
};

export default JobCard;

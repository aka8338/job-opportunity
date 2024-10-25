import { useEffect } from "react";
import JobCard from "../components/job";
import SearchJob from "../components/Search";
import AuthStore from "../store/AuthStore";

const Dashboard = () => {
  const { jobs, getJobs } = AuthStore();

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-gray-800 p-4">
      <SearchJob />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <JobCard key={job.jobId} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

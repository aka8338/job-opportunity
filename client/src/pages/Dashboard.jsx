import JobCard from "../components/job";
import SearchJob from "../components/Search";
const Dashboard = () => {
  const jobs = [
    {
      title: "Frontend Developer",
      company: "Tech Innovators",
      location: "New York, NY",
      type: "Full-Time",
      salary: "$80,000 - $100,000",
      level: "Entry-level",
      applyLink: "#",
    },
    {
      title: "Backend Developer",
      company: "Cloud Masters",
      location: "San Francisco, CA",
      type: "Part-Time",
      salary: "$70,000 - $90,000",
      level: "Senior",
      applyLink: "#",
    },
    {
      title: "UI/UX Designer",
      company: "Creative Solutions",
      location: "Austin, TX",
      type: "Contract",
      salary: "$60,000 - $75,000",
      level: "Mid-level",
      applyLink: "#",
    },
    {
      title: "DevOps Engineer",
      company: "Server Gurus",
      location: "Seattle, WA",
      type: "Full-Time",
      salary: "$90,000 - $120,000",
      level: "Senior",
      applyLink: "#",
    },
    {
      title: "Data Scientist",
      company: "Data Insights",
      location: "Boston, MA",
      type: "Full-Time",
      salary: "$100,000 - $130,000",
      level: "Mid-level",
      applyLink: "#",
    },
    {
      title: "Mobile App Developer",
      company: "App Creators",
      location: "Los Angeles, CA",
      type: "Part-Time",
      salary: "$85,000 - $110,000",
      level: "Entry-level",
      applyLink: "#",
    },
  ];

  return (
    <div className="bg-gray-800 p-4">
      <SearchJob />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

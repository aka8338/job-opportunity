import { useState } from "react";

const JobDetails = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const applicants = {
    shortlisted: ["Alice", "Bob", "Charlie"],
    accepted: ["David", "Eve"],
    rejected: ["Frank", "Grace"],
  };

  const handleClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="space-x-4 mb-6">
        <button
          onClick={() => handleClick("shortlisted")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Shortlisted
        </button>
        <button
          onClick={() => handleClick("accepted")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Accepted
        </button>
        <button
          onClick={() => handleClick("rejected")}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Rejected
        </button>
      </div>

      {selectedCategory && (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h3 className="text-xl font-semibold mb-4">
            {selectedCategory.charAt(0).toUpperCase() +
              selectedCategory.slice(1)}{" "}
            Applicants
          </h3>
          <ul className="list-disc list-inside">
            {applicants[selectedCategory].map((applicant, index) => (
              <li key={index} className="text-gray-700">
                {applicant}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobDetails;

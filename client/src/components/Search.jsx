import { Search, CircleX, MapPin, Building } from "lucide-react";
import AuthStore from "../store/AuthStore";
import { useState } from "react";
function SearchJob() {
  const { isEmployer } = AuthStore();
  const [searchParams, setSearchParams] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    type: "All",
    level: "All",
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  return (
    <div className="grid gap-10 rounded-xl bg-gray-400 py-4 px-2">
      <form action="">
        <div className="flex justify-between items-center gap-3 bg-gray-200 shadow-lg p-5 rounded-lg shadow-gray-600">
          <div className="flex gap-2 items-center">
            <Search className="cursor-pointer text-[25px]" />
            <input
              type="text"
              name="jobTitle"
              value={searchParams.jobTitle}
              onChange={onChange}
              className="bg-transparent w-full focus:outline-none"
              placeholder="Search Job title here..."
            />
            {!isEmployer && (
              <CircleX className="text-[30px] hover:text-gray-800 cursor-pointer" />
            )}
          </div>
          {!isEmployer && (
            <div className="flex gap-2 items-center">
              <Building className="cursor-pointer text-[25px]" />
              <input
                type="text"
                name="companyName"
                value={searchParams.companyName}
                onChange={onChange}
                className="bg-transparent w-full focus:outline-none"
                placeholder="Search by Company..."
              />
              <CircleX className="text-[30px] hover:text-gray-800 cursor-pointer" />
            </div>
          )}
          {!isEmployer && (
            <div className="flex gap-2 items-center">
              <MapPin className="cursor-pointer text-[25px]" />
              <input
                type="text"
                name="location"
                value={searchParams.location}
                onChange={onChange}
                className="bg-transparent w-full focus:outline-none"
                placeholder="Search by Location..."
              />
              <CircleX className="text-[30px] hover:text-gray-800 cursor-pointer" />
            </div>
          )}

          <button className="px-10 rounded-xl bg-amber-600 h-full p-2 text-white">
            Search
          </button>
        </div>
      </form>

      <div className="flex gap-10 justify-center items-center">
        <div className="flex gap-2 items-center">
          <label className="text-semibold" htmlFor="type">
            Type:
          </label>
          <select
            name="type"
            id="type"
            value={searchParams.type}
            onChange={onChange}
            className="bg-gray-100 px-4 py-1 rounded-md"
          >
            <option>All</option>
            <option>internship</option>
            <option>fulltime</option>
            <option>contract</option>
            <option>parttime</option>
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <label className="text-semibold" htmlFor="level">
            Level:
          </label>
          <select
            name="level"
            value={searchParams.level}
            onChange={onChange}
            id="level"
            className="bg-gray-100 px-4 py-1 rounded-md"
          >
            <option>All</option>
            <option>Entry</option>
            <option>intermediate</option>
            <option>Senior</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchJob;

import { Search, CircleX, MapPin, Building, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthStore from "../store/AuthStore";
function SearchJob() {
  const [searchParams, setSearchParams] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    type: "All",
    level: "All",
  });
  const { isEmployer } = AuthStore();
  const onChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="grid gap-10 rounded-xl bg-gray-500 py-4 text-white px-2">
      <form action="">
        <div className="flex justify-between items-center gap-3 bg-gray-400 text-black shadow-lg p-5 rounded-lg shadow-gray-600">
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
            <CircleX className="text-[30px] hover:text-gray-800 cursor-pointer" />
          </div>
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
          <button
            className="px-10 rounded-xl bg-amber-600 h-full p-2 text-white"
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>
      </form>

      <div className="flex gap-10 justify-center items-center text-black">
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
      {isEmployer && (
        <Link className="flex justify-center mt-5" to={"/postJob"}>
          <span className="text-md font-bold p-2 underline">
            Post a New Job
          </span>
          <button className="p-2 mx-4 rounded-xl bg-green-600 text-black hover:bg-green-300">
            <Plus />
          </button>
        </Link>
      )}
    </div>
  );
}

export default SearchJob;

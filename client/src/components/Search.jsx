import { Search, CircleX, MapPin, Building } from "lucide-react";
function SearchJob() {
  return (
    <div className="grid gap-10 rounded-xl bg-gray-400 py-4 px-2">
      <form action="">
        <div className="flex justify-between items-center gap-3 bg-gray-200 shadow-lg p-5 rounded-lg shadow-gray-600">
          <div className="flex gap-2 items-center">
            <Search className="cursor-pointer text-[25px]" />
            <input
              type="text"
              className="bg-transparent w-full focus:outline-none"
              placeholder="Search Job here..."
            />
            <CircleX className="text-[30px] hover:text-gray-800 cursor-pointer" />
          </div>
          <div className="flex gap-2 items-center">
            <Building className="cursor-pointer text-[25px]" />
            <input
              type="text"
              className="bg-transparent w-full focus:outline-none"
              placeholder="Search by Company..."
            />
            <CircleX className="text-[30px] hover:text-gray-800 cursor-pointer" />
          </div>
          <div className="flex gap-2 items-center">
            <MapPin className="cursor-pointer text-[25px]" />
            <input
              type="text"
              className="bg-transparent w-full focus:outline-none"
              placeholder="Search by Location..."
            />
            <CircleX className="text-[30px] hover:text-gray-800 cursor-pointer" />
          </div>

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
            name=""
            id="type"
            className="bg-gray-100 px-4 py-1 rounded-md"
          >
            <option>Full-time</option>
            <option>Remote</option>
            <option>Contract</option>
            <option>Part-time</option>
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <label className="text-semibold" htmlFor="level">
            Level:
          </label>
          <select
            name=""
            id="level"
            className="bg-gray-100 px-4 py-1 rounded-md"
          >
            <option>Entry</option>
            <option>Mid</option>
            <option>Senior</option>
            <option>Lead</option>
          </select>
        </div>
        <span className="cursor-pointer">clear All</span>
      </div>
    </div>
  );
}

export default SearchJob;

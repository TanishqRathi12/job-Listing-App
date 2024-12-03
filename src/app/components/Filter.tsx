import React from "react";
import { FiSearch } from "react-icons/fi";
import { MdLocationOn, MdGpsFixed } from "react-icons/md";

const Filter: React.FC = () => {
  return (
    <div className="flex flex-col px-4 pt-4 space-y-4 md:flex-row md:space-x-4 md:space-y-0 md:px-48 lg:pr-96">
      <div className="flex items-center p-4 gap-3 border rounded-lg border-gray-300 flex-1">
        <FiSearch size={24} className="text-blue-600" />
        <input
          type="text"
          placeholder="Search by Job title, Position, Keyword..."
          className="flex-1 border border-transparent focus:outline-none text-sm md:text-base"
        />
      </div>
      <div className="flex items-center p-4 gap-3 border rounded-lg border-gray-300 flex-1">
        <MdLocationOn size={24} className="text-blue-600" />
        <input
          type="text"
          placeholder="City, state or country"
          className="flex-1 border border-transparent focus:outline-none text-sm md:text-base"
        />
        <MdGpsFixed size={24} className="text-gray-600 hidden md:block" />
        <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 text-sm md:text-base">
          Find Job
        </button>
      </div>
    </div>
  );
};

export default Filter;

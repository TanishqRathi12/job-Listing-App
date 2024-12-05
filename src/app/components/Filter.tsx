import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { MdLocationOn, MdGpsFixed } from "react-icons/md";

interface FilterProps {
  onFilterChange: (filters: { keyword: string; location: string }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  // Function to fetch user's location (country) based on IP address
  const getLocationFromIP = async () => {
    try {
      const response = await fetch("http://ip-api.com/json/");
      const data = await response.json();
      if (data && data.country) {
        setLocation(data.country); // Set the location to the user's country
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleGpsClick = () => {
    getLocationFromIP(); // Fetch the location again when GPS button is clicked
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ keyword, location });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col px-4 pt-4 space-y-4 md:flex-row md:space-x-4 md:space-y-0 lg:px-48 lg:pr-96"
    >
      <div className="flex items-center p-4 gap-3 border rounded-lg border-gray-300 flex-1">
        <FiSearch size={24} className="text-blue-600" />
        <input
          type="text"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="Search by Job title, Position, Keyword..."
          className="flex-1 border border-transparent focus:outline-none text-sm md:text-base"
        />
      </div>
      <div className="flex items-center p-4 gap-3 border rounded-lg border-gray-300 flex-1">
        <MdLocationOn size={24} className="text-blue-600" />
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="City, state or country"
          className="flex-1 border border-transparent focus:outline-none text-sm md:text-base"
        />
        <div className="flex items-center gap-2">
        <button
            type="button"
            onClick={handleGpsClick}
            className="p-2 rounded-full hover:bg-gray-200 hover:"
          >
          <MdGpsFixed size={24} className="text-gray-600" />
          
          </button>
        </div>
        <button
          type="submit"
          className="px-2 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 text-sm md:text-base"
        >
          Find Job
        </button>
      </div>
    </form>
  );
};

export default Filter;

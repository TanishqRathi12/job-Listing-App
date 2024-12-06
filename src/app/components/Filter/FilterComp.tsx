import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdLocationOn, MdGpsFixed } from "react-icons/md";
import { toast } from "react-toastify";

interface FilterProps {
  onFilterChange: (filters: { keyword: string; location: string }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  // Function to fetch user location latitude and longitude via Geolocation 
  const getLocationFromGPS = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Reverse geocode the coordinates to get country name
          fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.NEXT_PUBLIC_GEOCODE_API_KEY}`
          )
            .then((response) => response.json())
            .then((data) => {
           //  console.log(data);
              if (data.results && data.results.length > 0) {
                const country = data.results[0].components.country;
                if (country) {
                  setLocation(country); // Set location to the country name
                  toast.success(`Location fetched: ${country}`, {
                    position: "top-right",
                    autoClose: 500,
                  });
                }
              } else {
                toast.error("Could not retrieve country", {
                  position: "top-right",
                  autoClose: 500,
                });
              }
            })
            .catch((error) => {
              console.error("Error with reverse geocoding:", error);
              toast.error("Failed to fetch location from GPS", {
                position: "top-right",
                autoClose: 500,
              });
            });
        },
        (error) => {
          console.error("Error fetching location:", error);
          toast.error("Failed to fetch location from GPS", {
            position: "top-right",
            autoClose: 500,
          });
        }
      );
    } else {
      toast.error("Geolocation not supported", {
        position: "top-right",
        autoClose: 500,
      });
    }
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value); 
  };

  const handleGpsClick = () => {
    getLocationFromGPS(); // Fetch location using the Geolocation 
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
      <div className="flex items-center p-4 gap-1 border rounded-lg border-gray-300 flex-1">
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
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <MdGpsFixed size={24} className="text-gray-600" />
          </button>
        </div>
        <button
          type="submit"
          className="px-3 py-2  text-white bg-blue-700 rounded-md hover:bg-blue-800 text-sm md:text-base sm:px-6 sm:py-3"
        >
          Find Job
        </button>
      </div>
    </form>
  );
};

export default Filter;

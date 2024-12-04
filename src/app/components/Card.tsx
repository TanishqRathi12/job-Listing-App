import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
useState

interface CardProps {
  title: string;
  salary: string;
  isRemote: string;
  location?: string;
  company?: string;
  Logo?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  salary,
  isRemote,
  company,
  location,
  Logo,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // bookmark
  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };
  return (
    <div className="p-4 bg-white border rounded-md shadow transition-all duration-200 hover:shadow-lg hover:bg-gradient-to-r hover:from-yellow-100 hover:to-white">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <span className="inline-block px-2 py-1 mt-2 text-xs text-green-600 bg-green-100 rounded-md">
         {isRemote}
        </span>
      <p className="mt-2 text-gray-600">Salary: {salary}</p>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center">
        <img
          src={Logo || "/Google.png"}
          alt={company}
          className="w-7 h-7 mr-2"
        />
        <div>
          <p className="text-sm font-medium text-gray-700">
            {company || "Google Inc."}
          </p>
          <p className="text-xs text-gray-500">
            {location && location == "REMOTE" ? "" : location }
          </p>
        </div>
        </div>
        <button
          onClick={toggleBookmark}
          className="text-gray-500 hover:text-gray-700"
        >
          {isBookmarked ? (
            <FaBookmark size={20} className="text-yellow-500" />
          ) : (
            <FaRegBookmark size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Card;

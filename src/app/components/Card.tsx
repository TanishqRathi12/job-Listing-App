import React, { useState, useEffect } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

interface CardProps {
  title: string;
  salary: string;
  isRemote: string;
  location: string;
  company: string;
  Logo: string;
  id: string;
  companyUrl: string;
}

const Card: React.FC<CardProps> = ({
  title,
  salary,
  isRemote,
  company,
  location,
  Logo,
  id,
  companyUrl,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setIsBookmarked(bookmarks.includes(id));
  }, [id]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    let updatedBookmarks;
    if (bookmarks.includes(id)) {
      updatedBookmarks = bookmarks.filter(
        (bookmark: string) => bookmark !== id
      );
      toast.dark("Bookmark removed", {
        position: "top-right",
        autoClose: 1000,
      });
    } else {
      updatedBookmarks = [...bookmarks, id]; // If not bookmarked, add to bookmarks
      toast.success("Bookmark added", {
        position: "top-right",
        autoClose: 1000,
      });
    }
    // Update localStorage and component state
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    setIsBookmarked(!isBookmarked);
  };
  const getPlaceholderImage = (company: string) => {
    const firstLetter = company.charAt(0).toUpperCase();
    return `https://via.placeholder.com/50/eeeeee/000000?text=${firstLetter}`;
  };

  return (
    <div className="p-4 bg-white border rounded-md shadow transition-all duration-200 hover:shadow-lg hover:bg-gradient-to-r hover:from-yellow-50 hover:to-white">
      <a href={companyUrl} target="_blank" rel="noreferrer">
        <h3 className="text-lg text-black  hover:underline">
          {title}
        </h3>
      </a>
      <div className="flex items-center gap-1">
        <span className="inline-block px-1.5 py-1 mt-2 text-xs font-bold text-green-600 bg-green-100 rounded-sm">
          {isRemote}
        </span>
        <p className="mt-2 text-gray-500 text-s">Salary: {salary}</p>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1">
          <img
            src={Logo || getPlaceholderImage(company)}
            alt={company}
            className="w-8 h-8 mr-2 object-scale-down"
          />
          <div>
            <p className="text-sm font-medium text-gray-700">{company}</p>
            <div className=" flex items-center gap-1">
              {location !== "REMOTE" ? (
                <img src="/MapPin.png" alt="" className="w-4 h-4" />
              ) : (
                ""
              )}
              <p className="text-xs text-gray-500">
                {location === "REMOTE" ? "" : location}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={toggleBookmark}
          className="text-gray-400 hover:text-gray-700"
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

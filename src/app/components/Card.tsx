import React from 'react';

interface CardProps {
  title: string;
  salary: string;
  location: string;
  isRemote: boolean;
  country?: string;
  company?: string;
    Logo?: string;
}

const Card: React.FC<CardProps> = ({ title, salary, location, isRemote, company, country , Logo}) => {
  return (
    <div className="p-4 bg-white border rounded-md shadow transition-all duration-200 hover:shadow-lg hover:bg-gradient-to-r hover:from-yellow-100 hover:to-white">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {isRemote && (
        <span className="inline-block px-2 py-1 mt-2 text-xs text-green-600 bg-green-100 rounded-md">
          REMOTE
        </span>
      )}
      <p className="mt-2 text-gray-600">Salary: {salary}</p>
      <div className="flex items-center mt-3">
        <img
          src={Logo || '/Google.png'}
          alt={company}
          className="w-7 h-7 mr-2"
        />
        <div>
          <p className="text-sm font-medium text-gray-700">{company || "Google Inc."}</p>
          <p className="text-xs text-gray-500">{country}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;

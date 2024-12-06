import Image from 'next/image';
import React from 'react';


interface NoJobsFoundProps {
  message?: string;
  iconUrl?: string;
}

const NoJobsFound: React.FC<NoJobsFoundProps> = ({ message = "No jobs found", iconUrl }) => {
  return (
    <div className="flex justify-center items-center flex-col p-8 mt-12 bg-white border border-gray-200 rounded-lg shadow-lg">
      {iconUrl && (
        <div className="mb-4">
          <Image src={iconUrl} width={500} height={500} alt="No jobs found icon" className="w-16 h-16 object-contain" />
        </div>
      )}
      <div className="text-center text-xl font-semibold text-gray-800">
        {message}
      </div>
    </div>
  );
};

export default NoJobsFound;

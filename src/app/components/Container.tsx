import React, { useEffect, useState } from "react";
import Card from "./Card";
import { fetchJobData } from "./FetchJobData";

const JobContainer: React.FC = () => {
  const [jobData, setJobData] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching job data and handling success
        const data = await fetchJobData("https://remote-jobs.remote-jobs-legacy.workers.dev/jobs?offset=50");
        setJobData(data); // Set job data directly
      } catch (error) {
        console.error("Error fetching job data:", error); // Log any errors that occur
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Return loading state if still loading
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-16 lg:px-48 py-8 sm:py-12 lg:py-16 bg-white rounded-md shadow-md">
      {jobData.map((job, index) => (
        <Card
          key={index} // Unique key for each Card component
          title={job.title}
          salary={job.baseSalary}
          location={job?.location}
          isRemote={job.jobLocation}
          country={job.addressCountry}
          company={job.companyName}
          Logo={job.companyLogo}
        />
      ))}
    </div>
  );
};

export default JobContainer;

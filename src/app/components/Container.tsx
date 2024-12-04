import React, { useEffect, useState } from "react";
import Card from "./Card";
import { fetchJobData } from "./FetchJobData";
import Loading from "./Loading";

const JobContainer: React.FC = () => {
  const [jobData, setJobData] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching job data and handling success
        const data = await fetchJobData("https://remote-jobs.remote-jobs-legacy.workers.dev/jobs?offset=1");
        //console.log(data)
        setJobData(data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return <Loading/>; // Return loading state
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-16 lg:px-48 py-8 sm:py-12 lg:py-16 bg-white rounded-md shadow-md">
      {jobData.map((job, index) => (
        <Card
          key={index} 
          title={job.title}
          salary={job.salary}
          location={job?.location}
          isRemote={job?.location}
          country={job?.location}
          company={job.companyName}
          Logo={job.companyLogo.url}
        />
      ))}
    </div>
  );
};

export default JobContainer;

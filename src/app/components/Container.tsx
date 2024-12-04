import React, { useState, useCallback, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Card";
import Loading from "./Loading";
import { fetchJobData } from "./FetchJobData";
import Filter from "./Filter";


interface Job {
  title: string;
  salary: string;
  isRemote?: string;
  location: string;
  companyName: string;
  companyLogo: {
    url: string;
  };
  keywords: string[]; // Array of keywords
}

// Function to fetch job data from an API with filters and pagination
const fetchData = async ({ pageParam = 1}: { pageParam: number }): Promise<Job[]> => {
  const offset = (pageParam - 1) * 20 + 1;
  let url = `${process.env.NEXT_PUBLIC_URL}?offset=${offset}`;

  // Fetch the job data from the API
  const jobs = await fetchJobData(url);
  return jobs;
};

const Container: React.FC = () => {
  // to store filter values
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
  });


  // Handle filter change (update the filters state)
  const onFilterChange = useCallback((newFilters: { keyword: string; location: string }) => {
    setFilters(newFilters);
  }, []);

  // Fetching job data 
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery<Job[], Error>({
    queryKey: ["jobs", filters], // Dependency on filters
    queryFn: async ({ pageParam = 1 }) => fetchData({ pageParam : pageParam as number }),
    initialPageParam: 1, // Starting page for the query
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length > 0 ? pages.length + 1 : undefined;   // Determine if there's another page 
    },
    enabled: true, // filters are optional
  });

  // loading and error states
  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  const allJobs = data?.pages.flat() || []; // Flatten the pages array

  // jobs based on the keyword in the "keywords" field
  const filteredJobs = allJobs.filter((job) => {
    const matchesKeyword = filters.keyword
      ? job.keywords.some((keyword) => keyword.toLowerCase().includes(filters.keyword.toLowerCase()))
      : true;
    const matchesLocation = filters.location
      ? job.location.toLowerCase().includes(filters.location.toLowerCase())
      : true; // If no location filter, allow all jobs

    return matchesKeyword && matchesLocation;
  });

  // Return the JSX layout
  return (
    <>
      <Filter onFilterChange={onFilterChange} />
      <InfiniteScroll
        dataLength={filteredJobs.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<Loading />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-16 lg:px-48 py-8 sm:py-12 lg:py-16 bg-white rounded-md shadow-md">
          { 
            filteredJobs.map((job, index) => (
              <Card
                key={index}
                title={job.title}
                salary={job.salary}
                isRemote={job?.location}  
                location={job?.location}
                company={job.companyName}
                Logo={job.companyLogo?.url}
              />
            ))
          }
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Container;

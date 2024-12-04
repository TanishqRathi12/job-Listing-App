import React, { useState, useCallback, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Card";
import Loading from "./Loading";
import { fetchJobData } from "./FetchJobData";
import Filter from "./Filter";
import { toast } from "react-toastify";

interface Job {
  title: string;
  salary: string;
  isRemote?: string;
  location: string;
  companyName: string;
  companyUrl: string;
  companyLogo: {
    url: string;
  };
  id: string;
  keywords: string[]; // Array of keywords
}

// Function to fetch job data from an API with filters and pagination
const fetchData = async ({ pageParam = 1 }: { pageParam: number }): Promise<Job[]> => {
  const offset = (pageParam - 1) * 20 + 1;
  let url = `${process.env.NEXT_PUBLIC_URL}?offset=${offset}`;

  // Fetch the job data from the API
  const jobs = await fetchJobData(url);
  return jobs;
};

const Container: React.FC = () => {
  // to store filter values
  const [filters, setFilters] = useState({
    keyword: "", // initially no filter
    location: "",
  });

  // Handle filter change (update the filters state)
  const onFilterChange = useCallback(
    (newFilters: { keyword: string; location: string }) => {
      setFilters(newFilters);
      toast.success("Filter Applied", {
        position: "top-right",
        autoClose: 2000,
      });
    },
    []
  );

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
      return lastPage.length > 0 ? pages.length + 1 : undefined; // Determine if there's another page
    },
    enabled: true, // without filter on initial load
  });

  // Loading and error states
  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error?.message}</div>;

  const allJobs = data?.pages.flat() || []; // converting nested array to single array

  const filteredJobs = allJobs.filter((job) => {   // Filter 
    const searchKeyword = filters.keyword.toLowerCase();

    const matchesKeyword =
      searchKeyword
        ? job.keywords.some((keyword) => keyword.toLowerCase().includes(searchKeyword)) ||  //filter by keyword 
          job.salary.toLowerCase().includes(searchKeyword) ||                                //filter by salary
          job.title.toLowerCase().includes(searchKeyword)                                    //filter by title
        : true;

    const matchesLocation = filters.location
      ? job.location.toLowerCase().includes(filters.location.toLowerCase())  // filter by location
      : true;

    return matchesKeyword && matchesLocation;
  });

  // Ensure filteredJobs is not empty
  if (filteredJobs.length === 0) {
    return <div>No jobs found</div>;
  }

  return (
    <>
      <Filter onFilterChange={onFilterChange} />
      <InfiniteScroll
        dataLength={filteredJobs.length} // This is the current length of the list
        next={fetchNextPage} // Function to fetch the next page of data
        hasMore={!!hasNextPage} // Check if there are more pages
        loader={<Loading />} // Show loading component while fetching data
        endMessage={<p>No more jobs</p>} // Message when no more data is available
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-16 lg:px-48 py-8 sm:py-12 lg:py-16 bg-white rounded-md shadow-md">
          {filteredJobs.map((job,index) => (
            <Card
              key={index} // Use unique key for rendering
              id={job.companyUrl}
              title={job.title}
              salary={job.salary}
              isRemote={job.location} // Ensure isRemote is passed as needed
              location={job.location}
              company={job.companyName}
              Logo={job.companyLogo?.url}
            />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Container;

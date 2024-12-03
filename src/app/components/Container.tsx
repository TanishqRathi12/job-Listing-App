import React from "react";
import Card from "./Card";

const jobList = [
  {
    title: "Technical Support Specialist",
    salary: "$20,000 - $25,000",
    location: "Dhaka, Bangladesh",
    isRemote: true,
  },
  {
    title: "Senior UX Designer",
    salary: "$20,000 - $25,000",
    location: "Dhaka, Bangladesh",
    isRemote: true,
  },
  {
    title: "Senior UX Designer",
    salary: "$20,000 - $25,000",
    location: "Dhaka, Bangladesh",
    isRemote: true,
  },
  {
    title: "Senior UX Designer",
    salary: "$20,000 - $25,000",
    location: "Dhaka, Bangladesh",
    isRemote: true,
  },
  {
    title: "Senior UX Designer",
    salary: "$20,000 - $25,000",
    location: "Dhaka, Bangladesh",
    isRemote: true,
  },
  {
    title: "Senior UX Designer",
    salary: "$20,000 - $25,000",
    location: "Dhaka, Bangladesh",
    isRemote: true,
  },
  {
    title: "Senior UX Designer",
    salary: "$20,000 - $25,000",
    location: "Dhaka, Bangladesh",
    isRemote: true,
  },
  {
    title: "Senior UX Designer",
    salary: "$20,000 - $25,000",
    location: "Dhaka, Bangladesh",
    isRemote: true,
  },
  {
    title: "Senior UX Designer",
    salary: "$20,000 - $25,000",
    location: "Dhaka, Bangladesh",
    isRemote: true,
  },
  {
    title: "Senior UX Designer",
    salary: "$20,000 - $25,000",
    location: "Dhaka, Bangladesh",
    isRemote: true,
  },
  {
    title: "Senior UX Designer",
    salary: "$20,000 - $25,000",
    location: "Dhaka, Bangladesh",
    isRemote: true,
  },
  {
    title: "Senior UX Designer",
    salary: "$20,000 - $25,000",
    location: "Dhaka, Bangladesh",
    isRemote: true,
  },
  {
    title: "Senior UX Designer",
    salary: "$20,000 - $25,000",
    location: "Dhaka, Bangladesh",
    isRemote: true,
  },
  {
    title: "Senior UX Designer",
    salary: "$20,000 - $25,000",
    location: "Dhaka, Bangladesh",
    isRemote: true,
  },
  {
    title: "Senior UX Designer",
    salary: "$20,000 - $25,000",
    location: "Dhaka, Bangladesh",
    isRemote: true,
  },
  {
    title: "Senior UX Designer",
    salary: "$20,000 - $25,000",
    location: "Dhaka, Bangladesh",
    isRemote: true,
  },
  {
    title: "Senior UX Designer",
    salary: "$20,000 - $25,000",
    location: "Dhaka, Bangladesh",
    isRemote: true,
    company: "Tanishq Inc.",
    Logo: "https://expirify-front-end.vercel.app/tanishq.jpg"
  },
];

const JobContainer: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-16 lg:px-48 py-8 sm:py-12 lg:py-16 bg-white rounded-md shadow-md">
      {jobList.map((job, index) => (
        <Card
          key={index}
          title={job.title}
          salary={job.salary}
          location={job.location}
          isRemote={job.isRemote}
          company={job.company}
          Logo={job.Logo}
        />
      ))}
    </div>
  );
};

export default JobContainer;

import React from "react";
import JobCard from "../components/reusable/JobCard";
import { useGetJobsQuery } from "../features/job/jobApi";

const Jobs = () => {
  const { data, isError, isLoading } = useGetJobsQuery()

  return (
    <div className='pt-14'>
      <div className='bg-primary/10 p-5 rounded-2xl'>
        <h1 className='font-semibold text-xl'>Find Jobs</h1>
      </div>
      <div className='mb-10 flex justify-end gap-5'>
        <button
          className={`border px-3 py-2 rounded-full font-semibold `}
        >
          In Stock
        </button>
        <button
          className={`border px-3 py-2 rounded-full font-semibold `}>
          AMD
        </button>
        <button
          className={`border px-3 py-2 rounded-full font-semibold`}>
          Intel
        </button>
      </div>
      <div className='grid grid-cols-2 gap-5 mt-5'>
        {
          data?.data?.map(jobData => <JobCard jobData={jobData}></JobCard>)
        }
      </div>
    </div>
  );
};

export default Jobs;

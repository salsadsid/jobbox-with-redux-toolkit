import React from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";
import Loading from "../../components/reusable/Loading";
import { toggleAscending, toggleDecending } from "../../features/filterSlice/filterSlice";
import { useGetAppliedJobsAscendingQuery, useGetAppliedJobsDecendingQuery, useGetAppliedJobsQuery } from "../../features/job/jobApi";

const AppliedJobs = () => {
  const dispatch = useDispatch()
  const {
    user: { email },
  } = useSelector((state) => state.auth);
  const { ascending, decending } = useSelector(state => state.filter)
  const { data, isLoading } = useGetAppliedJobsQuery(email);
  const { data: dataAscending } = useGetAppliedJobsAscendingQuery(email)
  const { data: dataDecending } = useGetAppliedJobsDecendingQuery(email)
  const activeClass = "text-white bg-orange-300 border-white";
  if (isLoading) {
    return <Loading />;
  }
  let content;
  if (data) {
    content = data?.data?.map((job) => (
      <JobCard jobData={job} />
    ))
  }
  if (ascending) {
    content = "";
    content = dataAscending?.data?.map((job) => (
      <JobCard jobData={job} />
    ))
  }
  if (decending) {
    content = "";
    content = dataDecending?.data?.map((job) => (
      <JobCard jobData={job} />
    ))
  }
  return (
    <div>
      <h1 className='text-xl py-5'>Applied jobs</h1>
      <div className='mb-10 flex justify-end gap-5'>
        <p
          className={` px-3 py-2 font-semibold `}
        >
          Sort By Date:
        </p>
        <button onClick={() => dispatch(toggleAscending())}
          className={`border px-3 py-2 rounded-full font-semibold ${ascending ? activeClass : null}`}>
          Ascending
        </button>
        <button onClick={() => dispatch(toggleDecending())}
          className={`border px-3 py-2 rounded-full font-semibold ${decending ? activeClass : null}`}>
          Decending
        </button>
      </div>
      <div className='grid grid-cols-2 gap-5 pb-5'>
        {content}
      </div>
    </div>
  );
};

export default AppliedJobs;

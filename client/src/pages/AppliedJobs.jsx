import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import JobSkeleton from '../components/skeletons/JobSkeleton';
import { UseJobStore } from "../store/UseJobStore";

function AppliedJobs() {
  const navigate = useNavigate();
  const { getAppliedJobs, isLoading, appliedJobs } = UseJobStore();

  useEffect(() => {
    getAppliedJobs();
  }, [getAppliedJobs]);
  
  return (
    <div className={"h-screen container mx-auto sm:px-4 py-4 "}>
      <div >
        <div className="px-4 md:hidden lg:hidden " >
        <Header name={"Applied Jobs"} />
        </div>
        <div>
          {isLoading ? (
            <JobSkeleton />
          ) : Array.isArray(appliedJobs?.response) && appliedJobs?.response.length > 0 ? (
            appliedJobs?.response.map((data, index) => (
              <div key={data._id || index} className="p-4 mb-2 hover:bg-gray-400 cursor-pointer " onClick={() => navigate(`/jobDetail/${data.jobId?._id}`) } >
                <div>
                  <h1 className="text-lg font-semibold">{data.jobId?.jobTitle}</h1>
                  <p className="text-gray-600">
                    Applied on {new Date(data.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">As a {data.jobId?.role}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Did not apply to any jobs yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppliedJobs;

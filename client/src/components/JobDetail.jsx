import { ArrowLeft, IndianRupee } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UseJobStore } from "../store/UseJobStore";
import { UseAuthStore } from "../store/UserStore";
import Apply from "./Apply";
import JobSkeleton from "./skeletons/JobSkeleton";

function JobDetail() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { getJobById, isLoading, job, appliedJobs } = UseJobStore();
  const { authUser } = UseAuthStore();

  useEffect(() => {
    if (jobId) {
      getJobById(jobId);
    }
  }, [jobId, getJobById]);

  const hasApplied = appliedJobs?.response?.some(
    (application) => 
      application?.userId?._id === authUser?._id && 
      application?.jobId?._id === job?._id
  );

  return (
    <div className="h-screen container px-4 md:mx-auto lg:mx-auto md:my-5 lg:my-5 md:mb-6 lg:mb-6">
      <div>
        <div className="block md:hidden lg:hidden">
          <h1 className="text-2xl flex items-center pb-4 cursor-pointer">
            <span onClick={() => navigate(-1)}>
              <ArrowLeft className="size-7" />
            </span>
            Job Details
          </h1>
        </div>
      </div>
      
      <div>
        {isLoading ? (
          <JobSkeleton />
        ) : job ? (
          <div>
            <div className="flex flex-col gap-1.5 mb-6">
              <h1 className="text-2xl font-medium">{job?.jobTitle}</h1>
              <p className="text-[18px] md:text-[20px] lg:text-[20px] font-medium">
                {job?.company}
              </p>
              <p className="text-[16px] text-gray-500 font-medium">
                Posted on {new Date(job?.createdAt).toLocaleDateString()}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-between items-center my-2.5 md:w-[70%] lg:w-[70%]">
              <span className="flex items-center gap-1.5 text-gray-500 border border-gray-300 rounded-md px-2.5 py-1">
                <IndianRupee className="w-4 h-4" />
                {job?.salary ? `₹${job.salary}` : "Not disclosed"}
              </span>
              <span className="text-gray-500 border border-gray-300 rounded-md px-2.5 py-1">
                {job?.place}
              </span>
              <span className="text-gray-500 border border-gray-300 rounded-md px-2.5 py-1">
                {job?.type}
              </span>
              <span className="text-gray-500 border border-gray-300 rounded-md px-2.5 py-1">
                {job?.location}
              </span>
            </div>
            
            <div className="my-3.5 border border-gray-300 rounded-md px-3 py-1.5 space-y-1.5">
              <h1 className="text-[18px] font-bold">Published By</h1>
              <div className="flex justify-center md:justify-start lg:justify-start items-center gap-2.5">
                {job?.publisherId?.profilePic ? (
                  <img
                    src={job.publisherId.profilePic}
                    alt={job.publisherId.name}
                    className="h-20 w-20 sm:h-25 sm:w-25 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="h-20 w-20 sm:h-25 sm:w-25 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl sm:text-4xl border-4 border-white shadow-lg">
                    {job?.publisherId?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
                <div>
                  <p
                    className="text-[20px] font-medium hover:underline cursor-pointer"
                    onClick={() =>
                      navigate(`/userDetail/${job?.publisherId?._id}`)
                    }
                  >
                    {job?.publisherId?.name}
                  </p>
                  <p className="text-gray-500 text-[16px] font-medium">
                    {job?.publisherId?.bio && job.publisherId.bio.length > 50
                      ? job.publisherId.bio.substring(0, 50) + "..."
                      : job?.publisherId?.bio || 'No bio available'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="flex-1 md:mr-6">
                <div className="px-3.5 py-1.5 mb-3">
                  <h1 className="text-2xl font-bold">Description</h1>
                  <p className="text-[20px] text-gray-500 font-medium">
                    {job?.description}
                  </p>
                </div>
                
                <div className="px-3.5 py-1.5 mb-3">
                  <h1 className="text-2xl font-bold">Role & Requirements</h1>
                  <p className="text-[20px] font-medium text-gray-500">
                    {job?.role}
                  </p>
                </div>
                
                <div className="px-3.5 py-1.5 mb-3 space-y-2">
                  <h1 className="text-2xl font-bold">Desired Skills</h1>
                  <div className="flex flex-wrap items-center gap-2">
                    {Array.isArray(job?.requiredSkills) &&
                    job.requiredSkills.length > 0 ? (
                      job.requiredSkills.map((skill, index) => (
                        <div
                          key={index}
                          className="border border-gray-300 w-fit rounded-md px-2.5 py-1 flex justify-center items-center"
                        >
                          <p className="text-[18px] font-medium text-gray-500">
                            {skill}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 font-medium">
                        No skills mentioned
                      </p>
                    )}
                  </div>
                </div>
                
                <p className="px-3.5 py-1.5 mb-3 text-[20px] font-medium">
                  Company email:{" "}
                  <span className="text-gray-500 text-[16px] md:text-[20px] lg:text-[20px]">
                    {job?.jobEmail}
                  </span>
                </p>
              </div>
              
              {/* Apply Button Section */}
              <div className="md:w-80 lg:w-80">
                {hasApplied ? (
                  <div className="w-full mx-auto rounded-lg py-3 text-2xl font-medium md:px-8 h-fit mb-6 text-center bg-gray-400 cursor-not-allowed">
                    <p className="text-white">Already Applied</p>
                  </div>
                ) : (
                  <div
                    className={`w-full mx-auto rounded-lg py-3 text-2xl font-medium md:px-8 h-fit mb-6 text-center cursor-pointer transition-colors ${
                      isLoading
                        ? "bg-blue-300 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-700 active:bg-blue-900"
                    }`}
                    onClick={() =>
                      !isLoading &&
                      document.getElementById("my_modal_1").showModal()
                    }
                  >
                    <button
                      className="cursor-pointer text-white w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Applying..." : "Apply"}
                    </button>
                    <dialog id="my_modal_1" className="modal">
                      <div className="modal-box">
                        <Apply jobId={job?._id} />
                      </div>
                    </dialog>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Job not found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobDetail;

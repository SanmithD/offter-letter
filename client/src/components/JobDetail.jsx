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
    getJobById(jobId);
  }, [jobId, getJobById]);

  return (
    <div className="h-screen container my-2.5 px-4 md:mx-auto lg:mx-auto md:my-5 lg:my-5 md:mb-6 lg:mb-6 ">
      <div>
        <div className="block md:hidden lg:hidden">
          <h1 className="text-2xl flex items-center pb-4 cursor-pointer">
            {" "}
            <span onClick={() => navigate(-1)}>
              <ArrowLeft className="size-7" />
            </span>{" "}
            Job Details
          </h1>
        </div>
      </div>
      <div>
        {isLoading ? (
          <JobSkeleton />
        ) : (
          <div>
            <div className="flex flex-col gap-1.5 mb-6 ">
              <h1 className="text-2xl font-medium ">{job?.jobTitle}</h1>
              <p className="text-[20px] font-medium ">{job?.company} </p>
              <p className="text-[18px] text-gray-500 font-medium ">
                Posted on {new Date(job?.createdAt).toLocaleString()}{" "}
              </p>
            </div>
            <div className="flex justify-between items-center my-2.5 md:w-[30%] lg:w-[30%] ">
              <h1 className="flex items-center gap-1.5 text-gray-500 border-1 rounded-md px-2.5 py-1 ">
                <IndianRupee />{" "}
                {job?.salary === null ? "Not disclosed" : job?.salary}{" "}
              </h1>
              <h1 className="flex items-center gap-1.5 text-gray-500 border-1 rounded-md px-2.5 py-1 ">
                {job?.place}{" "}
              </h1>
              <h1 className="flex items-center gap-1.5 text-gray-500 border-1 rounded-md px-2.5 py-1 ">
                {job?.type}{" "}
              </h1>
              <h1 className="flex items-center gap-1.5 text-gray-500 border-1 rounded-md px-2.5 py-1 ">
                {job?.location}{" "}
              </h1>
            </div>
            <div className="my-3.5 border-1 rounded-md px-3 py-1.5 space-y-1.5 ">
              <h1 className="text-[22px] font-bold ">Published By</h1>
              <div className="flex justify-center md:justify-self-start lg:justify-self-start items-center gap-2.5">
                {job?.publisherId?.profilePic ? (
                  <img
                    src={job?.publisherId?.profilePic}
                    alt={job?.publisherId?.name}
                    className="h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl sm:text-4xl border-4 border-white shadow-lg">
                    {job?.publisherId?.name?.[0]?.toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-[20px] font-medium ">
                    {job?.publisherId?.name}{" "}
                  </p>
                  <p className="text-gray-500 text-[18px] font-medium ">
                    {job?.publisherId?.bio.length > 50
                      ? job?.publisherId?.bio.substring(0, 50) + "..."
                      : job?.publisherId?.bio}{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-3.5 py-1.5 mb-3 ">
              <h1 className="text-2xl font-bold ">Description</h1>
              <p className="text-[20px] text-gray-500 font-medium ">
                {job?.description}{" "}
              </p>
            </div>
            <div className="px-3.5 py-1.5 mb-3 ">
              <h1 className="text-2xl font-bold">Role & Requirements</h1>
              <p className="text-[20px] font-medium text-gray-500 ">
                {job?.role}{" "}
              </p>
            </div>
            <div className="px-3.5 py-1.5 mb-3 space-y-2 ">
              <h1 className="text-2xl font-bold ">Desired Skills</h1>
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-2">
                {Array.isArray(job?.requiredSkills) &&
                job?.requiredSkills.length > 0 ? (
                  job?.requiredSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="border-1 rounded-md px-2.5 py-1 flex justify-center items-center "
                    >
                      <p className="text-[18px] font-medium text-gray-500">
                        {skill}{" "}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 font-medium ">
                    No skill mentioned
                  </p>
                )}
              </div>
            </div>
            <p className="px-3.5 py-1.5 mb-3 text-[20px] font-medium ">
              Company email : {job?.jobEmail}{" "}
            </p>
          </div>
        )}

        {
          appliedJobs?.response?.userId?._id === authUser?._id ? <p className="text-2xl font-medium text-center border-1 py-2 rounded-md " >Already applied</p> : (
        <div
          className={`w-full mx-auto rounded-lg py-3 h-fit mb-6 text-center cursor-pointer bg-blue-500 hover:bg-blue-700 active:bg-blue-900 bg-${
            isLoading ? "blue-300" : "blue-500"
          }`}
          disabled={isLoading ? true : false}
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          <button className="text-2xl font-bold" >
            Apply
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box ">
              <Apply jobId={job?._id} />
            </div>
          </dialog>
        </div>
          )
        }
      </div>
    </div>
  );
}

export default JobDetail;

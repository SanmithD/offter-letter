import { IndianRupee } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { UseJobStore } from "../store/UseJobStore";

function Home() {
  const navigate = useNavigate();
  const { getJobs, job, isLoading } = UseJobStore();

  useEffect(()=>{
    getJobs()
  },[getJobs]);

  return (
    <div className="container h-screen px-4 py-4 mx-auto" >
      <div className="mx-2 md:mx-auto" >
        {
          Array.isArray(job) && job.length > 0 ? (
            job.map((data, index) =>(
              <div key={index} onClick={()=>navigate(`/jobDetail/${data?._id}`)}
              className="mb-4 px-4 py-2 cursor-pointer block md:flex lg:flex gap-[50px] hover:border-b-1"
              >
                <div className="flex flex-col md:flex-1/3 lg:flex-1/3" >
                <h1 className="text-[22px] font-medium " >{data?.jobTitle} </h1>
                <p className="text-gray-500 font-medium" >{data?.company} </p>
                <p className="text-gray-500 font-light" >{data?.role} </p>
                <div className="flex justify-between items-center my-3" >
                  <p className="text-[18px] font-medium border-1 rounded-md px-2 py-1.5 " >{data?.location} </p>
                  <p className="text-[18px] font-medium border-1 rounded-md px-2 py-1.5 ">{data?.place} </p>
                  <p className="text-[18px] font-medium border-1 rounded-md px-2 py-1.5 ">{data?.type}</p>
                  <p className="text-[18px] font-medium border-1 rounded-md px-2 py-1.5 ">{data?.salary === null ? "Not disclosed" : <span className="flex gap-1.5 items-center" ><IndianRupee/> {data?.salary}</span> } </p>
                </div>
                </div>
                {/* <div className="hidden md:flex lg:flex flex-1/4 py-4 flex-col flex-wrap " >
                <h1 className="text-2xl font-medium" >Required Skills</h1>
                <div className="flex flex-col justify-between " >
                  {
                    data?.requiredSkills.map((skill, index) =>(
                      <div key={index}>
                        <p className="text-[16px] border-1 px-4 py-1.5 font-medium rounded-md text-gray-500  " >{skill}</p>
                      </div>
                    ))
                  }
                </div>
                </div> */}
              </div>
            ))
          ) : <p>No jobs found</p>
        }
      </div>
    </div>
  )
}

export default Home
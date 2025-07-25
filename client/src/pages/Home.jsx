import { ArrowRight, Brain, IndianRupee } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import HomeSkeleton from "../components/skeletons/HomeSkeleton";
import { UseJobStore } from "../store/UseJobStore";

const textStyle = {
  padding: '5px',
  display: 'flex',
  alignItems: 'center',
  gap: '3px',
  fontSize: '20px',
  fontWeight: 500,
  width: 'fit-content',
  marginTop: '10px',
  marginBottom: '10px',
  cursor: 'pointer',
  background: 'linear-gradient(90deg, #4F8CFF, #A259FF, #00FFD0)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  border: '2px solid #A259FF'
};


function Home() {
  const navigate = useNavigate();
  const { getJobs, job, isLoading } = UseJobStore();

  useEffect(()=>{
    getJobs()
  },[getJobs]);

  return (
    <div className="container h-screen px-4 py-4 mx-auto" >
      <h1 className="flex md:hidden lg:hidden justify-center text-2xl font-medium font-stretch-semi-expanded text-shadow-lg " >OFFER LETTER</h1>
      <button style={textStyle} onClick={()=>navigate('/help')} >Get Help By Ai <span><Brain/> </span></button>
      <div className="mx-2 md:mx-auto" >
        {
          isLoading ? <div><HomeSkeleton/></div> : (
            Array.isArray(job) && job.length > 0 ? (
              job.map((data, index) =>(
                <div key={index} onClick={()=>navigate(`/jobDetail/${data?._id}`)}
                className="mb-4 px-4 py-2 cursor-pointer block md:flex lg:flex gap-[50px] hover:border-b-1"
                >
                  <div className="flex flex-col md:flex-1/3 lg:flex-1/3" >
                  <h1 className="text-[22px] font-medium flex items-center " ><span className="text-blue-500" ><ArrowRight/> </span> {data?.jobTitle} </h1>
                  <p className="text-gray-500 font-medium" >{data?.company} </p>
                  <p className="text-gray-500 font-light" >{data?.role.length > 50 ? data?.role.substring(0, 50) + "..." : data?.role } </p>
                  <div className="flex flex-wrap justify-between items-center gap-2 my-3 space-y-1" >
                    <p className="text-[16px] px-1 font-medium border-l-1 md:border-1 rounded-md py-1.5 md:px-2 " >{data?.location} </p>
                    <p className="text-[16px] px-1 font-medium border-l-1 md:border-1 rounded-md py-1.5 md:px-2">{data?.place} </p>
                    <p className="text-[16px] px-1 font-medium border-l-1 md:border-1 rounded-md py-1.5 md:px-2">{data?.type}</p>
                    <p className="text-[16px] px-1 font-medium border-l-1 md:border-1 rounded-md py-1.5 md:px-2">{data?.salary === null ? "Not disclosed" : <span className="flex gap-1.5 items-center" ><IndianRupee/> {data?.salary}</span> } </p>
                  </div>
                  </div>
                </div>
              ))
            ) : <p>No jobs found</p>
          )
        }
      </div>
    </div>
  )
}

export default Home
import { useEffect } from "react";
import { UseJobStore } from "../store/UseJobStore";

function AppliedJobs() {
  const { getAppliedJobs } = UseJobStore();

  useEffect(()=>{
    getAppliedJobs();
  },[getAppliedJobs]);
  
  return (
    <div>AppliedJobs</div>
  )
}

export default AppliedJobs
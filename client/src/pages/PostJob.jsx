import { useState } from "react";
import Header from "../components/Header";
import { UseJobStore } from "../store/UseJobStore";

function PostJob() {
  const { postJob, isLoading } = UseJobStore();
  const [postData, setPostData] = useState({
    jobTitle: '',
    jobEmail: '',
    company: '',
    description: '',
    place: '',
    type: '',
    location: '',
    role: '',
    requiredSkills: '',
    salary: '',
  });

  const handleChange = (e) => {
    if (!postData) return;
      setPostData({ ...postData, [e.target.name]: e.target.value });
  }

  const handlePost = async(e) => {
    e.preventDefault();
    await postJob(postData);
    console.log(postData);
  }

  return (
    <div className="container mx-auto mt-4">
      <div className="block mx-4 md:hidden lg:hidden">
        <Header name={"Post Job"} />
      </div>
      
      <form onSubmit={handlePost} className="flex flex-col justify-center mx-auto px-4 space-y-4 " >
        <div className="flex flex-col justify-start " >
          <label className="text-[18px] md:text-[20px] lg:text-[20px] font-medium tracking-wide " >Job Title</label>
          <input 
            type="text" 
            className="border-1 pl-3 py-1 rounded-md outline-0 md:h-12 "
            value={postData.jobTitle} 
            name="jobTitle" 
            placeholder="Job title..." 
            onChange={handleChange} 
          />
        </div> 
        
        <div className="flex flex-col justify-start " >
          <label className="text-[18px] md:text-[20px] lg:text-[20px] font-medium tracking-wide " >Company name</label>
          <input 
            type="text" 
            value={postData.company} 
            className="border-1 pl-3 py-1 rounded-md outline-0 md:h-12 "
            name="company" 
            placeholder="Company name..." 
            onChange={handleChange} 
          />
        </div> 
        
        <div className="flex flex-col justify-start " >
          <label className="text-[18px] md:text-[20px] lg:text-[20px] font-medium tracking-wide ">Company Email</label>
          <input 
            type="email" 
            className="border-1 pl-3 py-1 rounded-md outline-0 md:h-12 "
            value={postData.jobEmail} 
            name="jobEmail" 
            placeholder="Company email..." 
            onChange={handleChange} 
          />
        </div> 
        
        <div className="flex flex-col justify-start ">
          <label className="text-[18px] md:text-[20px] lg:text-[20px] font-medium tracking-wide ">Role & Responsibility</label>
          <textarea 
            className="border-1 pl-3 py-1 rounded-md outline-0"
            value={postData.role} 
            name="role" 
            placeholder="Job role..." 
            onChange={handleChange} 
            rows={3}
          />
        </div> 
        
        <div className="flex flex-col justify-start ">
          <label className="text-[18px] md:text-[20px] lg:text-[20px] font-medium tracking-wide ">Job description</label>
          <textarea 
            value={postData.description} 
            name="description" 
            className="border-1 pl-3 py-1 rounded-md outline-0"
            placeholder="Job description..." 
            onChange={handleChange}
            rows="4"
          />
        </div> 
        
        <div className="flex flex-col justify-start ">
          <label className="text-[18px] md:text-[20px] lg:text-[20px] font-medium tracking-wide ">Required skills</label>
          <input 
            type="text" 
            className="border-1 pl-3 py-1 rounded-md outline-0 md:h-12 "
            value={postData.requiredSkills} 
            name="requiredSkills" 
            placeholder="React, Node.js, MongoDB..." 
            onChange={handleChange} 
          />
          <p className="text-gray-500 text-[14px] " >Use "," to separate skills</p>
        </div> 
        
        <div className="flex flex-col md:flex-row lg:flex-row flex-wrap justify-between space-y-3 " >
        <div className="flex flex-col justify-start " >
          <label className="text-[18px] md:text-[20px] lg:text-[20px] font-medium tracking-wide ">Work place</label>
          <div className="flex px-3 justify-between items-center md:justify-start lg:justify-start md:gap-3 lg:gap-3 " >
            <div className="flex gap-1" >
            <input 
              type="radio" 
              name="place" 
              value="Onsite" 
              checked={postData.place === 'Onsite'}
              onChange={handleChange} 
            /> Onsite
            </div>
            <div className="flex gap-1" >
            <input 
              type="radio" 
              name="place" 
              value="Remote" 
              checked={postData.place === 'Remote'}
              onChange={handleChange} 
            /> Remote
            </div>
            <div className="flex gap-1" >
            <input 
              type="radio" 
              name="place" 
              value="Hybrid" 
              checked={postData.place === 'Hybrid'}
              onChange={handleChange} 
            /> Hybrid
            </div>
          </div>
        </div> 
        
        <div className="flex flex-col justify-start " >
          <label className="text-[18px] md:text-[20px] lg:text-[20px] font-medium tracking-wide ">Job type</label>
          <select 
            value={postData.type} 
            name="type" 
            className="border-1 pl-3 bg-gray-800 py-1 rounded-md outline-0 md:h-12 "
            onChange={handleChange}
          >
            <option value="">Select job type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div> 
        
        <div className="flex items-center md:gap-3 lg:gap-3 ">

        <div className="flex flex-col justify-start " >
          <label className="text-[18px] md:text-[20px] lg:text-[20px] font-medium tracking-wide " >Company location</label>
          <input 
            type="text" 
            value={postData.location} 
            name="location" 
            className="border-1 pl-3 py-1 rounded-md outline-0 md:h-12 "
            placeholder="Company location..." 
            onChange={handleChange} 
          />
        </div> 
        
        <div className="flex flex-col justify-start">
          <label className="text-[18px] md:text-[20px] lg:text-[20px] font-medium tracking-wide ">Salary</label>
          <input 
            type="text" 
            value={postData.salary} 
            name="salary" 
            className="border-1 pl-3 py-1 rounded-md outline-0 md:h-12 "
            placeholder="30000 per month" 
            onChange={handleChange} 
          />
        </div> 
        </div>
        </div>
        
        <button type="submit" disabled={isLoading} className="px-4 py-1.5 bg-blue-500 rounded-md md:w-fit text-2xl font-medium hover:bg-blue-800 " >{ isLoading ? 'Posting...' : 'Post' } </button>
      </form>
    </div>
  )
}

export default PostJob

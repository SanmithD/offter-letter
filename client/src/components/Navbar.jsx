import { Brain, BriefcaseBusinessIcon, File, Home, User2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [active, setActive] = useState({
    home: false,
    jobs: false,
    applied: false,
    profile: false,
    help: false
  });

  useEffect(() => {
    const currentPath = location.pathname;
    setActive({
      home: currentPath === '/',
      jobs: currentPath === '/jobs',
      applied: currentPath === '/appliedJobs',
      profile: currentPath === '/profile',
      help: currentPath === '/help',
    });
  }, [location.pathname]);

  const handleClick = (tab) => {
    setActive({
      home: tab === 'home',
      jobs: tab === 'jobs',
      applied: tab === 'applied',
      profile: tab === 'profile',
      help: tab === 'help',
    });
  };

  return (
    <div className="container h-fit py-3 md:mx-6 lg:mx-6">
      <div className="flex justify-around items-center">
        <div 
          className={`flex flex-col justify-center items-center gap-1 hover:text-blue-500 ${
            active.home ? "text-blue-500" : "text-gray-500"
          }`} 
          onClick={() => handleClick('home')}
        >
          <Link to='/'><Home /></Link>
          <p className="text-xs">Home</p>
        </div>
        
        <div 
          className={`flex flex-col justify-center items-center gap-1 hover:text-blue-500 ${
            active.jobs ? "text-blue-500" : "text-gray-500"
          }`} 
          onClick={() => handleClick('jobs')}
        >
          <Link to='/jobs'><BriefcaseBusinessIcon /></Link>
          <p className="text-xs">Jobs</p>
        </div>
        
        <div 
          className={`flex flex-col justify-center items-center gap-1 hover:text-blue-500 ${
            active.applied ? "text-blue-500" : "text-gray-500"
          }`} 
          onClick={() => handleClick('applied')}
        >
          <Link to='/appliedJobs'><File /></Link>
          <p className="text-xs">Application</p>
        </div>
        
        <div 
          className={`flex flex-col justify-center items-center gap-1 hover:text-blue-500 ${
            active.profile ? "text-blue-500" : "text-gray-500"
          }`} 
          onClick={() => handleClick('profile')}
        >
          <Link to='/profile'><User2Icon /></Link>
          <p className="text-xs">Profile</p>
        </div>
        <div 
          className={`hidden md:flex md:flex-col lg:flex lg:flex-col justify-center items-center gap-1 hover:text-blue-500 ${
            active.help ? "text-blue-500" : "text-gray-500"
          }`} 
          onClick={() => handleClick('help')}
        >
          <Link to='/help'><Brain/> </Link>
          <p className="text-xs">Help</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

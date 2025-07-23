import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseAgentStore } from "../store/UseAgentStore";

function Jobs() {
  const navigate = useNavigate();
  const [searchMsg, setSearchMsg] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { getJobByAi, searchJob, jobs, searchedJobs } = UseAgentStore();

  // Load AI recommended jobs when component mounts
  useEffect(() => {
    getJobByAi();
  }, []);

  const handleSearch = async () => {
    if (searchMsg.trim()) {
      setIsSearching(true);
      await searchJob(searchMsg);
    } else {
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchMsg('');
    setIsSearching(false);
  };

  const jobsToDisplay = isSearching 
    ? (Array.isArray(searchedJobs) ? searchedJobs : [])
    : (Array.isArray(jobs) ? jobs : []);

  const displayTitle = isSearching 
    ? `Search Results for "${searchMsg}"`
    : 'Recommended Jobs By AI';

  return (
    <div className="container mx-auto mt-3">
      <div className="flex items-center gap-3">
        <div className="w-full flex px-3.5 relative h-fit items-center">
          <span className="absolute pl-1 z-10">
            <SearchIcon />
          </span>
          <input
            type="text"
            name="search"
            value={searchMsg}
            onChange={(e) => setSearchMsg(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="border rounded-md w-full h-fit py-2.5 pl-10 pr-3"
            placeholder="Search Keywords, location, skills, etc..."
          />
        </div>
        <div className="flex gap-2">
          <div className="flex items-center justify-center rounded-md bg-blue-500 hover:bg-blue-700 active:bg-blue-900">
            <button 
              onClick={handleSearch}
              className="text-[20px] md:text-2xl lg:text-2xl w-fit px-3 py-1.5 cursor-pointer text-white"
            >
              Search
            </button>
          </div>
          {isSearching && (
            <div className="flex items-center justify-center rounded-md bg-gray-500 hover:bg-gray-700 active:bg-gray-900">
              <button 
                onClick={handleClearSearch}
                className="text-[20px] md:text-2xl lg:text-2xl w-fit px-3 py-1.5 cursor-pointer text-white"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 px-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-purple-300">
            {displayTitle}
          </h1>
          {isSearching && (
            <span className="text-sm text-gray-500">
              {jobsToDisplay.length} jobs found
            </span>
          )}
        </div>
        
        <div className="mt-4">
          {jobsToDisplay.length > 0 ? (
            <div className="grid gap-4">
              {jobsToDisplay.map((jobItem, index) => (
                <div 
                  key={jobItem.id || index} 
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white"
                  onClick={() => navigate(`/jobDetail/${jobItem?._id}`)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {jobItem.jobTitle || jobItem.title}
                    </h3>
                    {isSearching && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Search Result
                      </span>
                    )}
                    {!isSearching && (
                      <span className="text-xs text-purple-800 px-2 py-1 rounded">
                        AI Recommended
                      </span>
                    )}
                  </div>
                  
                  {jobItem.company && (
                    <p className="text-gray-600 mb-2 font-medium">{jobItem.company}</p>
                  )}
                  
                  {jobItem.location && (
                    <p className="text-gray-500 mb-2">📍 {jobItem.location}</p>
                  )}
                  
                  {jobItem.salary && (
                    <p className="text-green-600 font-medium mb-2">💰 {jobItem.salary}</p>
                  )}
                  
                  {jobItem.description && (
                    <p className="text-gray-700 mt-2 text-sm line-clamp-2">
                      {jobItem.description.length > 150 
                        ? `${jobItem.description.substring(0, 150)}...` 
                        : jobItem.description
                      }
                    </p>
                  )}
                  
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-sm text-blue-600 hover:underline">
                      View Details →
                    </span>
                    {jobItem.type && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {jobItem.type}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              {isSearching ? (
                <div>
                  <p className="text-gray-500 text-lg mb-2">
                    No jobs found for "{searchMsg}"
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    Try different keywords or check your spelling
                  </p>
                  <button 
                    onClick={handleClearSearch}
                    className="text-blue-600 hover:underline"
                  >
                    Back to AI Recommendations
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-gray-500 text-lg mb-2">
                    Loading AI recommended jobs...
                  </p>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs;

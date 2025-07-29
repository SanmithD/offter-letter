import { BellIcon, BriefcaseIcon, ClockIcon, DollarSignIcon, EyeIcon, User2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { UseNotificationStore } from "../store/UseNotificationStore";

function Notification() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('applications');
  const { getApplication, getInfo, notification, getRes, res } = UseNotificationStore();

  const handleNotify = async(userId, jobId) => {
    navigate(`/userDetail/${userId}`);
    await getInfo(jobId);
  }

  useEffect(() => {
    if (activeTab === 'applications') {
      getApplication();
    } else {
      getRes();
    }
  }, [activeTab]);

  return (
    <div className="container px-4 mt-4 mx-auto max-w-6xl">
      <div className="block md:hidden lg:hidden">
        <Header name={"Notification"} />
      </div>

      <div className="border-b border-gray-200 pb-4 mb-6">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('applications')}
            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'applications'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <BriefcaseIcon className="h-4 w-4 inline mr-2" />
            Applications Received
          </button>
          <button
            onClick={() => setActiveTab('responses')}
            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'responses'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <BellIcon className="h-4 w-4 inline mr-2" />
            Application Updates
          </button>
        </div>
      </div>

      {activeTab === 'applications' && (
        <div className="space-y-6">
          {notification ? (
            <>
              <div className="border-b border-gray-200 pb-4">
                <h1 className="text-3xl font-bold">Applications Received</h1>
                <p className="text-gray-600 mt-1">
                  {Array.isArray(notification) ? notification.length : 0} applications received
                </p>
              </div>

              <div className="space-y-4">
                {Array.isArray(notification) && notification.length > 0 ? (
                  notification.map((data, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                    >
                      {/* Application Header */}
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        
                        {/* User Information */}
                        <div className="flex-1">
                          <div className="flex items-start gap-4 mb-4">
                            {data?.userId?.profilePic ? (
                              <img
                                src={data.userId.profilePic}
                                alt={data.userId.name}
                                className="h-16 w-16 rounded-full object-cover border-2 border-gray-100"
                              />
                            ) : (
                              <div className="h-16 w-16 rounded-full border-2 border-gray-200 flex items-center justify-center">
                                <User2Icon className="h-8 w-8 text-gray-400" />
                              </div>
                            )}
                            
                            <div className="flex-1 min-w-0">
                              <h2 className="text-xl font-semibold mb-1">
                                {data?.userId?.name}
                              </h2>
                              <p className="text-gray-600 mb-1">{data?.userId?.title}</p>
                              <p className="text-sm text-gray-500">{data?.userId?.email}</p>
                            </div>
                          </div>

                          {/* Application Details */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <DollarSignIcon className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium text-gray-700">Expected Salary:</span>
                              <span className="text-sm text-gray-600">{data?.expectedSalary}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <ClockIcon className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium text-gray-700">Notice Period:</span>
                              <span className="text-sm text-gray-600">{data?.noticePeriod}</span>
                            </div>
                          </div>
                        </div>

                        {/* Job Information */}
                        <div className="lg:w-80 border-l-0 lg:border-l lg:border-gray-200 lg:pl-6">
                          <div className="flex items-start gap-3">
                            <BriefcaseIcon className="h-5 w-5 text-indigo-600 mt-1 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <h3
                                onClick={() => navigate(`/jobDetail/${data?.jobId._id}`)}
                                className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer hover:underline mb-2 leading-tight"
                              >
                                {data?.jobId?.jobTitle}
                              </h3>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {data?.jobId?.role}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                        <button 
                          onClick={() => handleNotify(data?.userId._id, data?.jobId._id)}  
                          className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors flex items-center gap-2"
                        >
                          <EyeIcon className="h-4 w-4" />
                          View Profile
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors">
                          Contact Applicant
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <BriefcaseIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                    <p className="text-gray-600">
                      Applications will appear here once candidates start applying to your jobs.
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading applications...</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'responses' && (
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h1 className="text-3xl font-bold">Application Updates</h1>
            <p className="text-gray-600 mt-1">
              Track the status of your job applications
            </p>
          </div>

          <div className="space-y-4">
            {Array.isArray(res) && res.length > 0 ? (
              res.map((data, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <EyeIcon className="h-6 w-6 text-green-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">
                            {data?.jobId?.jobTitle || 'Job Title'}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {data?.jobId?.company}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500 flex-shrink-0">
                          {data?.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'Recent'}
                        </span>
                      </div>
                      
                      <div className="rounded-md p-3">
                        <p className="text-md text-gray-500">
                          {data?.message || 'Your application has been viewed by the employer'}
                        </p>
                      </div>
                      
                      {data?.jobId?._id && (
                        <button
                          onClick={() => navigate(`/jobDetail/${data.jobId._id}`)}
                          className="mt-3 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          View Job Details →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <BellIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No updates yet</h3>
                <p className="text-gray-600">
                  You'll receive notifications here when employers view your applications.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Notification;

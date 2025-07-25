import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import JobDetail from "./components/JobDetail";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import { UseThemeStore } from "./store/UseThemeStore";

const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const AppliedJobs = lazy(() => import("./pages/AppliedJobs"));
const Profile = lazy(() => import("./pages/Profile"));
const Jobs = lazy(() => import("./pages/Jobs"));
const Help = lazy(() => import("./pages/Help"));
const PostJob = lazy(() => import("./pages/PostJob"));
const Notification = lazy(() => import("./pages/Notification"));

function App() {
  const { theme } = UseThemeStore();

  return (
    <div data-theme={theme} >
      <Toaster />
      <Suspense fallback={<Loader />}>
        {/* Desktop Navbar */}
        <div className="hidden sm:block sticky top-0 z-50 backdrop-blur-lg bg-gray-800 ">
          <Navbar />
          <hr />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/appliedJobs" element={<AppliedJobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/help" element={<Help />} />
          <Route path="/postJob" element={<PostJob />} />
          <Route path="/jobDetail/:jobId" element={<JobDetail />} />
          <Route path="/notification" element={<Notification />} />
        </Routes>

        
        <div className="block sm:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-gray-800 ">
          <Navbar />
        </div>
      </Suspense>
    </div>
  );
}

export default App;

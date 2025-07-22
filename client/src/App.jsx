import { lazy, Suspense } from "react";
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";

const Home = lazy(() => import('./pages/Home'));
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const AppliedJobs = lazy(() => import('./pages/AppliedJobs'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <div>
      <Toaster />
      <Suspense fallback={<Loader/>}>
        {/* Desktop Navbar */}
        <div className="hidden sm:block sticky top-0 z-50 backdrop-blur-lg ">
          <Navbar />
          <hr />
        </div>
        
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/appliedJobs" element={<AppliedJobs/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
        
        {/* Mobile Navbar */}
        <div className="block sm:hidden sticky bottom-0 z-50 ">
          <hr />
          <Navbar />
        </div>
      </Suspense>
    </div>
  );
}

export default App;

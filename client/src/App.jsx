import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import JobDetail from "./components/JobDetail";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
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
const UserDetail = lazy(() => import('./components/UserDetail'));

function App() {
  const { theme } = UseThemeStore();
  const location = useLocation();

  const hideNavbar = ["/signup", "/login"];
  const isNavbarVisible = hideNavbar.includes(location.pathname);

  return (
    <div data-theme={theme}>
      <Toaster />
      <Suspense fallback={<Loader />}>
        {/* Desktop Navbar */}
        {!isNavbarVisible && (
          <div className="hidden sm:block sticky top-0 z-50 backdrop-blur-lg bg-gray-800 ">
            <Navbar />
            <hr />
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/appliedJobs"
            element={
              <ProtectedRoute>
                <AppliedJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <Jobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/help"
            element={
              <ProtectedRoute>
                <Help />
              </ProtectedRoute>
            }
          />
          <Route
            path="/postJob"
            element={
              <ProtectedRoute>
                <PostJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userDetail/:userId"
            element={
              <ProtectedRoute>
                <UserDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobDetail/:jobId"
            element={
              <ProtectedRoute>
                <JobDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoute>
                <Notification />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        {!isNavbarVisible && (
        <Footer/>
        )}
        {!isNavbarVisible && (
          <div className="block sm:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-gray-800 ">
            <Navbar />
          </div>
        )}
      </Suspense>
    </div>
  );
}

export default App;

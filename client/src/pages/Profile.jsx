import {
  BriefcaseIcon,
  Calendar1Icon,
  DownloadIcon,
  Mail,
  Moon,
  PhoneIcon,
  School2,
  Share2,
  Sun,
  User2Icon,
} from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { ProfilePic } from "../components/skeletons/ProfileSkeleton";
import UpdateProfile from "../components/UpdateProfile";
import { UseAuthStore } from "../store/UserStore";
import { UseThemeStore } from "../store/UseThemeStore";

function Profile() {
  const navigate = useNavigate();
  const { profile, authUser, logout, success, deleteUser } = UseAuthStore();
  const { theme, setTheme } = UseThemeStore();

  useEffect(() => {
    profile();
  }, [profile]);

  const handleLogout = () => {
    logout();
    if (success) {
      navigate("/login");
    }
  };

  const handleDelete = async () => {
    await deleteUser();
    if (success) {
      navigate("/signup");
    }
  };

  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ProfilePic />
      </div>
    );
  }

  const handleResumeDownload = async ({ resumeUrl }) => {
    try {
      // Show loading state
      toast.loading("Preparing download...");

      // Fetch the file
      const response = await fetch(resumeUrl);

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.dismiss();
      toast.success("Download started!");
    } catch (error) {
      console.error("Download error:", error);
      toast.dismiss();
      toast.error("Failed to download file");
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="block md:hidden ">
          <Header name={"Profile"} />
        </div>
        <div className="pt-[30px] md:pt-10 lg:pt-10 rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="relative px-6 pb-6">
            <div className="flex items-center gap-2 md:justify-self-start space-y-0.5 md:space-y-0 lg:space-y-0 ">
              <div className="relative ">
                {authUser?.profilePic ? (
                  <a href={authUser?.profilePic} target="_blank">
                    <img
                      src={authUser?.profilePic}
                      alt={authUser?.name}
                      className="h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </a>
                ) : (
                  <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl sm:text-4xl border-4 border-white shadow-lg">
                    {authUser?.name?.[0]?.toUpperCase()}
                  </div>
                )}
              </div>

              <div className="mt-4 sm:mt-0 flex-1">
                <h1 className="text-[20px] md:text-2xl lg:text-2xl font-bold ">
                  {authUser?.name}
                </h1>
                <p className="text-lg mt-1 text-gray-500 font-medium ">
                  {authUser?.title || "Professional"}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-700">
                  <div className="flex items-center gap-1">
                    <Calendar1Icon className="h-4 w-4" />
                    <span>
                      Born {new Date(authUser?.dob).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User2Icon className="h-4 w-4" />
                    <span>
                      Joined{" "}
                      {new Date(authUser?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {authUser?.bio && (
              <div className="rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-gray-500 leading-relaxed">{authUser?.bio}</p>
              </div>
            )}

            <div className="rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BriefcaseIcon className="h-5 w-5 text-blue-500" />
                Experience
              </h2>
              <div className="text-gray-700">
                {authUser?.experience ? (
                  <p className="leading-relaxed">{authUser.experience}</p>
                ) : (
                  <p className="text-gray-500 italic">
                    No experience mentioned
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(authUser?.skills) &&
                authUser?.skills.length > 0 ? (
                  authUser.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-sm border-1 text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No skills mentioned</p>
                )}
              </div>
            </div>

            {authUser?.resume && (
              <div className="rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  Resume
                </h2>
                <div className="flex items-center justify-between p-4 rounded-xl border-2 border-dashed border-gray-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg"></div>
                    <div>
                      <p className="font-medium">Resume.pdf</p>
                      <p className="text-sm text-gray-500">Click to view</p>
                    </div>
                  </div>
                  <a
                    href={authUser.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
                  >
                    View Resume
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Contact</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a
                      href={`mailto:${authUser?.email}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {authUser?.email}
                    </a>
                  </div>
                </div>
                {authUser?.phone && (
                  <div className="flex items-center gap-3">
                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <a
                        href={`tel:${authUser.phone}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {authUser.phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {(authUser?.college || authUser?.marks) && (
              <div className="rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <School2 className="h-5 w-5 text-purple-500" />
                  Education
                </h2>
                <div className="space-y-3">
                  {authUser?.college && (
                    <div>
                      <p className="text-sm text-gray-500">Institution</p>
                      <p className="font-medium ">{authUser.college}</p>
                    </div>
                  )}
                  {authUser?.marks && (
                    <div>
                      <p className="text-sm text-gray-500">
                        Academic Performance
                      </p>
                      <p className="font-medium ">{authUser.marks}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <h1 className="text-[22px] font-bold font-stretch-expanded tracking-wide ">
                Hire candidates :
              </h1>
              <button
                className="px-4 py-1.5 text-[20px] font-bold border-1 rounded-md cursor-pointer hover:border-blue-500 "
                onClick={() => navigate("/postJob")}
              >
                Post job
              </button>
            </div>

            <div className="rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {/* The button to open modal */}
                <label htmlFor="my_modal_6" className="btn w-full cursor-pointer px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium">
                  Edit Profile
                </label>

                <input
                  type="checkbox"
                  id="my_modal_6"
                  className="modal-toggle"
                />
                <div className="modal" role="dialog">
                  <div className="modal-box">
                    <UpdateProfile/>
                    <div className="modal-action">
                      <label htmlFor="my_modal_6" className="btn">
                        Close!
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleResumeDownload(authUser?.resume)}
                  className="w-full cursor-pointer flex justify-center items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-500 transition-colors duration-200 font-medium"
                >
                  <a href={authUser?.resume} />
                  <span>
                    <DownloadIcon />
                  </span>{" "}
                  Download Resume
                </button>
                <button className="w-full cursor-pointer flex justify-center items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-500 transition-colors duration-200 font-medium">
                  <span>
                    <Share2 />
                  </span>{" "}
                  Share Profile
                </button>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      className="btn bg-yellow-500 "
                      onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                      }
                    >
                      Logout
                    </button>
                    <dialog id="my_modal_1" className="modal">
                      <div className="modal-box flex items-center gap-3 ">
                        <p className="py-4">Are you sure want to Logout ?</p>
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn">Close</button>
                          </form>
                        </div>
                        <div className="modal-action">
                          <form method="dialog">
                            <button
                              className="btn bg-yellow-500 "
                              onClick={handleLogout}
                            >
                              Logout
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                    <button
                      className="btn bg-red-500 "
                      onClick={() =>
                        document.getElementById("my_modal_2").showModal()
                      }
                    >
                      Delete
                    </button>
                    <dialog id="my_modal_2" className="modal">
                      <div className="modal-box flex items-center gap-3 ">
                        <p className="py-4">
                          Are you sure want to Delete Account ?
                        </p>
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn">Close</button>
                          </form>
                        </div>
                        <div className="modal-action">
                          <form method="dialog">
                            <button
                              className="btn bg-red-500 "
                              onClick={handleDelete}
                            >
                              Delete
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </div>
                  <div className="my-4 flex items-center gap-3 ">
                    <h1>Appearance</h1>
                    <button
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                      className="cursor-pointer"
                    >
                      {theme === "dark" ? <Sun /> : <Moon />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

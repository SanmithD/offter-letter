import {
    Award,
    BookOpen,
    Briefcase,
    Calendar,
    Mail,
    Percent,
    Phone,
    Save,
    UploadCloud,
    User,
    X
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UseAuthStore } from "../store/UserStore";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const { authUser, updateUser, isLoading } = UseAuthStore();
  const [data, setData] = useState({
    name: "",
    email: "",
    title: "",
    phone: "",
    dob: "",
    address: "",
    bio: "",
    skills: "",
    college: "",
    marks: "",
    experience: "",
    profilePic: null,
    resume: null
  });
  const [errors, setErrors] = useState({});
  const [previewPic, setPreviewPic] = useState(null);
  const [activeSection, setActiveSection] = useState('personal');

  useEffect(() => {
    if (authUser) {
      setData({
        name: authUser.name || "",
        email: authUser.email || "",
        title: authUser.title || "",
        phone: authUser.phone || "",
        dob: authUser.dob ? new Date(authUser.dob).toISOString().split('T')[0] : "",
        address: authUser.address || "",
        bio: authUser.bio || "",
        skills: Array.isArray(authUser.skills) ? authUser.skills.join(", ") : "",
        college: authUser.college || "",
        marks: authUser.marks || "",
        experience: authUser.experience || "",
        profilePic: null,
        resume: null
      });
      
      if (authUser.profilePic) {
        setPreviewPic(authUser.profilePic);
      }
    }
  }, [authUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
    if (value) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const handleFile = (e, field) => {
    const file = e.target.files?.[0];
    
    if (field === "resume") {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        return toast.error("Please select a PDF, DOC, or DOCX file for resume");
      }
      setData(prev => ({ ...prev, resume: file }));
    } else if (field === "profilePic") {
      if (!file.type.startsWith('image/')) {
        return toast.error("Please select an image file for profile picture");
      }
      setData(prev => ({ ...prev, profilePic: file }));
      setPreviewPic(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const e = {};
    if (!data.name) e.name = "Required";
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email))
      e.email = "Invalid email";
    if (!data.phone || !/^\d{10}$/.test(data.phone)) e.phone = "10 digits";
    if (!data.dob) e.dob = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return toast.error("Please fill requirements correctly");
    }
    
    const formData = new FormData();
    
    Object.keys(data).forEach(key => {
      if (key === 'profilePic' || key === 'resume') {
        if (data[key]) {
          formData.append(key, data[key]);
        }
      } else if (data[key] !== undefined && data[key] !== "") {
        formData.append(key, data[key]);
      }
    });

    try {
      await updateUser(formData);
      toast.success("Profile updated successfully!");
      navigate('/profile');
    } catch (error) {
        console.log(error);
      toast.error("Failed to update profile");
    }
  };

  const sections = [
    {
      id: 'personal',
      label: 'Personal Info',
      fields: ['name', 'email', 'title', 'phone', 'dob', 'address']
    },
    {
      id: 'academic',
      label: 'Academic & Professional',
      fields: ['college', 'marks', 'experience', 'skills', 'bio']
    },
    {
      id: 'documents',
      label: 'Documents',
      fields: ['profilePic', 'resume']
    }
  ];

  const currentSection = sections.find(s => s.id === activeSection);

  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleUpdateSubmit} className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-6 text-slate-800 dark:text-white">
            {currentSection.label}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentSection.fields.includes("name") && (
              <Input
                label="Full Name"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
                Icon={User}
              />
            )}

            {currentSection.fields.includes("email") && (
              <Input
                label="Email"
                name="email"
                type="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
                Icon={Mail}
              />
            )}

            {currentSection.fields.includes("title") && (
              <Input
                label="Current Title / Position"
                name="title"
                value={data.title}
                onChange={handleChange}
                Icon={Briefcase}
              />
            )}

            {currentSection.fields.includes("phone") && (
              <Input
                label="Phone"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                error={errors.phone}
                Icon={Phone}
              />
            )}

            {currentSection.fields.includes("dob") && (
              <Input
                label="Date of Birth"
                name="dob"
                type="date"
                value={data.dob}
                onChange={handleChange}
                error={errors.dob}
                Icon={Calendar}
              />
            )}

            {currentSection.fields.includes("address") && (
              <TextArea
                label="Address"
                name="address"
                value={data.address}
                onChange={handleChange}
              />
            )}

            {currentSection.fields.includes("college") && (
              <Input
                label="College / University"
                name="college"
                value={data.college}
                onChange={handleChange}
                Icon={BookOpen}
              />
            )}

            {currentSection.fields.includes("marks") && (
              <Input
                label="Aggregate (% or CGPA)"
                name="marks"
                value={data.marks}
                onChange={handleChange}
                Icon={Percent}
              />
            )}

            {currentSection.fields.includes("experience") && (
              <Input
                label="Experience (years)"
                name="experience"
                type="number"
                value={data.experience}
                onChange={handleChange}
                Icon={Award}
              />
            )}

            {currentSection.fields.includes("skills") && (
              <TextArea
                label="Skills (comma separated)"
                name="skills"
                value={data.skills}
                onChange={handleChange}
                placeholder="JavaScript, React, Node.js, Python"
              />
            )}

            {currentSection.fields.includes("bio") && (
              <TextArea
                label="Short Bio"
                name="bio"
                value={data.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
              />
            )}

            {currentSection.fields.includes("profilePic") && (
              <div className="md:col-span-2">
                <FileUpload
                  label="Profile Picture"
                  accept="image/*"
                  onChange={(e) => handleFile(e, "profilePic")}
                  preview={previewPic}
                  currentFile={authUser?.profilePic}
                />
              </div>
            )}

            {currentSection.fields.includes("resume") && (
              <div className="md:col-span-2">
                <FileUpload
                  label="Resume (PDF, DOC, DOCX)"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFile(e, "resume")}
                  currentFile={authUser?.resume}
                />
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-6 mt-6 border-t">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className={btnSecondary}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className={`${btnPrimary} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Updating...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  Icon,
  suffix,
  placeholder
}) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2
            ${Icon ? "pl-10" : "pl-3"} ${suffix ? "pr-10" : "pr-3"} ${
            error ? "border-red-500" : ""
          }`}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {suffix}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function TextArea({ label, name, value, onChange, placeholder }) {
  return (
    <div className="md:col-span-2">
      <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </label>
      <textarea
        name={name}
        rows={3}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
      />
    </div>
  );
}

function FileUpload({ label, accept, onChange, preview, currentFile }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </label>
      
      {currentFile && !preview && (
        <div className="mb-3 p-3 bg-slate-50 rounded-md">
          <p className="text-sm text-slate-600">
            Current: <a href={currentFile} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">View current file</a>
          </p>
        </div>
      )}
      
      <label className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md cursor-pointer hover:border-indigo-500 transition-colors">
        <div className="space-y-1 text-center">
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="mx-auto h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <UploadCloud className="mx-auto h-10 w-10 text-slate-400" />
          )}
          <p className="text-xs text-slate-500">
            {preview ? 'Click to change' : 'Click to upload or replace'}
          </p>
        </div>
        <input
          type="file"
          accept={accept}
          onChange={onChange}
          className="sr-only"
        />
      </label>
    </div>
  );
}

const btnBase =
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";
const btnPrimary = `${btnBase} border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500`;
const btnSecondary = `${btnBase} border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-indigo-500`;

import {
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Percent,
  Phone,
  UploadCloud,
  User,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { UseAuthStore } from "../store/UserStore";

const initial = {
  profilePic: "",
  name: "",
  email: "",
  password: "",
  title: "",
  phone: "",
  dob: "",
  address: "",
  resume: null,
  bio: "",
  skills: "",
  college: "",
  marks: "",
  experience: "",
};

export default function Signup() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [data, setData] = useState(initial);
  const [errors, setErrors] = useState({});
  const [previewPic, setPreviewPic] = useState(null);
  const [step, setStep] = useState(1);
  const { signup, isSignup, success } = UseAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
    if (value) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  // const handleFile = (e, field) => {
  //   const file = e.target.files?.[0];
  //   if (field === "resume") {
  //     const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  //     if (!validTypes.includes(file.type)) {
  //       return toast.error("Please select a PDF, DOC, or DOCX file for resume");
  //     }
  //   } else if (field === "profilePic") {
  //     if (!file.type.startsWith('image/')) {
  //       return toast.error("Please select an image file for profile picture");
  //     }
  //   }
  //   if (field === "profilePic") {
  //     setPreviewPic(URL.createObjectURL(file));
  //   }

  //   setData((d) => ({ 
  //     ...d, 
  //     [field]: file,
  //     [`${field}Name`]: file.name 
  //   }));
  //   toast.success("File selected");
  // };

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
}

  const validate = () => {
    const e = {};
    if (!data.name) e.name = "Required";
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email))
      e.email = "Invalid email";
    if (!data.password || data.password.length < 6) e.password = "Min 6 chars";
    if (!data.phone || !/^\d{10}$/.test(data.phone)) e.phone = "10 digits";
    if (!data.dob) e.dob = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

   const handleSignupSubmit = async () => {
    if (!validate()) {
      return toast.error("Fill requirements correctly");
    }
    
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('phone', data.phone);
    formData.append('title', data.title);
    formData.append('skills', data.skills);
    formData.append('experience', data.experience);
    formData.append('dob', data.dob);
    formData.append('bio', data.bio);
    formData.append('address', data.address);
    formData.append('college', data.college);
    formData.append('marks', data.marks);

    if (data.profilePic) formData.append('profilePic', data.profilePic);
    if (data.resume) formData.append('resume', data.resume);

    await signup(formData);
    if(success){
      navigate('/');
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();    
    handleSignupSubmit();
  };

  const steps = [
    {
      label: "Personal",
      fields: ["name", "email", "password", "phone", "dob", "address", "title"],
    },
    {
      label: "Academics",
      fields: ["college", "marks", "experience", "skills", "bio"],
    },
    { label: "Documents", fields: ["profilePic", "resume"] },
  ];

  const currentFields = steps[step - 1].fields;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <img src="/offerLogo.png" alt="logo" className="h-10 w-10 rounded-lg " />
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            OfferLetter
          </h1>
          <button className="text-sm text-indigo-600 dark:text-indigo-400">
            Help?
          </button>
        </div>

        <div className="flex items-center justify-center mb-6">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center">
              <span
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold transition
                ${
                  step >= i + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {i + 1}
              </span>
              {i < steps.length - 1 && (
                <div className="w-12 h-0.5 bg-slate-300" />
              )}
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-10 space-y-6"
        >
          <h2 className="text-2xl font-semibold text-center text-slate-800 dark:text-white">
            {steps[step - 1].label} Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentFields.includes("name") && (
              <Input
                label="Full Name"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
                Icon={User}
              />
            )}

            {currentFields.includes("email") && (
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

            {currentFields.includes("password") && (
              <Input
                label="Password"
                name="password"
                type={showPwd ? "text" : "password"}
                value={data.password}
                onChange={handleChange}
                error={errors.password}
                Icon={Lock}
                suffix={
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />
            )}

            {currentFields.includes("phone") && (
              <Input
                label="Phone"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                error={errors.phone}
                Icon={Phone}
              />
            )}

            {currentFields.includes("dob") && (
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

            {currentFields.includes("address") && (
              <TextArea
                label="Address"
                name="address"
                value={data.address}
                onChange={handleChange}
              />
            )}

            {currentFields.includes("title") && (
              <Input
                label="Current Title / Position"
                name="title"
                value={data.title}
                onChange={handleChange}
                Icon={Briefcase}
              />
            )}

            {currentFields.includes("college") && (
              <Input
                label="College / University"
                name="college"
                value={data.college}
                onChange={handleChange}
                Icon={BookOpen}
              />
            )}

            {currentFields.includes("marks") && (
              <Input
                label="Aggregate (% or CGPA)"
                name="marks"
                value={data.marks}
                onChange={handleChange}
                Icon={Percent}
              />
            )}

            {currentFields.includes("experience") && (
              <Input
                label="Experience (years)"
                name="experience"
                type="number"
                value={data.experience}
                onChange={handleChange}
                Icon={Award}
              />
            )}

            {currentFields.includes("skills") && (
              <TextArea
                label="Skills (comma separated)"
                name="skills"
                value={data.skills}
                onChange={handleChange}
              />
            )}

            {currentFields.includes("bio") && (
              <TextArea
                label="Short Bio"
                name="bio"
                value={data.bio}
                onChange={handleChange}
              />
            )}

            {currentFields.includes("profilePic") && (
              <FileUpload
                label="Profile Picture"
                accept="image/*"
                onChange={(e) => handleFile(e, "profilePic")}
                preview={previewPic}
              />
            )}

            {currentFields.includes("resume") && (
              <FileUpload
                label="Resume (PDF)"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFile(e, "resume")}
              />
            )}
          </div>

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className={btnSecondary}
              >
                Back
              </button>
            )}
            {step < steps.length ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className={`${btnPrimary} ml-auto`}
              >
                Next
              </button>
            ) : (
              <button type="button" onClick={handleSignupSubmit} className={`${btnPrimary} ml-auto`}>
                {isSignup ? "Creating account" : "Create account"}
              </button>
            )}
          </div>
        </form>
        <div className="flex items-center text-[18px] font-medium " >
          Already have an account ? <span><Link to='/login'>Login</Link> </span>
        </div>
      </div>
    </main>
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
}) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </label>
      <div className="relative border h-fit py-2 flex items-center ">
        {Icon && (
          <Icon className="absolute left-3 -translate-y-1/2 h-5 w-5 text-slate-400" />
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`block w-full outline-0 rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm 
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

function TextArea({ label, name, value, onChange }) {
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
        className="block w-full border px-3 py-1 rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
}

function FileUpload({ label, accept, onChange, preview }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </label>
      <label className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md cursor-pointer hover:border-indigo-500">
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
          <p className="text-xs text-slate-500">Click to upload</p>
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
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-slate-800";
const btnPrimary = `${btnBase} border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500`;
const btnSecondary = `${btnBase} border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600`;

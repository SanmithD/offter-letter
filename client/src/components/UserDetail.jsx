import { ArrowLeft, Award, Calendar, Download, FileText, GraduationCap, Mail, MapPin, Phone, User } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UseAuthStore } from "../store/UserStore";
import { ProfilePic } from "./skeletons/ProfileSkeleton";

function UserDetail() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const { getUserById, user, isLoading } = UseAuthStore();

    useEffect(() => {
        getUserById(userId);
    }, [userId]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <div className="container md:mx-auto max-w-4xl">
            <div className="block md:hidden lg:hidden mt-2">
                <h1 className="text-2xl flex items-center pb-4 cursor-pointer">
                    <span onClick={() => navigate(-1)}>
                        <ArrowLeft className="size-7" />
                    </span>
                    User Details
                </h1>
            </div>

            <div>
                {isLoading ? (
                    <ProfilePic />
                ) : user ? (
                    <div className="space-y-8">
                        {/* Profile Header */}
                        <div className="border border-gray-200 rounded-lg p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-shrink-0">
                                    {user.profilePic ? (
                                        <img
                                            src={user.profilePic}
                                            alt={user.name}
                                            className="h-32 w-32 rounded-full object-cover border-4 border-gray-100"
                                        />
                                    ) : (
                                        <div className="h-32 w-32 rounded-full border-4 border-gray-200 flex items-center justify-center">
                                            <User className="h-16 w-16 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 space-y-3">
                                    <div>
                                        <h1 className="text-3xl font-bold">{user.name}</h1>
                                        <h2 className="text-xl font-medium text-gray-600 mt-1">{user.title}</h2>
                                    </div>
                                    {user.bio && (
                                        <p className="text-gray-700 leading-relaxed">{user.bio}</p>
                                    )}
                                    <div className="flex flex-wrap gap-4">
                                        <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-gray-300 text-sm font-medium">
                                            {user.experience} years experience
                                        </span>
                                        <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-gray-300 text-sm font-medium">
                                            Age: {calculateAge(user.dob)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="border border-gray-200 rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Mail className="h-5 w-5" />
                                Contact Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Email</p>
                                        <p className="text-gray-600">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Phone</p>
                                        <p className="text-gray-600">{user.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Location</p>
                                        <p className="text-gray-600">{user.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Date of Birth</p>
                                        <p className="text-gray-600">{formatDate(user.dob)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Education & Performance */}
                        <div className="border border-gray-200 rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <GraduationCap className="h-5 w-5" />
                                Education & Performance
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <GraduationCap className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">College</p>
                                        <p className="text-gray-600">{user.college}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Award className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Academic Performance</p>
                                        <p className="text-gray-600">{user.marks}%</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="border border-gray-200 rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {user.skills && user.skills.length > 0 ? (
                                    user.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-3 py-1.5 rounded-full border border-gray-300 text-sm font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic">No skills listed</p>
                                )}
                            </div>
                        </div>

                        {/* Resume */}
                        {user.resume && (
                            <div className="border border-gray-200 rounded-lg p-6">
                                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Resume
                                </h3>
                                <div className="flex items-center gap-4">
                                    <a
                                        href={user.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:border-gray-400 transition-colors"
                                    >
                                        <Download className="h-4 w-4" />
                                        Download Resume
                                    </a>
                                    <a
                                        href={user.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:border-gray-400 transition-colors"
                                    >
                                        <FileText className="h-4 w-4" />
                                        View Resume
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Account Information */}
                        <div className="border border-gray-200 rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-4">Account Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="font-medium">Account Created</p>
                                    <p className="text-gray-600">{formatDate(user.createdAt)}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Last Updated</p>
                                    <p className="text-gray-600">{formatDate(user.updatedAt)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">User not found</h3>
                        <p className="text-gray-600">The requested user profile could not be loaded.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserDetail;

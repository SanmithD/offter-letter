import bcrypt from 'bcrypt';
import { generateToken } from '../config/token.config.js';
import { userModel } from '../model/user.model.js';
import { errorFunction } from '../utils/error.util.js';

export const signup = async(req, res) => {
    const { 
        email, 
        name, 
        title, 
        password, 
        phone, 
        dob, 
        address, 
        bio, 
        skills = [], 
        college, 
        marks, 
        experience 
    } = req.body;

    const profilePicFile = req.files['profilePic']?.[0];
    const resumeFile = req.files['resume']?.[0];

    const profilePicUrl = profilePicFile?.path || '';
    const resumeUrl = resumeFile?.path || '';

    if(!email || !password || !name || !title || !phone || !dob || !address || !college || !marks){
        return errorFunction(400, false, "All required fields must be provided", res);
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if(existingUser) {
            return errorFunction(409, false, "User already exists with this email", res);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let skill = [];

        if(typeof skills === 'string'){
            skill = skills.split(",").map(skill => skill.toLocaleUpperCase().trim()).filter(skill => skill.length > 0 );
        }

        // if(profilePic.name) {
        //     try {
        //         const profileUpload = await upload.single(profilePic.name,{
        //             resource_type: 'image',
        //             allowed_formats: ['jpg', 'jpeg','png', 'webp']
        //         });
        //         profilePicUrl = profileUpload;
        //     } catch (uploadError) {
        //         console.error('Profile picture upload error:', uploadError);
        //         return errorFunction(400, false, "Failed to upload profile picture", res);
        //     }
        // }

        // try {
        //     const resumeUpload = await cloudinary.uploader.upload(resume, {
        //         resource_type: 'raw',
        //         allowed_formats: ['pdf', 'doc', 'docx'],
        //         folder: 'resumes'
        //     });
        //     resumeUrl = resumeUpload.secure_url;
        // } catch (uploadError) {
        //     console.error('Resume upload error:', uploadError);
        //     return errorFunction(400, false, "Failed to upload resume. Please ensure it's a valid PDF or DOC file", res);
        // }

        const newUser = new userModel({
            email: email.toLowerCase().trim(),
            name: name.trim(),
            title: title.trim(),
            profilePic: profilePicUrl,
            password: hashedPassword,
            phone: phone.trim(),
            dob: new Date(dob),
            address: address.trim(),
            resume : resumeUrl,
            bio: bio?.trim() || '',
            skills: skill,
            college: college.trim(),
            marks: parseFloat(marks),
            experience: experience || 0
        });

        const savedUser = await newUser.save();

        const userResponse = savedUser.toObject();
        delete userResponse.password;

        const token = generateToken(savedUser._id, res);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: userResponse,
            token
        });

    } catch (error) {
        console.error('Signup error:', error);
        return errorFunction(500, false, "Server error during registration", res);
    }
};

export const login = async(req, res) =>{
    const { email, password } = req.body;
    if(!email || !password) return errorFunction(400,false, "All fields are required",res);
    try {
        const user = await userModel.findOne({ email });
        if(!user) return errorFunction(404,false, "Email does not exists",res);

        const isPassword = await bcrypt.compare(password, user.password);
        if(!isPassword) return errorFunction(403,false, "Invalid credential",res);

        const token = generateToken(user._id, res);
        res.status(200).json({
            success: true,
            message: "Login success",
            data: user,
            token
        });
    } catch (error) {
        console.log(error);
        errorFunction(500,false,"Server error",res);
    }
}

export const profile = async(req, res) =>{
    const userId = req.user._id;
    if(!userId) return errorFunction(404, false, "Invalid user", res);

    try {
        const user = await userModel.findById(userId).select("-password");
        if(!user) return errorFunction(404, false, "Not found", res);

        res.status(200).json({
            success: true,
            message: "User profile",
            data: user
        });
    } catch (error) {
        console.log(error);
        return errorFunction(500, false, "Server error", res);
    }
}

export const deleteUser = async(req, res) =>{
    const userId = req.user._id;
    if(!userId) return errorFunction(404, false, "Invalid user", res);

    try {
        const user = await userModel.findByIdAndDelete(userId).select("-password");
        if(!user) return errorFunction(404, false, "Not found", res);

        res.status(200).json({
            success: true,
            message: "User profile deleted",
            data: user
        });
    } catch (error) {
        console.log(error);
        return errorFunction(500, false, "Server error", res);
    }
}

export const getUserInfo = async(req, res) =>{
    const { userId } = req.params;

    if(!userId) return errorFunction(404, false, "Invalid message", res);

    try {
        const response = await userModel.findById(userId).select("-password");
        if(!response) return errorFunction(404, false, "Not found", res);

        res.status(200).json({
            success: true,
            message: "User details",
            response
        });
    } catch (error) {
        console.log(error);
        return errorFunction(500, false, "Server error", res);
    }
}
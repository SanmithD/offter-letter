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

export const updateUser = async (req, res) => {
    try {
        const userId = req.user._id;
        
        // Extract fields from request body
        const { 
            email, 
            name, 
            title, 
            phone, 
            dob, 
            address, 
            bio, 
            skills, 
            college, 
            marks, 
            experience 
        } = req.body;

        // Handle file uploads
        const profilePicFile = req.files?.['profilePic']?.[0];
        const resumeFile = req.files?.['resume']?.[0];

        // Define allowed fields for update (excluding password for security)
        const allowedUpdates = [
            'email', 'name', 'title', 'phone', 'dob', 'address', 
            'bio', 'skills', 'college', 'marks', 'experience', 
            'profilePic', 'resume'
        ];

        // Check if user exists
        const existingUser = await userModel.findById(userId);
        if (!existingUser) {
            return errorFunction(404, false, "User not found", res);
        }

        const updateData = {};

        if (email !== undefined) {
            const emailExists = await userModel.findOne({ 
                email: email.toLowerCase().trim(), 
                _id: { $ne: userId } 
            });
            if (emailExists) {
                return errorFunction(409, false, "Email already exists", res);
            }
            updateData.email = email.toLowerCase().trim();
        }

        if (name !== undefined && name.trim()) {
            updateData.name = name.trim();
        }

        if (title !== undefined && title.trim()) {
            updateData.title = title.trim();
        }

        if (phone !== undefined && phone.trim()) {
            updateData.phone = phone.trim();
        }

        if (dob !== undefined) {
            updateData.dob = new Date(dob);
        }

        if (address !== undefined && address.trim()) {
            updateData.address = address.trim();
        }

        if (bio !== undefined) {
            updateData.bio = bio?.trim() || '';
        }

        if (college !== undefined && college.trim()) {
            updateData.college = college.trim();
        }

        if (marks !== undefined) {
            updateData.marks = parseFloat(marks);
        }

        if (experience !== undefined) {
            updateData.experience = experience || 0;
        }

        if (skills !== undefined) {
            let skillArray = [];
            if (typeof skills === 'string') {
                skillArray = skills.split(",")
                    .map(skill => skill.toUpperCase().trim())
                    .filter(skill => skill.length > 0);
            } else if (Array.isArray(skills)) {
                skillArray = skills
                    .map(skill => skill.toString().toUpperCase().trim())
                    .filter(skill => skill.length > 0);
            }
            updateData.skills = skillArray;
        }

        if (profilePicFile) {
            updateData.profilePic = profilePicFile.path;
        }

        if (resumeFile) {
            updateData.resume = resumeFile.path;
        }

        if (Object.keys(updateData).length === 0) {
            return errorFunction(400, false, "No valid fields provided for update", res);
        }

        // Update user
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            updateData,
            { 
                new: true, 
                runValidators: true 
            }
        );

        const userResponse = updatedUser.toObject();
        delete userResponse.password;

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: userResponse
        });

    } catch (error) {
        console.error('Update error:', error);
        return errorFunction(500, false, "Server error during update", res);
    }
};

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    profilePic:{
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    phone: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        // required: true
    },
    bio: {
        type: String,
    },
    skills: {
        type: [String],
        required: true
    },
    college: {
        type: String,
        required: true
    },
    marks: {
        type: String,
        required: true
    },
    experience: {
        type: String,
    },
},{ timestamps: true });

export const userModel = mongoose.model('User',userSchema);
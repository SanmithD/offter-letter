import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    publisherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    jobTitle: {
        type: String,
        required: true
    },
    jobEmail: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    requiredSkills: {
        type: [String],
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    place: {
        type: String,
        enum: ['Onsite','Remote','Hybrid'],
        default: 'Onsite'
    },
},{ timestamps: true });

export const jobModel = mongoose.model('Job',jobSchema);
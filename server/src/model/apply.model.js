import mongoose from "mongoose";

const applySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    publisherId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    expectedSalary: {
        type: String
    },
    noticePeriod: {
        type: Number
    }
},{ timestamps: true });

export const applyModel = mongoose.model('Apply',applySchema);
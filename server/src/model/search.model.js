import mongoose from "mongoose";

const searchSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    searchText: {
        type: String,
        required: true
    },
    jobId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }
},{ timestamps: true });

export const searchModel = mongoose.model("Search", searchSchema);
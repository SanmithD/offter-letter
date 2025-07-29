import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    publisherId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String
    }
},{ timestamps: true });

export const notificationModel = mongoose.model("Notification", notificationSchema);
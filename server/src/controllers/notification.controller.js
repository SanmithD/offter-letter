import { applyModel } from "../model/apply.model.js";
import { notificationModel } from "../model/notification.model.js";
import { errorFunction } from "../utils/error.util.js";

export const appliedNotification = async(userId, publisherId, jobId ) =>{
    try {
        const notification = new notificationModel({
            userId,
            jobId,
            publisherId,
            message: ''
        });

        if(!notification) return errorFunction(400, false, "Invalid request", res);
        await notification.save();
    } catch (error) {
        console.log(error);
        return errorFunction(500, false, "Server error", res);
    }
}

export const applyView = async(req, res) =>{
    const userId = req.user._id;
    try {
        const response = await notificationModel.find({ userId }).populate("jobId").sort({ createdAt: -1 })
        if(!response) return errorFunction(404, false, "Not found", res);
        res.status(200).json({
            success: true,
            message: "Application viewed",
            response
        });
    } catch (error) {
        console.log(error);
        errorFunction(500, false, "Server error",res);
    }
}

export const getNotification = async(req, res) =>{
    const userId = req.user._id;
    try {
        const response = await applyModel.find({ publisherId: userId }).populate("userId").populate("jobId");
         if(!response) return errorFunction(404, false, "Not found", res);

        res.status(200).json({
            success: true,
            message: `Application`,
            response
        });
    } catch (error) {
        console.log(error);
        errorFunction(500, false, "Server error",res);
    }
}

export const notify = async(req, res) =>{
    const { jobId } = req.params;
    const publisherId = req.user._id;
    try {
        const { userId } = await applyModel.findOne({ jobId, publisherId });
        const data = await userRes(userId, jobId);
        res.status(200).json({
            success: true,
            message: "Your application view by the member",
            data
        })
    } catch (error) {
        console.log(error);
    }
}

const userRes = async(userId, jobId) =>{
    try {
        const response = await notificationModel.findOne({ userId, jobId });
        if(!response) throw new Error("Not found")
        return response;
    } catch (error) {
        console.log(error);
        return error
    }
}

// const getInfo = async(userId, publisherId, jobId) =>{
//     try {
//         const response = await notificationModel.findOne({ userId, jobId });
//         if(!response) throw new Error("Not found");
//         return response;
//     } catch (error) {
//         console.log(error);
//         throw new Error("Server error");
//     }
// }
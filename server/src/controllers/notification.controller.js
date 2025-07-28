import { applyModel } from "../model/apply.model.js";
import { notificationModel } from "../model/notification.model.js";
import { errorFunction } from "../utils/error.util.js";

export const appliedNotification = async(userId, publisherId, jobId ) =>{
    try {
        const notification = new notificationModel({
            userId,
            jobId,
            publisherId,
        });

        if(!notification) return errorFunction(400, false, "Invalid request", res);
        await notification.save();
    } catch (error) {
        console.log(error);
        return errorFunction(500, false, "Server error", res);
    }
}

export const applyView = async(req, res) =>{
    const userId = req.user_id;
    try {
        const response = await notificationModel.findOne({ userId }).populate("jobId").sort({ createdAt: -1 })
        if(!response) return errorFunction(404, false, "Not found", res);

        res.status(200).json({
            success: true,
            message: `Your ${response.jobId.title} application has been view by the ${response.jobId.company} member `
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
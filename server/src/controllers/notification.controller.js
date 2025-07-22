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


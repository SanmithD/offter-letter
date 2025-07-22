import { notificationModel } from "../model/notification.model.js";

export const sendNotification = async(publisherId) =>{
    try {
        const response = await notificationModel.find({ publisherId }).populate("userId").populate("jobId").sort({ createdAt: -1 });
        if(!response) throw new Error("Not found");

        return response
    } catch (error) {
        console.log(error);
        throw new Error("Server error");
    }
}
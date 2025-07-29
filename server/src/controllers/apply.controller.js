import { applyModel } from "../model/apply.model.js";
import { jobModel } from "../model/job.model.js";
import { errorFunction } from "../utils/error.util.js";
import { sendNotification } from "../utils/sendNotification.util.js";
import { appliedNotification } from "./notification.controller.js";

export const applyToJob = async(req, res) =>{
    const userId = req.user._id;
    const { jobId } = req.params;
    const { expectedSalary, noticePeriod } = req.body;

    if(!userId) return errorFunction(403, false, "Unauthorized", res);

    try {
        const { publisherId } = await jobModel.findById(jobId).select("publisherId");

        const newApply = new applyModel({
            userId,
            publisherId,
            jobId,
            expectedSalary,
            noticePeriod
        });
        if(!newApply) return errorFunction(400, false, "Invalid request", res);
        await newApply.save();
        appliedNotification(userId, publisherId, jobId);
        sendNotification(publisherId);
        res.status(200).json({
            success: true,
            message: "Notification sended"
        })
    } catch (error) {
        console.log(error);
        return errorFunction(500, false, "Server error", res);
    }
}

export const getAppliedJobs = async(req, res) =>{
    const userId = req.user._id;
    if(!userId) return errorFunction(403, false, "Unauthorized", res);

    try {
        const response = await applyModel.find({ userId }).select("-publisherId").populate("userId").populate("jobId").sort({ createdAt: -1 });
        if(!response) return errorFunction(400, false, "Not found", res);

        res.status(200).json({
            success: true,
            message: "All applications",
            response
        });
    } catch (error) {
        console.log(error);
        return errorFunction(500, false, "Server error", res);
    }
}

export const getAppliedUser = async(req, res) =>{
    const { id } = req.params;
    const publisher = req.user._id;

    if(!publisher) return errorFunction(403, false, "Unauthorized", res);
    if(!id) return errorFunction(400, false, "Invalid request", res);

    try {
        const userDetail = await applyModel.findById(id).select("userId").populate("user");
        if(!userDetail) return errorFunction(404, false, "Not found", res);

        res.status(200).json({
            success: true,
            message: "User detail",
            userDetail
        });
    } catch (error) {
        console.log(error);
        return errorFunction(500, false, "Server error", res);
    }
}
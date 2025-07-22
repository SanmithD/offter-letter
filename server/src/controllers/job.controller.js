import { jobModel } from "../model/job.model.js";
import { errorFunction } from "../utils/error.util.js";

export const postJob = async(req, res) =>{

    const userId = req.user._id;
    const { jobTitle, jobEmail, description, company, role, requiredSkills = [], salary, type, location, place } = req.body;

    if(!userId) return errorFunction(403, false, "Unauthorized access", res);
    if(!jobTitle || !jobEmail || !company || !role || !requiredSkills || !type || !location || !place ) return errorFunction(404, false, "All fields are required", res);

    try {
        let skills = [];

        if( typeof requiredSkills === 'string' ){
            skills = requiredSkills.split(",").map(skill => skill.trim()).filter(skill =>  skill.length > 0); 
        }
        const newJob = new jobModel({
            publisherId: userId,
            jobEmail,
            jobTitle,
            requiredSkills : skills,
            type,
            role,
            location,
            place,
            salary,
            description,
            company
        });

        if(!newJob) return errorFunction(404, false, "Invalid request", res);
        await newJob.save();

        res.status(201).json({
            success: true,
            message: "Job posted",
            newJob
        });
    } catch (error) {
        console.log(error);
        return errorFunction(500, false, "Server error", res);
    }
}

export const removeJob = async(req, res) =>{
    const userId = req.user._id;
    const { id } = req.params;
    if(!userId) return errorFunction(403, false, "Unauthorized access", res);

    try {
        const response = await jobModel.findByIdAndDelete({ publisherId: userId, _id: id });
        if(!response) return errorFunction(404, false, "Invalid request", res);

        res.status(200).json({
            success: true,
            message: "Job removed",
            response
        });
    } catch (error) {
        console.log(error);
        return errorFunction(500, false, "Server error", res);
    }
}

export const getJob = async(req, res) =>{
    const { jobId } = req.body;
    const userId = req.user._id;

    if(!jobId || !userId) return errorFunction(403,false, "Invalid request", res);
    try {
        const response = await jobModel.findById(jobId);
        if(!response) return errorFunction(404, false, "Not found", res);

        res.status(200).json({
            success: true,
            message: "Job details",
            response
        });
    } catch (error) {
        console.log(error);
        return errorFunction(500, false, "Server error", res);
    }
}
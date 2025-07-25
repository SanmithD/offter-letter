import { tool } from '@langchain/core/tools';
import z from 'zod';
import { jobModel } from '../model/job.model.js';
import { searchModel } from '../model/search.model.js';
import { userModel } from '../model/user.model.js';

export const searchBySkill = tool(
    async({ userId }) => {
        try {
            const user = await userModel.findById(userId).select("skills").sort({ createdAt: -1 });
            if (!user || !user.skills || user.skills.length === 0) {
                throw new Error("User not found or has no skills");
            }
            
            const jobs = await jobModel.find({ 
                requiredSkills: { $in: user.skills } 
            });
            
            return {
                result: jobs,
                message: `Found ${jobs.length} jobs matching your skills`
            };
        } catch (error) {
            throw new Error(`Error searching jobs by skill: ${error.message}`);
        }
    },
    {
        name: "search_by_skill",
        description: "Find jobs that match the user's skills from their profile",
        schema: z.object({
            userId: z.string().describe("The user ID to get skills from")
        })
    }
);

export const searchBySalary = tool(
    async({ salary }) => {
        try {
            const jobs = await jobModel.find({ 
                salary: { $gte: salary } 
            }).sort({ createdAt: -1 });
            
            return {
                result: jobs,
                message: `Found ${jobs.length} jobs with salary >= ${salary}`
            };
        } catch (error) {
            throw new Error(`Error searching jobs by salary: ${error.message}`);
        }
    },
    {
        name: "search_by_salary",
        description: "Find jobs with salary greater than or equal to specified amount",
        schema: z.object({
            salary: z.number().describe("Minimum salary amount to search for")
        })
    }
);

export const searchJobs = tool(
    async({ query, location, jobType, userId }) => {
        try {
            let searchCriteria = {};
            
            if (query) {
                searchCriteria.$or = [
                    { jobTitle: { $regex: query, $options: 'i' } },
                    { company: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } }
                ];
            }
            
            if (location) {
                searchCriteria.location = { $regex: location, $options: 'i' };
            }
            
            if (jobType) {
                searchCriteria.type = jobType;
            }

            const jobs = await jobModel.find(searchCriteria).sort({ createdAt: -1 });
            if(query && query.trim()){
                const searchJob = new searchModel({
                    userId,
                    searchText: query
                });
                await searchJob.save();
            }
            
            return {
                result: jobs,
                message: `Found ${jobs.length} jobs matching your search criteria`
            };
        } catch (error) {
            throw new Error(`Error searching jobs: ${error.message}`);
        }
    },
    {
        name: "search_jobs",
        description: "General job search by title, company, description, location, or job type",
        schema: z.object({
            query: z.string().optional().describe("Search query for job title, company, or description"),
            location: z.string().optional().describe("Job location to filter by"),
            jobType: z.string().optional().describe("Job type (full-time, part-time, contract, etc.)")
        })
    }
);

export const searchPlaceJobs = tool(
    async({ place }) => {
        try {
            if (!place || typeof place !== 'string') {
                throw new Error("Enter valid query");
            }

            const validPlaces = ['Onsite', 'Remote', 'Hybrid'];
            
            if (!validPlaces.includes(place)) {
                throw new Error(`Invalid place type. Must be one of: ${validPlaces.join(', ')}`);
            }

            const response = await jobModel.find({ place: place }).sort({ createdAt: -1 });

            return {
                result: response,
                message: `Found ${response.length} ${place} jobs`
            };
        } catch (error) {
            console.log("Error in searchPlaceJobs:", error);
            throw new Error(error.message);
        }
    }, {
        name: "search_job_by_place",
        description: 'Find jobs by work location type: onsite, remote, or hybrid',
        schema: z.object({
            place: z.enum(['Onsite', 'Remote', 'Hybrid']).describe("Work location type (Onsite, Remote, Hybrid)")
        })
    }
);
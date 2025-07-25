import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { searchBySalary, searchBySkill, searchJobs, searchPlaceJobs } from "../tools/job.tool.js";
import { getProfileByAi } from "../tools/user.tool.js";

const model = new ChatGoogleGenerativeAI({
    model: 'gemini-1.5-flash',
    apiKey: process.env.GEMINI_API_KEY,
    maxRetries: 5,
    temperature: 0.7
});

export const agent = createReactAgent({
    llm: model,
    tools: [
        searchBySkill,
        searchBySalary,
        searchJobs,
        getProfileByAi,
        searchPlaceJobs
    ],
});

import { tool } from "@langchain/core/tools";
import z from "zod";
import { userModel } from "../model/user.model.js";

export const getProfileByAi = tool(
    async({ userId }) =>{
        try {
            const response = await userModel.findById(userId).select("-password");
            if(!response) throw new Error("Not found");

            return {
                result: response
            }
        } catch (error) {
            console.log(error);
            throw new Error("Server error")
        }
    },{
        name: "user_profile_data",
        description: "User profile information",
        schema: z.object({
            userId: z.string().describe("User id to fetch data")
        })
    }
);
import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const UseAgentStore = create((set) =>({
    isLoading: false,
    jobs: null,
    searchedJobs: null,

    getJobByAi: async() =>{
        set({ isLoading: true });
        try {
            const response = await axiosInstance.post('/agent',{ msg: "find jobs related to my skills" });
            console.log(response.data.jobs);
            set({ jobs: response.data.jobs });
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    },

    searchJob: async(msg) =>{
        set({ isLoading: true });
        try {
            const response = await axiosInstance.post('/agent',{msg});
            console.log(response.data);
            set({ searchedJobs: response.data.jobs })
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }
}))
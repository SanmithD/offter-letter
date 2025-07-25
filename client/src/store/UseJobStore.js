import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const UseJobStore = create((set, get) => ({
    isLoading: false,
    job: null,
    appliedJobs : null,
    isApplying : false,
    
    getAppliedJobs : async() =>{
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get('/apply/applications');
            set({ appliedJobs: response.data, isLoading: false });
        } catch (error) {
            console.log(error);
            set({ isLoading: false });
            toast.error("Something went wrong");
        }
    },

    applyJob: async({jobId},data) =>{
        set({ isApplying: true });
        try {
            await axiosInstance.post(`/apply/${jobId}`,data);
            set({ isApplying: false });
            toast.success("Successfully applied");
        } catch (error) {
            console.log(error);
            set({ isApplying: false });
            toast.error("Something went wrong")
        }
    },

    getJobById : async(jobId) =>{
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get(`/jobs/getJob/${jobId}`);
            set({ job: response.data.response, isLoading: false });
        } catch (error) {
            console.log(error);
            set({ isLoading: false });
            toast.error("Something went wrong")
        }
    },

    getJobs: async() =>{
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get('/jobs/');
            set({ isLoading: false, job: response.data.response });
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    },

    postJob: async(data) =>{
        set({ isLoading: true });
        try {
            await axiosInstance.post(`/jobs/postJob`,data);
            toast.success("Job posted");
            await get().getJobs();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }

}));
import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const UseJobStore = create((set) => ({
    isLoading: false,
    appliedJobs : null,
    isApplying : false,
    
    getAppliedJobs : async() =>{
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get('/apply/applications');
            console.log(response.data);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

}))
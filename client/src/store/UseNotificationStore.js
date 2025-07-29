import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const UseNotificationStore = create((set) =>({
    isLoading: false,
    notification: null,
    res: null,

    getInfo: async(jobId) =>{
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get(`/notification/inform/${jobId}`);
            console.log(response.data);
            set({ notification: response.data.response });
        } catch (error) {
            console.log(error);
            set({ isLoading: false });
            toast.error("Something went wrong");
        }
    },

    getApplication: async() =>{
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get(`/notification/get`);
            set({ notification: response.data.response });
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    },

    getRes : async() =>{
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get(`/notification/response`);
            set({ res: response.data.response });
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
            set({ isLoading: false });
        }
    }
}))
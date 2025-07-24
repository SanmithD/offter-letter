import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const UseAgentStore = create((set) => ({
  isLoading: false,
  activeFilter: null,
  jobs: null,
  searchedJobs: null,
  helpResponse : null,

  setActiveFilter: (filterId) => set({ activeFilter: filterId }),

  getJobByAi: async () => {
    set({ isLoading: true, activeFilter: null });
    try {
      const response = await axiosInstance.post("/agent", {
        msg: "find jobs related to my skills",
      });
      set({ jobs: response.data.jobs, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
      toast.error("Something went wrong");
    }
  },

  searchJob: async (msg) => {
    set({ isLoading: true, activeFilter: null });
    try {
      const response = await axiosInstance.post("/agent", { msg });
      set({ searchedJobs: response.data.jobs, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
      toast.error("Something went wrong");
    }
  },

  filterWorKPlace: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post("/agent", {
        msg: "Find all onsite jobs",
      });
      set({ jobs: response.data.jobs, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
      toast.error("Something went wrong");
    }
  },

  getHelp: async(msg) =>{
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post(`/agent`,{msg});
      set({ helpResponse: response.data.message, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
      toast.error("Something went wrong")
    }
  }
}));

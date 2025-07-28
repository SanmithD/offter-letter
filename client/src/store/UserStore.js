import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const UseAuthStore = create((set) => ({
  isSignup: false,
  isLogin: false,
  isLoading: false,
  success: false,
  isProfile: false,
  authUser: null,
  user: null,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        set({ isCheckingAuth: false, authUser: null });
        return;
      }

      const response = await axiosInstance.get("/auth/profile");
      if (response.data.success) {
        set({ authUser: response.data.data, isCheckingAuth: false });
      } else {
        localStorage.removeItem("token");
        set({ authUser: null, isCheckingAuth: false });
      }
    } catch (error) {
      localStorage.removeItem("token");
      console.log(error);
      set({ authUser: null, isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      const response = await axiosInstance.post("/auth/signup", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        set({ authUser: response.data.data, isSignup: false, success: true });
        toast.success("Signup successful");
      } else {
        set({ isSignup: false });
        toast.error(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.log(error);
      set({ isSignup: false });
      toast.error("Something went wrong");
    }
  },

  login: async (data) => {
    set({ isLogin: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        set({ authUser: response.data.data, isLogin: false, success: true });
        toast.success("Login successful");
      } else {
        set({ isLogin: false });
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      set({ isLogin: false });
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  },

  logout: async () => {
    try {
      localStorage.removeItem("token");
      set({ authUser: null, success: true });
      toast.success("Successfully logout");
    } catch (error) {
      console.log(error);
    }
  },

  deleteUser: async () => {
    set({ isLogin: true });
    try {
      const response = await axiosInstance.delete("/auth/delete");
      console.log(response);
      set({ isLogin: false, authUser: null, success: true });
      localStorage.removeItem("token");
    } catch (error) {
      set({ isLogin: false });
      console.log(error);
      toast.error("Something went wrong");
    }
  },

  profile: async () => {
    try {
      const response = await axiosInstance.get("/auth/profile");
      set({ authUser: response.data.data });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  },

  getUserById: async(userId) =>{
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/auth/getUser/${userId}`);
      set({ isLoading: false, user: response.data.response });
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
      toast.error("Something went wrong");
    }
  }
}));

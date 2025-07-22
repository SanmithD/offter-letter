import toast from 'react-hot-toast';
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

export const UseAuthStore = create((set) =>({
    isSignup: false,
    isLogin: false,
    success: false,
    isProfile: false,
    authUser: null,

    signup: async(data) =>{
        set({ isSignup: true });
        try {
            const response = await axiosInstance.post('/auth/signup',data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    },

    login: async(data) =>{
        set({ isLogin: true });
        try {
            const response = await axiosInstance.post('/auth/login', data);
            if(response.data.success) {
                localStorage.setItem('token', response.data.token);
                set({ authUser: response.data.data, isLogin: false, success: true });
                toast.success("Login successful");
            } else {
                set({ isLogin: false });
                toast.error(response.data.message || "Login failed");
            }
        } catch (error) {
            console.log(error);
            set({ isLogin: false });
            const errorMessage = error.response?.data?.message || "Something went wrong";
            toast.error(errorMessage);
        }
    },

    logout: async() =>{
        try {
            localStorage.removeItem('token');
            set({ authUser: null, success: true });
            toast.success("Successfully logout")
        } catch (error) {
            console.log(error);
        }
    },

    profile : async() =>{
        try {
            const response = await axiosInstance.get('/auth/profile');
            console.log(response.data);
            set({ authUser: response.data.data})
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
        }
    }
}))
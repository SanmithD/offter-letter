import { create } from "zustand";

export const UseThemeStore = create((set) => ({
    theme : localStorage.getItem('theme') || 'light',

    setTheme: (newTheme) =>{
        localStorage.setItem('theme',newTheme);
        set({ theme: newTheme });
    }
}))
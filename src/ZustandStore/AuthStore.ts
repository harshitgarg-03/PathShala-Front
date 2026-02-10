import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthSoreProp } from "../Types";
import { api } from "../lib/api";

export const useAuth = create<AuthSoreProp>()(
  persist(
    (set) => ({
      isAuthenticate: false,
      isLoading: false,
      user: null,
      isBooting: false,
      error: null,

      
      CurrentUser: async () => {
        try {
          const res = await api.get("/get/me");
          const token = localStorage.getItem("token");
          if (token) {
            set({ isAuthenticate: true });
          }
          set({ user: res.data });
        } catch (error: any) {
          set({ error: error.data, isAuthenticate: false });
        }
      },

      Register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const { name, email, password } = data;

          const res = await api.post("/register", {
            name,
            email,
            password,
          });
          set({ user: res.data, isLoading: false, error: null });
        } catch (error: any) {
          set({ isLoading: false, error: error });
        }
      },

      Login: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const { email, password } = data;
          const res = await api.post("/login", {
            email,
            password,
          });
          set({ user: res.data, isLoading: false });
        } catch (error: any) {
          set({ error: error.data, isLoading: false });
        }
      },

      Logout: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await api.post("/logout");
          set({ isLoading: false, error: null, isAuthenticate: false });

          
        } catch (error: any) {
          set({ error: error.data, isLoading: false });
        }
      },

      handleGoogleLogin: async () => {
        set({isAuthenticate : false});
        try {
          const res = await api.get("/google");
          window.location.href = res.data.url;
          set({isAuthenticate : true})
        } catch (error: any) {
          set({ error: error.data });
        }
      },
    }),
    {
      name: "Auth-Storage",
    },
  ),
);

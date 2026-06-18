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
      isBooting: true,
      error: null,

      CurrentUser: async () => {
        set({ isBooting: true });

        try {
          const res = await api.get("/get/me");

          set({
            user: res.data.data,
            isAuthenticate: true,
            isBooting: false,
          });
        } catch (error: any) {
          set({
            // error: error.response?.data?.message || "Auth failed",
            isAuthenticate: false,
            isBooting: false,
          });
        }
      },

      Register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const res = await api.post("/register", data);
          set({ user: res.data.data, isLoading: false, error: null });
          return true;
        } catch (error: any) {
          set({
            isLoading: false,
            error: error?.response?.data?.message || "Register Failed",
          });
          return false;
        }
      },

      Login: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const res = await api.post("/login", data);
          
          set({ user: res.data.data, isLoading: false, isAuthenticate: true });
        } catch (error: any) {
          set({
            error: error?.response?.data?.message || "Login Failed",
            isLoading: false,
          });
        }
      },

      Logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await api.post("/logout");
          set({ isLoading: false, error: null, user: null, isAuthenticate: false });
        } catch (error: any) {
          set({
            error: error?.response?.data?.message || "Logout Failed",
            isLoading: false,
          });
        }
      },

      handleGoogleLogin: async () => {
        try {
          const res = await api.get("/google");
          window.location.href = res.data.url;
        } catch (error: any) {
          set({
            error: error?.response?.data?.message || "Google Login Failed",
          });
        }
      },
    }),
    {
      name: "Auth-Storage",
      partialize: (state) => ({
          isAuthenticate: state.isAuthenticate,
          user: state.user,
      }),
    },
  ),
);

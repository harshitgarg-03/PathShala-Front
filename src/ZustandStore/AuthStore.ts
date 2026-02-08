import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthSoreProp } from "../Types";
import { api } from "../lib/api";

export const useAuth = create<AuthSoreProp>()(
  persist(
    (set, get) => ({
      isAuthenticate: false,
      isLoading: false,
      user: null,
      isBooting: false,
      error: null,

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
          set({ user: res.data, isAuthenticate: true, isLoading: false });
        } catch (error: any) {
          set({ error: error.data, isLoading: false });
        }
      },

      handleGoogleLogin: async () => {
        const res = await api.get("/google");
        window.location.href = res.data.url;
      },
    }),
    {
      name: "Auth-Storage",
    },
  ),
);

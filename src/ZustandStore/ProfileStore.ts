import { create } from "zustand";
import type { ProfileProp } from "../Types";
import { api } from "../lib/api";
import { useAuth } from "./AuthStore";

export const UseProfile = create<ProfileProp>((set) => ({
  isLoading: false,
  error: null,
  isEducator: false,

  UpdateProfile: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const res = await api.post("/UpdateProfile", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      useAuth.setState({
        user: res.data.data,
      });

      set({ isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error:
          error.response?.data?.message || "Profile update failed",
      });
    }
  },

  changedpassword: async (data) => {
    set({ isLoading: true, error: null });

    try {
      await api.post("/changed-password", data);

      set({ isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error:
          error.response?.data?.message || "Password change failed",
      });
    }
  },

  // on logout 
  resetProfile: () => {
    set({
      isLoading: false,
      error: null,
      isEducator: false,
    });
  },
}));
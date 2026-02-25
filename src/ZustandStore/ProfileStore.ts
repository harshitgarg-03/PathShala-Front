import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProfileProp } from "../Types";
import { api } from "../lib/api";
import { useAuth } from "./AuthStore";

export const UseProfile = create<ProfileProp>()(
  persist(
    (set, get) => ({

      isLoading: useAuth.getState().isLoading,
      error: useAuth.getState().error,
      isEducator: false,
      UpdateProfile: async (data) => {
      //  console.log("daata ", data.getAll("firstname"));
        console.log("daats", data.get("name"));
        console.log("daats", data.get("firstname"));
        
        set({ isLoading: true });
        try {
          const res = await api.post("/UpdateProfile", data, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          });
          useAuth.setState({
            user: res.data.data
          })
          set({ isLoading: false });
        } catch (error: any) {
          set({ isLoading: false, error: error.data });
        }
      }, 
      
      changedpassword: async(data) => {
        set({ isLoading: true });
        try {
          const res = await api.post("/changed-password", data);
          set({ isLoading: false });
        } catch (error: any) {
          set({ isLoading: false, error: error.data });
        }
      }
    }),
    {
      name: "Profile-Store",
    },
  ),
);

import { create } from "zustand";
import type { StoreProp } from "../Types";
import { dummyCourses } from "../Data/assets";

export const useStore = create<StoreProp>((set) => ({
  courses: null,
  currency: "$",
  FetchAllCourses: async () => {
    set({
      courses: dummyCourses,
    });
  },
}));

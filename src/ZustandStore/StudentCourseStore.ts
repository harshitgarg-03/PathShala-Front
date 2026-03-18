import { create } from "zustand";
import { api } from "../lib/api";
import type { studentStoreprop } from "../Types";

export const StudentCourseStore = create<studentStoreprop>((set, get) => ({
  publishedCourses: null,
  status: "ideal",
  error: null,

  getPublishedCourse: async (force = false) => {
    const { publishedCourses, status } = get();

    if (publishedCourses && !force) return;
    if (status === "loading") return;

    set({ status: "loading", error: null });

    try {
      const res = await api.get("/get-published-courses");
      
      set({
        publishedCourses: res.data.data.course,
        status: "success",
      });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || "Failed to fetch published courses",
        status: "error",
      });
    }
  },
}));

import { create } from "zustand";
import { api } from "../lib/api";
import type { course, CourseStoreProp } from "../Types";
import { StudentCourseStore } from "./StudentCourseStore";
import { useAuth } from "./AuthStore";

export const CourseStore = create<CourseStoreProp>((set, get) => ({
  currency: "$",
  specificCourseId: null,
  UserFetchedCourse: null,
  UserPurchasedCourse: null,
  courses: null,
  specificCourse: null,
  specificSection: null,
  enrollCourse: null,
  isLoading: false,
  error: null,

  FetchAllCourse: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get("/getallCourse");
      set({ courses: res.data.data.course, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch courses",
        isLoading: false,
      });
    }
  },

  FetchSpecificCourse: (id) => {
    set({ isLoading: true });
    const AllCourses =
      get().courses || StudentCourseStore.getState().publishedCourses;

    if (!AllCourses) return;

    const course = AllCourses.find((item) => item._id === id);
    set({ specificCourse: course, specificCourseId: id, isLoading: false });
  },

  FetchSpecificSection: (id) => {
    const course = get().specificCourse;

    if (!course) return;

    const section = course.sections?.find((item) => item._id === id);

    set({ specificSection: section });
  },

  CreateCourse: async (formdata) => {
    set({ isLoading: true, error: null });

    try {
      const res = await api.post("/createCourse", formdata);
      set((state) => ({
        courses: state.courses
          ? [res.data.data, ...state.courses]
          : [res.data.data],
        specificCourse: res.data.data,
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Course creation failed",
      });
    }
  },

  updateCourse: async (courseId, data) => {
    set({ isLoading: true, error: null });

    try {
      await api.put(`/updateCourse/${courseId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedCourses = get().courses?.map((course) =>
        course._id === courseId
          ? { ...course, ...Object.fromEntries(data) }
          : course,
      );
      set({
        courses: updatedCourses || null,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "update Failed",
      });
    }
  },

  DeleteCourse: async (courseId) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/deleteCourse/${courseId}`);
      const filteredCourses = get().courses?.filter(
        (course) => course._id !== courseId,
      );

      set({
        courses: filteredCourses || null,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Delete failed",
      });
    }
  },

  AddSection: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await api.post(`/createSection/${data.courseId}`, data);
      set({ isLoading: false });
      return true;
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Section creation failed",
      });
      return false;
    }
  },

  AddLecture: async (formdata) => {
    set({ isLoading: true, error: null });
    const courseId = formdata.get("courseId");
    const sectionId = formdata.get("sectionId");
    try {
      const res = await api.post(
        `/createLecture/${courseId}/${sectionId}`,
        formdata,
      );
      set({ isLoading: false });
      return res.data;
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Lecture creation failed",
      });
    }
  },

  GetManageCourse: async () => {
    set({ isLoading: true, error: null });
    const user = useAuth.getState().user;

    if (!user) {
      set({ isLoading: false });
      return;
    }

    try {
      const Course = get().courses;
      const FetchCourse = get().FetchAllCourse;
      await FetchCourse();
      console.log("mabagr courses are ", Course);

      if (!Course) return;
      const instructorCourses = Course?.filter(
        (item) => item.instructor?._id === user._id,
      );

      set({ UserFetchedCourse: instructorCourses, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error:
          error.response?.data?.message || "Failed to fetch instructor courses",
      });
    }
  },

  GetPurchaseCoures: async () => {
    set({ isLoading: true, error: null });
    const user = useAuth.getState().user;
    if (!user) {
      set({ isLoading: false });
      return;
    }
    try {
      const res = await api.get("/getPurchasedCourse");
      console.log("res data from getpurchase is", res.data.data);

      const allcourse = res.data.data.map((item) => item.course);
      console.log("all course id", allcourse);

      set({ UserPurchasedCourse: allcourse, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error:
          error.response?.data?.message || "Failed to fetch Puchased courses",
      });
    }
  },

  GetEnrolledCourse: async () => {
    set({ isLoading: true, error: null });
    const user = useAuth.getState().user;
    if (!user) {
      set({ isLoading: false });
      return;
    }
    try {
      // console.log("hello ji ");

      const res = await api.get("/getEnrollCourse");
      // console.log("res data from getenrool is", res.data.data);

      set({ enrollCourse: res.data.data, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error:
          error.response?.data?.message || "Failed to fetch enrolled courses",
      });
    }
  },
}));

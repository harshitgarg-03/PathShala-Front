import { create } from "zustand";
import { api } from "../lib/api";
import type { CourseStoreProp } from "../Types";
import { StudentCourseStore } from "./StudentCourseStore";
import { useAuth } from "./AuthStore";
import { useEffect } from "react";

export const CourseStore = create<CourseStoreProp>((set, get) => ({
  UserFetchedCourse : null,
  currency: "$",
  courses: null,
  specificCourse: null,
  isLoading: false,
  error: null,
  specificSection: null,
  FetchAllCourse: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get("/getallCourse");      
      set({ courses: res.data.data.course, isLoading: false });
    } catch (error: any) {
      console.log(error);
      set({ error: error.data, isLoading: false });
    }
  },

  FetchSpecificCourse: async (id) => {
    set({ isLoading: true });
    try {
      const AllCourses = get().courses || StudentCourseStore.getState().publishedCourses;
      console.log(AllCourses);
      
      if (AllCourses) {
        const course = AllCourses.find((item) => item._id == id);
        console.log("telling", course);

        set({ specificCourse: course, isLoading: false });
      }
    } catch (error: any) {
      console.log(error);
      set({ error: error.data, isLoading: false });
    }
  },

  FetchSpecificSection: async (id) => {
    set({ isLoading: true });
    try {
      const SpecificCourse = await get().specificCourse;
      const section = await SpecificCourse?.sections.filter(
        (item) => item._id == id,
      );
      set({ specificSection: section![0], isLoading: false });
    } catch (error: any) {
      console.log(error);
      set({ error: error.data, isLoading: false });
    }
  },

  CreateCourse: async (formdata) => {
    set({ isLoading: true });
    // console.log("form data in createccourse ", formdata.get("title"));
    
    try {
      const res = await api.post("/createCourse", formdata);
      set({ isLoading: false, specificCourse: res.data.data });
    } catch (error: any) {
      set({ isLoading: false, error: error.data });
    }
  },
 
  updateCourse: async (courseId, data) => {
    set({ isLoading: true, error: null });
    console.log("updating adta ", data.get("title"));
    
    try {
      await api.put(`/updateCourse/${courseId}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      await get().FetchAllCourse();
      set({ isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.data });
    }
  },
  
  DeleteCourse : async(courseId) => {
    set({isLoading: true});
    try {
      const res = await api.delete(`/deleteCourse/${courseId}`);
    } catch (error: any) {
      set({isLoading: false, error : error.data})
    }
  },

  AddSection: async (data) => {
    set({ isLoading: true });
    try {
      const res = await api.post(`/createSection/${data.courseId}`, data);
      set({ isLoading: false });
      return true;
    } catch (error: any) {
      set({ isLoading: false, error: error.data });
      return false;
    }
  },

  AddLecture: async (formdata) => {
    set({ isLoading: true });
    const courseId = formdata.get("courseId");
    const sectionId = formdata.get("sectionId");
    try {
      const res = await api.post(
        `/createLecture/${courseId}/${sectionId}`,
        formdata,
      );
      return res.data;
    } catch (error: any) {
      set({ isLoading: false, error: error.data });
    }
  },

  GetManageCourse: async () => {
    set({isLoading: true})
    const user = useAuth.getState().user;
    const fetchallcourse = get().FetchAllCourse;
    await fetchallcourse();
    
    try {

      const Course = await get().courses;
      const userCourse = Course?.filter((item) => (item.instructor._id == user?.data._id)); 
      
      set({UserFetchedCourse : userCourse, isLoading: false});
    } catch (error: any) {
      set({ isLoading: false, error: error.data });
    }
  }
}));

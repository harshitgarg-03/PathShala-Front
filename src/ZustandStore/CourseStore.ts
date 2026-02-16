import { create } from "zustand";
import { api } from "../lib/api";
import type { CourseStoreProp } from "../Types";

export const CourseStore = create<CourseStoreProp>((set, get) => ({
    currency:'$',
    courses: null,
    specificCourse: null,
    isLoading: false,
    error: null,
    FetchAllCourse: async() => {
        set({isLoading : true});
        try {
            const res = await api.get("/getallCourse")
            set({courses : res.data.data.course, isLoading: false});
        } catch (error: any) {
            console.log(error);
            set({error: error.data, isLoading: false})
        }
    },

    FetchSpecificCourse: async(id) => {
        set({isLoading : true});
        try {
            const AllCourses = get().courses;
            if(AllCourses){
                const course = AllCourses.find((item) => item._id == id); 
                // console.log("telling", course[0]);
                               
                set({specificCourse: course,  isLoading: false})
            }
        } catch (error: any) {
            console.log(error);
            set({error: error.data, isLoading: false})
        }
    },

    CreateCourse: async(formdata) => {
        set({isLoading: true})
        try {
            const res = await api.post("/createCourse", formdata)
            set({isLoading: false, specificCourse: res.data.data});
        } catch (error: any) {
            set({isLoading: false, error: error.data})
        }
    },

    AddSection: async(data) => {
        set({isLoading: true})
        try {
            const res = await api.post(`/createSection/${data.courseId}`,
                data
            )
            set({ isLoading: false })
            return true;
        } catch (error: any) {
            set({isLoading: false, error : error.data})
            return false;
        }
    },

    AddLecture: async(data) => {
        set({isLoading: true});
        try {
            const res = await api.post(`/createLecture/${data.courseId}/${data.sectionId}`,
                data
            )
        } catch (error: any) {
            set({isLoading: false})
        }
    }
}))
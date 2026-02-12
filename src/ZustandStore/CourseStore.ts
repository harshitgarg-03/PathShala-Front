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
                const course = AllCourses.filter((item) => item._id == id);
                set({specificCourse: course[0],  isLoading: false})
            }
        } catch (error: any) {
            console.log(error);
            set({error: error.data, isLoading: false})
        }
    },

    CreateCourse: async() => {
        set({isLoading: true})
        try {
            const res = api.post("/createCourse", {
                 
            })
            set({isLoading: false})
        } catch (error: any) {
            set({isLoading: false, error: error.data})
        }
    }

}))
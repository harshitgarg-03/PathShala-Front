import { create } from "zustand";
import type { AnalyticsStoreProp } from "../Types";
import { CourseStore } from "./CourseStore";

export const AnalyticsStore = create<AnalyticsStoreProp>((set, get) => ({
    TotalIncomefromCourses: 0,
    TotalStudents: 0, 
    AvgCoursePrice: 0,
    TotalCourse: 0, 
    AverageRating: 0,  
    TotalRevenue : () => {
        const UserFetchedCourse = CourseStore.getState().UserFetchedCourse;
        let TotalStudentsCourse = 0;
        let AvgRating = 0;
        let TotalCourse = UserFetchedCourse?.length;
        const income = UserFetchedCourse?.reduce((sum: number, course) => { 
            TotalStudentsCourse += course?.enrollStudents.length;    
            AvgRating += course?.averageRating;                    
            return (sum + (parseFloat(course?.price) | 0));
        }, 0)

        let avgRating = AvgRating/TotalStudentsCourse;        
        if (Number.isNaN(avgRating)) {
            console.log("Hello");
            avgRating = 0;
        }
        set({TotalIncomefromCourses: income, 
            TotalStudents: TotalStudentsCourse,
            AvgCoursePrice: (income!/TotalCourse!),
            AverageRating: avgRating
        })
    },
    
}))
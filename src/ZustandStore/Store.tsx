import { create } from "zustand";
import type { StoreProp } from "../Types";
import { dummyCourses } from "../Data/assets";
import { useParams } from "react-router-dom";
import CourseDetails from "../Pages/Student/CourseDetails";

export const useStore = create<StoreProp>((set, get) => ({
  SpecificCourse: null,
  courses: null,
  currency: "$",
  FetchAllCourses: async () => {
    set({
      courses: dummyCourses,
    });
  },

  CourseRatingFunction: (Courses) => {
    if (Courses.courseRatings.length == 0) return 0;

    let TotalRating = 0;

    Courses.courseRatings.map((user) => (TotalRating += user.rating));

    return (TotalRating / Courses.courseRatings.length);
  },

  CourseDetailFunc : (id) => {
    const courses = get().courses;
    if(courses){
      const pickcourse =courses.filter((item) => item._id == (id as unknown as string));
      set({
        SpecificCourse : pickcourse[0]
      })
    }
  }
  
}));

import { create } from "zustand";
import type { StoreProp } from "../Types";
import { dummyCourses } from "../Data/assets";
import { useNavigate } from "react-router-dom";

export const useStore = create<StoreProp>((set) => ({
  courses: null,
  currency: "$",
  FetchAllCourses: async () => {
    set({
      courses: dummyCourses,
    });
  },

  // navigate: useNavigate(),

  CourseRatingFunction: (Courses) => {
    if (Courses.courseRatings.length == 0) return 0;

    let TotalRating = 0;

    Courses.courseRatings.map((user) => (TotalRating += user.rating));

    return (TotalRating / Courses.courseRatings.length);
  },
}));

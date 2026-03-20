import { create } from "zustand";
import type { StoreProp } from "../Types";
import { dummyCourses } from "../../public/assets";
import { persist } from "zustand/middleware";

export const useStore = create<StoreProp>()(
  persist(
    (set, get) => ({
      isLoading: false,
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

        return TotalRating / Courses.courseRatings.length;
      },

      CourseDetailFunc: async(id) => {
        const courses = get().courses;
        set({isLoading : true});
        if (courses) {
          const pickcourse = await courses.filter(
            (item) => item._id == (id as unknown as string),
          );
          set({
            SpecificCourse: pickcourse[0],isLoading : false
          });
        }
      },
    }),
    {
      name: "Course-Storing",
    },
  ),
);

import { create } from "zustand";
import { CourseStore } from "./CourseStore";
import type { AnalyticsStoreProp } from "../Types";

export const AnalyticsStore = create<AnalyticsStoreProp>((set) => ({
  TotalIncomefromCourses: 0,
  TotalStudents: 0,
  AvgCoursePrice: 0,
  TotalCourse: 0,
  AverageRating: 0,

  TotalRevenue: () => {
    const courses = CourseStore.getState().UserFetchedCourse;

    if (!courses || courses.length === 0) return;

    let totalStudents = 0;
    let totalRating = 0;
    let totalCourses = courses.length;

    const income = courses.reduce((sum, course) => {
      const students = course.enrollStudents?.length || 0;
      const price = parseFloat(course.price || "0");

      totalStudents += students;
      totalRating += course.averageRating || 0;

      return sum + price * students;
    }, 0);

    set({
      TotalIncomefromCourses: income,
      TotalStudents: totalStudents,
      AvgCoursePrice: totalCourses ? income / totalCourses : 0,
      AverageRating: totalCourses ? totalRating / totalCourses : 0,
    });
  },
}));
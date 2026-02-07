import { useStore } from "../../ZustandStore/Store";
import CourseCard from "../../Componets/Student/CourseCard";
import { useEffect } from "react";

function CoursesList() {
  const Courses = useStore((s) => s.courses);
  const FetchCourses = useStore((s) => s.FetchAllCourses);

  useEffect(() => {
    FetchCourses();
  }, []);
  // console.log("In list ", Courses);

  return (
    <>
    <div className={`grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4

    gap-4 sm:gap-6 md:gap-8
    mt-10

    px-4 sm:px-6 md:px-8 mb-10`} >
      {Courses ? Courses.map((Course, i) => <CourseCard course={Course} key={i} />) : ""}

    </div>
    </>
  );
}

export default CoursesList;

// import type { dummyCoursesProp } from "../../Types";
import { Link } from "react-router-dom";
import type { dummyCoursesProp } from "../../Types";
import { useStore } from "../../ZustandStore/Store";
import CourseCard from "./CourseCard";
import { useEffect } from "react";

function CouseSection() {
  const Fetchcourses = useStore((s) => s.FetchAllCourses);
  const dummycourses = useStore((s) => s.courses);

  useEffect(() => {
    Fetchcourses();
  }, []);

  return (
    <div className="mt-24 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="flex flex-col justify-center items-center text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-sans">
          Learn from the best
        </h1>

        <p className="text-base sm:text-lg text-gray-700 font-medium mt-6 sm:mt-8 font-sans leading-relaxed">
          Discover our top-rated courses across various categories. From coding
          and design to business and wellness, our courses are crafted to
          deliver results.
        </p>
      </div>
    <div className="text-right w-full mt-8">
<Link
        to="/Course-List"
        className="text-blue-700 font-normal text-lg hover:text-blue-400 transition-colors duration-300"
      >
        View All →
      </Link>
    </div>
      

      {/* Cards Grid */}
      <div
        className="grid
  grid-cols-1
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4
  gap-6 sm:gap-8
  mt-4"
      >
        {dummycourses
          ? dummycourses
              .slice(0, 4)
              .map((course: dummyCoursesProp, i: number) => (
                <CourseCard course={course} key={i} />
              ))
          : null}
      </div>

      {/* View All */}
      <div className="flex justify-center mt-12"></div>
    </div>
  );
}

export default CouseSection;

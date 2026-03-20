import CourseCard from "../../Componets/Student/CourseCard";
import { useEffect, useMemo } from "react";
import SearchBar from "../../Componets/Student/SearchBar";
import Wrapper from "../../Componets/ReuseCompo/Wrapper";
import { useNavigate, useParams } from "react-router-dom";
import cross from "../../../public/cross_icon.svg";
import { StudentCourseStore } from "../../ZustandStore/StudentCourseStore";

function CoursesList() {
  const courses = StudentCourseStore((s) => s.publishedCourses);
  const status = StudentCourseStore((s) => s.status);
  const fetchCourses = StudentCourseStore((s) => s.getPublishedCourse);

  const { input } = useParams();
  const navigate = useNavigate();
  console.log("courses", courses);
  
  const isSpecificCourse = !!input;

  // 🔹 Fetch only once (store has caching)
  useEffect(() => {
    fetchCourses();
  }, []);

  // 🔹 Filtered courses (derived state)
  const filteredCourses = useMemo(() => {
    if (!courses) return [];

    if (!input) return courses;

    return courses.filter((item) =>
      item.title.toLowerCase().includes(input.toLowerCase())
    );
  }, [courses, input]);

  return (
    <Wrapper>
      {/* 🔹 Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-6 mb-6 px-2 sm:px-4 py-12">
        <div className="ml-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">
            Courses
          </h1>

          <p className="text-sm">
            <span
              className="text-blue-800 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </span>{" "}
            |{" "}
            <span
              onClick={() =>
                isSpecificCourse ? navigate("/Course-List") : null
              }
              className="cursor-pointer"
            >
              Course-list
            </span>
          </p>
        </div>

        <SearchBar />
      </div>

      {/* 🔹 Active Filter Tag */}
      {input && (
        <div className="flex items-center ml-10 gap-3 bg-white shadow-md rounded-lg px-4 py-2 w-fit border border-gray-200 hover:shadow-lg transition">
          <p className="text-gray-700 font-medium text-sm">{input}</p>
          <img
            src={cross}
            alt="clear"
            onClick={() => navigate("/Course-List")}
            className="w-4 h-4 cursor-pointer hover:scale-110 transition"
          />
        </div>
      )}

      {/* 🔹 Loading State */}
      {status === "loading" && (
        <p className="text-center mt-10 text-gray-500">
          Loading courses...
        </p>
      )}

      {/* 🔹 Empty State */}
      {status === "success" && filteredCourses.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No courses found.
        </p>
      )}

      {/* 🔹 Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-10 px-4 sm:px-6 md:px-8 mb-10">
        {filteredCourses.map((course) => (
          <CourseCard course={course} key={course._id} />
        ))}
      </div>
    </Wrapper>
  );
}

export default CoursesList;
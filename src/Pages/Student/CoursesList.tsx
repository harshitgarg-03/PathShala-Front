import { useStore } from "../../ZustandStore/Store";
import CourseCard from "../../Componets/Student/CourseCard";
import { useEffect, useState } from "react";
import SearchBar from "../../Componets/Student/SearchBar";
import Wrapper from "../../Componets/ReuseCompo/Wrapper";
import { useNavigate, useParams } from "react-router-dom";
import type { dummyCoursesProp } from "../../Types";
import cross from "../../Data/cross_icon.svg";

function CoursesList() {
  const Courses = useStore((s) => s.courses);
  const FetchCourses = useStore((s) => s.FetchAllCourses);
  const { input } = useParams();
  const navigate = useNavigate();
  const [FilterData, setFilterData] = useState<dummyCoursesProp[]>([]);
  const isSpecificCourse = !!input;
  
  useEffect(() => {
    FetchCourses();
  }, []);
  console.log(input);

  useEffect(() => {
    if (Courses && Courses.length > 0) {
      const tempCourses = Courses.slice();

      input
        ? setFilterData(
            tempCourses.filter((item) =>
              item.courseTitle.toLowerCase().includes(input.toLowerCase()),
            ),
          )
        : setFilterData(tempCourses);
    }
  }, [Courses, input]);
  return (
    <>
      <Wrapper>
        <div
          className={`flex flex-col sm:flex-row
  justify-between
  items-center
  gap-2 sm:gap-6
  mb-6
  px-2 sm:px-4 py-12`}
        >
          <div className="ml-8">
            <h1
              className={`text-2xl sm:text-3xl md:text-4xl font-semibold font-sans mb-2 text-gray-800`}
            >
              Courses
            </h1>
            <p className="text-sm">
              {" "}
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
                {" "}
                Course-list{" "}
              </span>
            </p>
          </div>
          <SearchBar inputSearch={input} />
        </div>

        {input && (
          <div
            className={`flex items-center ml-10 justify-between gap-3 
                  bg-white shadow-md rounded-lg 
                  px-4 py-2 w-fit 
                  border border-gray-200
                  hover:shadow-lg transition`}
          >
            <p className={`text-gray-700 font-medium text-sm`}>{input}</p>
            <img
              src={cross}
              alt=""
              onClick={() => navigate("/Course-List")}
              className={`w-4 h-4 cursor-pointer 
                 hover:scale-110 transition`}
            />
          </div>
        )}
        <div
          className={`grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4

    gap-4 sm:gap-6 md:gap-8
    mt-10

    px-4 sm:px-6 md:px-8 mb-10`}
        >
          {FilterData
            ? FilterData.map((Course, i) => (
                <CourseCard course={Course} key={i} />
              ))
            : ""}
        </div>
      </Wrapper>
    </>
  );
}

export default CoursesList;

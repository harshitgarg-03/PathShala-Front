import { assets } from "../../Data/assets.ts";
import type { course } from "../../Types/index.js";
import { useNavigate } from "react-router-dom";
import { CourseStore } from "../../ZustandStore/CourseStore.ts";

function CourseCard( { course }: { course: course } ) {
  const currency = CourseStore((s) => s.currency);
  const navigate = useNavigate();
  
  const url = window.location.href
  const urlword = url.split("/").pop();
  
  const HandlecourseCard = () => {
    if(urlword != "My-Enroll"){
      navigate(`/Course-Details/${course._id}`);
    }
  };

  return (
    <div
      className="w-full sm:w-64 md:w-72 lg:w-80
    border border-blue-200
    rounded-xl overflow-hidden
    bg-white shadow-sm hover:shadow-lg 
    transition cursor-pointer"
      onClick={HandlecourseCard}
    >
      <div className="w-full h-40 sm:h-44 p-2 md:h-48 overflow-hidden">
        <img
          src={course.thumbnail}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 space-y-2">
        <h1 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2">
          {course.title}
        </h1>

        <div
          className="text-sm text-gray-600 line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: course.description,
          }}
        ></div>

        <div className="flex items-center gap-1 text-sm">
          <p className="font-medium text-gray-700">{course.averageRating}</p>

          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={
                  i < Math.floor(course.averageRating!)
                    ? assets.star
                    : assets.star_blank
                }
                alt=""
                className="h-4 w-4"
              />
            ))}
          </div>

          <p className="text-gray-500 ml-1">{course?.reviews?.length}</p>
        </div>

        {/* Price */}
        <div className="pt-2">
          <p className="text-lg font-bold text-blue-700">
            {currency}{" "}
            {Number(course.price) - (course.discount! * Number(course.price)) / 100}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;

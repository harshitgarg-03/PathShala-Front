import { assets } from "../../Data/assets.ts";
import { useStore } from "../../ZustandStore/Store.js";
import type { CourseCardProp } from "../../Types/index.js";

function CourseCard({ course }: CourseCardProp) {
  const currency = useStore((s) => s.currency);
  const CourseRating = useStore((s) => s.CourseRatingFunction);
  return (
    <div
      className="w-full sm:w-64 md:w-72 lg:w-80
    border border-blue-200
    rounded-xl overflow-hidden
    bg-white shadow-sm hover:shadow-lg 
    transition"
    >
      <div className="w-full h-40 sm:h-44 p-2 md:h-48 overflow-hidden">
        <img
          src={course.courseThumbnail}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 space-y-2">
        <h1 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2">
          {course.courseTitle}
        </h1>

        <div className="text-sm text-gray-600 line-clamp-2"
          dangerouslySetInnerHTML=
          {{
            __html: course.courseDescription,
          }}>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <p className="font-medium text-gray-700">{CourseRating(course)}</p>

          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={
                  i < Math.floor(CourseRating(course))
                    ? assets.star
                    : assets.star_blank
                }
                alt=""
                className="h-4 w-4"
              />
            ))}
          </div>

          <p className="text-gray-500 ml-1">{course.courseRatings.length}</p>
        </div>

        {/* Price */}
        <div className="pt-2">
          <p className="text-lg font-bold text-blue-700">
            {currency}{" "}
            {course.coursePrice - (course.discount * course.coursePrice) / 100}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;

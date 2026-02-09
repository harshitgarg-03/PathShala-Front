import Footer from "../../Componets/Student/Footer";
import type { CourseDetailProp } from "../../Types";
import { useStore } from "../../ZustandStore/Store";

function CourseDetails() {
  const course = useStore((s) => s.SpecificCourse);
  const chapterDuration = 0;
  console.log("course is ", course);

  return (
    <div>
      {course && (
        <div className="w-full bg-sky-50 px-4 sm:px-8 md:px-12 lg:px-20 py-8">
          <div className="text-sm text-gray-600 flex items-center gap-2 mb-6">
            <span className="hover:text-blue-600 cursor-pointer">Home</span>
            <span>/</span>
            <span className="font-medium text-gray-800">
              {course.courseTitle}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-2/3 space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                {course.courseTitle}
              </h1>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {course.courseDescription}
              </p>

              <div className="flex items-center gap-3 text-sm text-gray-700">
                <span className="font-semibold text-orange-500">3 ★★★☆☆</span>

                <span className="text-blue-600 cursor-pointer">
                  (5 ratings)
                </span>

                <span>•</span>

                <span>{course.enrolledStudents.length} students</span>
              </div>

              <p className="text-sm text-gray-700">
                Course by{" "}
                <span className="text-blue-700 font-medium cursor-pointer">
                  {course.educator}
                </span>
              </p>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Course Structure</h2>

                <div className="space-y-4">
                  {course.courseContent.map((chapter, i) => (
                    <div
                      key={i}
                      className="border border-gray-200 rounded-lg p-4 bg-white"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium text-gray-800">
                          {chapter.chapterTitle}
                        </h3>

                        <span className="text-sm text-gray-500">
                          {chapter.chapterContent.length} lectures •{" "}
                          {chapterDuration} hrs
                        </span>
                      </div>

                      <div className="space-y-2">
                        {chapter.chapterContent.map((lecture, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between text-sm text-gray-600 pl-2"
                          >
                            <span>▶ {lecture.lectureTitle}</span>

                            <span>{lecture.lectureDuration / 60} min</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-xl font-semibold mb-3">
                  Course Description
                </h2>

                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {course.courseDescription}
                </p>
              </div>
            </div>

            {/* Right Payment Card */}
            <div className="w-full lg:w-1/3">
              <div
                className="
        sticky top-24
        bg-white
        border border-gray-200
        rounded-xl
        shadow-md
        p-5
        "
              >
                {/* You will design this later */}
                <p className="text-center text-gray-600">Payment Card Here</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default CourseDetails;

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import leftclockicon from "../../Data/time_left_clock_icon.svg";
// import clockicon from "../../Data/time_clock_icon.svg";
// import lessonicon from "../../Data/lesson_icon.svg";
// import star from "../../Data/rating_star.svg";
// import { useAuth } from "../../ZustandStore/AuthStore";
// import croosicon from "../../Data/cross_icon.svg";
import Loading from "../../Componets/Student/Loading";
import { CourseStore } from "../../ZustandStore/CourseStore";
import PaymentCard from "./Payment.tsx";
import { StudentCourseStore } from "../../ZustandStore/StudentCourseStore.ts";

function CourseDetails() {
  const course = CourseStore((s) => s.specificCourse);
  const navigate = useNavigate();
  const [Showlecture, setShowlecture] = useState<boolean>(false);
  const isLoading = CourseStore((s) => s.isLoading);
  const FetchCourse = CourseStore((s) => s.FetchSpecificCourse);
  const publishedCourses = StudentCourseStore(s => s.publishedCourses);

  const { id } = useParams();
  
  useEffect(() => {
    if (!id) return;
    FetchCourse(id);
  }, [id, publishedCourses]);
  console.log("loading is", isLoading);
  
  if (isLoading) {
    console.log("loading is hello ");
    return <Loading />;
  }

  return (
    <div>
      {course && (
        <div className="w-full bg-sky-50 px-4 sm:px-8 md:px-12 lg:px-20 py-8">
          <div className="text-md text-gray-600 flex items-center gap-2 mb-6">
            <span
              className="hover:text-blue-600 font-semibold cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </span>
            <span>/</span>
            <span className="font-medium text-gray-800">{course.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-2/3 space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                {course.title}
              </h1>

              <p
                className="text-gray-600 text-sm sm:text-base leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: course.description,
                }}
              ></p>

              <div className="flex items-center gap-3 text-sm text-gray-700">
                <span className="font-semibold text-orange-500">
                  {course.averageRating} ★★★☆☆
                </span>

                <span className="text-blue-600 cursor-pointer">
                  (5 ratings)
                </span>

                <span>•</span>

                <span>{course.enrollStudents.length} students</span>
              </div>

              <p className="text-sm text-gray-700">
                Course by{" "}
                <span className="text-blue-700 font-medium cursor-pointer">
                  {course.instructor.name}
                </span>
              </p>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Course Structure</h2>

                <div className="space-y-4">
                  {course.sections.map((chapter, i) => (
                    <div
                      key={i}
                      className="border border-gray-200 rounded-lg p-4 bg-white"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium text-gray-800">
                          {chapter.title}
                        </h3>

                        <span className="text-sm text-gray-500">
                          {chapter.lectures.length} lectures •{" "}
                          {chapter.duration} hrs
                        </span>
                      </div>

                      <div className="space-y-2">
                        {chapter.lectures.map((lecture, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between cursor-pointer text-sm text-gray-600 pl-2"
                          >
                            <span onClick={() => setShowlecture(!Showlecture)}>
                              ▶ {lecture.title}
                            </span>
                            {/* {course.status && (
                              <>
                                <div>
                                  <span
                                    className={`font-semibold text-blue-600 cursor-pointer`}
                                    onClick={() =>
                                      setPlayerData(() => lecture.videoUrl)
                                    }
                                  >
                                    {" "}
                                    {lecture.isPreviewFree
                                      ? "Preview"
                                      : ""}{" "}
                                  </span>
                                  <span>{lecture.durationFormatted} hrs</span>
                                </div>

                                <div>
                                  <span>{lecture.resourceFiles[0]}</span>
                                </div>
                              </>
                            )} */}
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

                <p
                  className="text-gray-600 leading-relaxed text-sm sm:text-base"
                  dangerouslySetInnerHTML={{
                    __html: course.description,
                  }}
                ></p>
              </div>
            </div>

            {/* Right Payment Card */}
            
            <PaymentCard title={course.title} price={Number(course.price)} courseId={id!} imgstring={course.thumbnail!} discount={Number(course.discount)} />

          </div>
        </div>
      )}
    </div>
  );
}

export default CourseDetails;


{/* <div className="w-full lg:w-1/3">
              <div
                className="
sticky top-24
bg-white
border border-gray-200
rounded-2xl
shadow-lg
overflow-hidden
"
              >
                {/* Thumbnail */}

      //           {playerData ? (
      //             <>
      //               <video
      //                 src={playerData}
      //                 controls
      //                 className="w-full aspect-video rounded-lg"
      //               />

      //               <button
      //                 onClick={() => setPlayerData(null)}
      //                 className="
      //   absolute top-2 right-2
      //   bg-black/70 hover:bg-black
      //   text-white
      //   rounded-full
      //   p-1.5
      //   transition
      //   cursor-pointer
      //   shadow-md
      // "
      //               >
      //                 <img src={croosicon} alt="Close" className="h-4 w-4" />
      //               </button>
      //             </>
      //           ) : (
      //             <img
      //               src={course.thumbnail}
      //               alt="Thumbnail"
      //               className="w-full aspect-auto object-cover p-2"
      //             />
      //           )}

  //               <div className="p-5 space-y-5">
  //                 {/* Offer Line */}
  //                 <p className="flex items-center gap-2 text-red-500 text-sm font-medium">
  //                   <img src={leftclockicon} alt="" />
  //                   <span>5 days left at this price!</span>
  //                 </p>

  //                 {/* Price Section */}
  //                 <div className="flex items-center gap-3">
  //                   <span className="text-3xl font-bold text-gray-900">
  //                     $
  //                     {(
  //                       Number(course.price) -
  //                       Number((course.discount * Number(course.price)) / 100)
  //                     ).toFixed(2)}
  //                   </span>

  //                   <span className="text-gray-500 line-through text-sm">
  //                     ${course.price}
  //                   </span>

  //                   <span className="text-green-600 text-sm font-medium">
  //                     {course.discount}% off
  //                   </span>
  //                 </div>

  //                 {/* Info Section */}
  //                 <div className="space-y-2 flex text-sm gap-2 items-center text-gray-600">
  //                   <div className="flex items-center gap-2">
  //                     <img src={star} alt="" className="h-4" />
  //                     <span>{course.averageRating}</span>
  //                     <span>Ratings</span>
  //                     <span className="text-gray-400">|</span>
  //                   </div>

  //                   <div className="flex items-center gap-2">
  //                     <img src={clockicon} alt="" className="h-4" />
  //                     <span>49 hours, 30 minutes</span>
  //                     <span className="text-gray-400">|</span>
  //                   </div>

  //                   <div className="flex items-center mb-2 gap-2">
  //                     <img src={lessonicon} alt="" className="h-4" />
  //                     <span>4 lessons</span>
  //                   </div>
  //                 </div>

  //                 {/* Enroll Button */}
  //                 <button
  //                   className="
  //   w-full
  //   bg-blue-700 hover:bg-blue-800
  //   text-white
  //   py-2.5
  //   rounded-xl
  //   font-medium
  //   transition
  //   cursor-pointer
  // "
  //                   onClick={() => {
  //                     if (isAuthenticate) {
  //                       navigate("/EnrollC");
  //                     } else {
  //                       navigate("/login");
  //                     }
  //                   }}
  //                 >
  //                   Enroll Now
  //                 </button>

  //                 {/* Course Features */}
  //                 <div className="pt-3 border-t border-gray-200">
  //                   <h3 className="font-semibold text-gray-800 mb-3">
  //                     What’s included
  //                   </h3>

  //                   <ul className="space-y-2 text-sm text-gray-600 list-disc pl-4">
  //                     <li>Lifetime access</li>
  //                     <li>High quality video lectures</li>
  //                     <li>Downloadable resources</li>
  //                     <li>Certificate of completion</li>
  //                     <li>24/7 Support</li>
  //                   </ul>
  //                 </div>
  //               </div>
  //             </div>
            // </div>  */}

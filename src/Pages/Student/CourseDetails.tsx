import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../Componets/Student/Footer";
import { useStore } from "../../ZustandStore/Store";
import { useEffect, useRef, useState } from "react";
import leftclockicon from "../../Data/time_left_clock_icon.svg";
import clockicon from "../../Data/time_clock_icon.svg";
import lessonicon from "../../Data/lesson_icon.svg";
import star from "../../Data/rating_star.svg";
import { useAuth } from "../../ZustandStore/AuthStore";
// import youtube from 'react-youtube'
import YouTube from "react-youtube";
import croosicon from "../../Data/cross_icon.svg";
import Loading from "../../Componets/Student/Loading";


function CourseDetails() {
  const course = useStore((s) => s.SpecificCourse);
  const [chapterDuration, setChapterDuration] = useState<number>(0);
  const courseRating = useStore((s) => s.CourseRatingFunction);
  console.log("course is ", course);
  const navigate = useNavigate();
  const isAuthenticate = useAuth((s) => s.isAuthenticate);
  const [playerData, setPlayerData] = useState<object | null>(null);
  const isLoading = useStore(s => s.isLoading);
  const CourseDetailfunc = useStore((s) => s.CourseDetailFunc);
const { id } = useParams(); 
  useEffect(() => {
    CourseDetailfunc(id)
  }, [id])
  if(isLoading){
    return <Loading/>
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
            <span className="font-medium text-gray-800">
              {course.courseTitle}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-2/3 space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                {course.courseTitle}
              </h1>

              <p
                className="text-gray-600 text-sm sm:text-base leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: course.courseDescription,
                }}
              ></p>

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
                            <div>
                              <span
                                className={`font-semibold text-blue-600 cursor-pointer`}
                                onClick={() =>
                                  setPlayerData({
                                    videoid: lecture.lectureUrl
                                      .split("/")
                                      .pop(),
                                  })
                                }
                              >
                                {" "}
                                {lecture.isPreviewFree ? "Preview" : ""}{" "}
                              </span>
                              <span>{lecture.lectureDuration / 60} min</span>
                            </div>
                            {/* {setChapterDuration(prev => prev+(lecture.lectureDuration / 60))} */}
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
                    __html: course.courseDescription,
                  }}
                ></p>
              </div>
            </div>

            {/* Right Payment Card */}
            <div className="w-full lg:w-1/3">
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

                {playerData ? (
                  <>
                    <YouTube
                      videoId={playerData.videoid}
                      opts={{
                        playerVars: {
                          autoplay: 1,
                        },
                      }}
                      iframeClassName="w-full aspect-video"
                    />

                    <button
                      onClick={() => setPlayerData(null)}
                      className="
        absolute top-2 right-2
        bg-black/70 hover:bg-black
        text-white
        rounded-full
        p-1.5
        transition
        cursor-pointer
        shadow-md
      "
                    >
                      <img src={croosicon} alt="Close" className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <img
                    src={course.courseThumbnail}
                    alt="Thumbnail"
                    className="w-full h-48 object-cover p-2"
                  />
                )}

                <div className="p-5 space-y-5">
                  {/* Offer Line */}
                  <p className="flex items-center gap-2 text-red-500 text-sm font-medium">
                    <img src={leftclockicon} alt="" />
                    <span>5 days left at this price!</span>
                  </p>

                  {/* Price Section */}
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-gray-900">
                      $
                      {(
                        course.coursePrice -
                        Number((course.discount * course.coursePrice) / 100)
                      ).toFixed(2)}
                    </span>

                    <span className="text-gray-500 line-through text-sm">
                      ${course.coursePrice}
                    </span>

                    <span className="text-green-600 text-sm font-medium">
                      {course.discount}% off
                    </span>
                  </div>

                  {/* Info Section */}
                  <div className="space-y-2 flex text-sm gap-2 items-center text-gray-600">
                    <div className="flex items-center gap-2">
                      <img src={star} alt="" className="h-4" />
                      <span>{courseRating(course)}</span>
                      <span>Ratings</span>
                      <span className="text-gray-400">|</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <img src={clockicon} alt="" className="h-4" />
                      <span>49 hours, 30 minutes</span>
                      <span className="text-gray-400">|</span>
                    </div>

                    <div className="flex items-center mb-2 gap-2">
                      <img src={lessonicon} alt="" className="h-4" />
                      <span>4 lessons</span>
                    </div>
                  </div>

                  {/* Enroll Button */}
                  <button
                    className="
    w-full
    bg-blue-700 hover:bg-blue-800
    text-white
    py-2.5
    rounded-xl
    font-medium
    transition
    cursor-pointer
  "
                    onClick={() => {
                      if (isAuthenticate) {
                        navigate("/");
                      } else {
                        navigate("/login");
                      }
                    }}
                  >
                    Enroll Now
                  </button>

                  {/* Course Features */}
                  <div className="pt-3 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-3">
                      What’s included
                    </h3>

                    <ul className="space-y-2 text-sm text-gray-600 list-disc pl-4">
                      <li>Lifetime access</li>
                      <li>High quality video lectures</li>
                      <li>Downloadable resources</li>
                      <li>Certificate of completion</li>
                      <li>24/7 Support</li>
                    </ul>
                  </div>
                </div>
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

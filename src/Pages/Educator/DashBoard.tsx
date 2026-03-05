import setting from "../../Data/settings.svg";
import dashboard from "../../Data/layout-dashboard.svg";
import book from "../../Data/book-open.svg";
import chart from "../../Data/chart-column.svg";
import plusicon from "../../Data/copy-plus.svg";
import { CourseStore } from "../../ZustandStore/CourseStore";
import CourseCard from "../../Componets/Student/CourseCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import leftArrow from "../../Data/chevron-left.svg";
import rightArrow from "../../Data/chevron-right.svg";
function DashBoard() {
  const AllCourses = CourseStore((s) => s.UserFetchedCourse);
  const FetchAllCourse = CourseStore((s) => s.GetManageCourse);
  useEffect(() => {
    FetchAllCourse();
  }, []);
  console.log("all courses", AllCourses);
  
  
  const HandlecreateCourse = () => {
    navigate("/Educator/AddCourse");
  };

  const HandlecreateSection = (id: string) => {
    navigate(`/Educator/AddSection/${id}`);
  };
  const ScrollRef = useRef<HTMLDivElement>(null);

  const HandleSideBar = (title: string) => {
    if (title == "Manage Courses") {
      navigate("/Educator/Manage-Course");
    }
    if (title == "Analytics") {
      navigate("/Educator/Analytics");
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (!ScrollRef.current) return;
    const scrollamount = 340;

    ScrollRef.current.scrollBy({
      left: direction === "left" ? -scrollamount : scrollamount,
      behavior: "smooth",
    });
  };
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen p-4 bg-gray-100">
      {/* 🔹 Sidebar */}
      <aside className="w-64 bg-white shadow-sm hidden md:flex rounded-2xl flex-col p-6 space-y-6">
        {[
          { icon: dashboard, title: "Dashboard" },
          { icon: book, title: "Manage Courses" },
          { icon: chart, title: "Analytics" },
          { icon: setting, title: "Settings" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition"
            onClick={() => HandleSideBar(item.title)}
          >
            <img src={item.icon} alt="" className="h-5 w-5" />
            <h3 className="text-gray-700 font-medium">{item.title}</h3>
          </div>
        ))}
      </aside>

      {/* 🔹 Main Container */}
      <main className="flex-1 p-6 md:p-10 space-y-8">
        {/* 🔹 Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Educator Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your courses and earnings
            </p>
          </div>

          <button
            className="flex items-center gap-2 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition"
            onClick={HandlecreateCourse}
          >
            <img src={plusicon} alt="" className="h-4 w-4" />
            Create Course
          </button>
        </div>

        {/* 🔹 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: plusicon, qty: 0, title: "Total Earnings" },
            { icon: plusicon, qty: 0, title: "Total Students" },
            { icon: plusicon, qty: 0, title: "Average Rating" },
            { icon: plusicon, qty: 0, title: "Active Courses" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <img src={item.icon} alt="" className="h-8 w-8 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800">{item.qty}</h2>
              <p className="text-gray-500">{item.title}</p>
            </div>
          ))}
        </div>

        {/* 🔹 Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue / Courses Section */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Your Courses
            </h2>

            {AllCourses && AllCourses.length > 0 ? (
              <div className="relative">
                {/* 🔹 Left Button */}
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-0 top-1/2 bg-sky-100 cursor-pointer -translate-y-1/2 z-10 
     hover:bg-white shadow rounded-full p-2"
                >
                  <img src={leftArrow} alt="left" className="h-5 w-5" />
                </button>

                {/* 🔹 Scroll Container */}
                <div
                  ref={ScrollRef}
                  className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-10"
                >
                  {AllCourses.map((item) => (
                    <div
                      className="min-w-75 shrink-0"
                      onClick={() => HandlecreateSection(item._id)}
                    >
                      <CourseCard key={item._id} course={item} />
                    </div>
                  ))}
                </div>

                {/* 🔹 Right Button */}
                <button
                  onClick={() => scroll("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
    bg-sky-100 hover:bg-white shadow rounded-full cursor-pointer p-2"
                >
                  <img src={rightArrow} alt="right" className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No courses yet</p>
                <p className="text-sm text-gray-400">
                  Create your first course to get started
                </p>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Quick Stats</h3>

            {[
              { title: "This Month Revenue", value: "$2,450" },
              { title: "New Enrollments", value: "+24" },
              { title: "Completion Rate", value: "68%" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b pb-3 last:border-none"
              >
                <span className="text-gray-600">{item.title}</span>
                <span className="font-semibold text-gray-800">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashBoard;

import setting from "../../Data/settings.svg";
import dashboard from "../../Data/layout-dashboard.svg";
import book from "../../Data/book-open.svg";
import chart from "../../Data/chart-column.svg";
import plusicon from "../../Data/copy-plus.svg";
import { CourseStore } from "../../ZustandStore/CourseStore";
import CourseCard from "../../Componets/Student/CourseCard";
import { useNavigate } from "react-router-dom";
function DashBoard() {
  const AllCourses = CourseStore((s) => s.courses);
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

        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition"
          onClick={() => navigate("/Educator/AddCourse")}
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
            <h2 className="text-2xl font-bold text-gray-800">
              {item.qty}
            </h2>
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
            <div className="grid sm:grid-cols-2 gap-6">
              {AllCourses.map((item) => (
                <CourseCard key={item._id} course={item} />
              ))}
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
          <h3 className="text-lg font-semibold text-gray-800">
            Quick Stats
          </h3>

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

import { useState, useEffect } from "react";
import {
  TrendingUp,
  Users,
  DollarSign,
  BookOpen,
  Activity,
  Award,
} from "lucide-react";
import { CourseStore } from "../../ZustandStore/CourseStore";
import type { course } from "../../Types";
import { AnalyticsStore } from "../../ZustandStore/AnalyticsStore";
// import { supabase } from '../lib/supabase';
// import type { Course, Enrollment } from '../lib/types';

export default function Analytics() {
  const CoursesAll = CourseStore((s) => s.UserFetchedCourse);
  useEffect(() => {
    if (CoursesAll) {
      setCourses(CoursesAll);
    }
  }, []);

  const [courses, setCourses] = useState<course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadAnalyticsData();
//   }, []);

//   async function loadAnalyticsData() {
//     try {
//       const { data: coursesData } = await supabase.from("courses").select("*");

//       const { data: enrollmentsData } = await supabase
//         .from("enrollments")
//         .select("*");

//       setCourses(coursesData || []);
//       setEnrollments(enrollmentsData || []);
//     } catch (error) {
//       console.error("Error loading analytics:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

  const totalRevenue = AnalyticsStore((s) => s.TotalIncomefromCourses);
  const totalRevenueFunc = AnalyticsStore((s) => s.TotalRevenue);
  const totalStudents = AnalyticsStore((s) => s.TotalStudents);
  const avgCoursePrice = AnalyticsStore((s) => s.AvgCoursePrice);
  let avgRating = AnalyticsStore((s) => s.AverageRating);
  
  useEffect(() => {
    totalRevenueFunc();
    setLoading(false);
  }, []);
 
  const completionRate =
    enrollments.length > 0
      ? (enrollments.filter((e) => e.completed).length / enrollments.length) *
        100
      : 0;

  const topPerformingCourse = courses.reduce((best, course) => {
    const courseEnrollments = enrollments.filter(
      (e) => e.course_id === course.id,
    );
    const bestEnrollments = enrollments.filter((e) => e.course_id === best.id);
    return courseEnrollments.length > bestEnrollments.length ? course : best;
  }, courses[0]);

  const getMonthlyData = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentMonth = new Date().getMonth();
    const last6Months = [];

    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const month = months[monthIndex];
      const enrollmentsInMonth = enrollments.filter((e) => {
        const enrollDate = new Date(e.enrolled_at);
        return enrollDate.getMonth() === monthIndex;
      }).length;

      last6Months.push({ month, enrollments: enrollmentsInMonth });
    }

    return last6Months;
  };

  const monthlyData = getMonthlyData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">Loading...</div>
    );
  }

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">
          Track your performance and insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          icon={DollarSign}
          label="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          change="+12.5%"
          positive={true}
        />
        <MetricCard
          icon={Users}
          label="Total Students"
          value={totalStudents.toString()}
          change="+8.2%"
          positive={true}
        />
        <MetricCard
          icon={BookOpen}
          label="Active Courses"
          value={courses
            .filter((c) => c.status === "published")
            .length.toString()}
          change="+2"
          positive={true}
        />
        <MetricCard
          icon={Award}
          label="Avg. Rating"
          value={avgRating.toFixed(1)}
          change="+0.3"
          positive={true}
        />
        <MetricCard
          icon={Activity}
          label="Completion Rate"
          value={`${completionRate.toFixed(0)}%`}
          change="+5.1%"
          positive={true}
        />
        <MetricCard
          icon={DollarSign}
          label="Avg. Course Price"
          value={`$${avgCoursePrice.toFixed(2)}`}
          change="$0"
          positive={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Enrollment Trends</h2>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex items-center">
                <div className="w-16 text-sm text-gray-600">{data.month}</div>
                <div className="flex-1 ml-4">
                  <div className="bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div
                      className="bg-blue-600 h-full flex items-center justify-end pr-2"
                      style={{
                        width: `${Math.min((data.enrollments / Math.max(...monthlyData.map((m) => m.enrollments))) * 100, 100)}%`,
                      }}
                    >
                      {data.enrollments > 0 && (
                        <span className="text-xs text-white font-medium">
                          {data.enrollments}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Course Performance</h2>
          <div className="space-y-4">
            {courses.slice(0, 5).map((course) => {
              const courseEnrollments = enrollments.filter(
                (e) => e.course_id === course.id,
              );
              const avgCourseRating =
                courseEnrollments.filter((e) => e.rating).length > 0
                  ? courseEnrollments.reduce(
                      (sum, e) => sum + (e.rating || 0),
                      0,
                    ) / courseEnrollments.filter((e) => e.rating).length
                  : 0;

              return (
                <div key={course.id} className="border-b pb-3 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 truncate">
                      {course.title}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {courseEnrollments.length} students
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-600">
                        Rating:{" "}
                        <span className="font-medium">
                          {avgCourseRating.toFixed(1)}
                        </span>
                      </span>
                      <span className="text-gray-600">
                        Revenue:{" "}
                        <span className="font-medium">
                          $
                          {(courseEnrollments.length * course.price).toFixed(2)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {topPerformingCourse && (
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Top Performing Course</h2>
              <p className="text-3xl font-bold mb-2">
                {topPerformingCourse.title}
              </p>
              <p className="text-blue-100">
                {
                  enrollments.filter(
                    (e) => e.course_id === topPerformingCourse.id,
                  ).length
                }{" "}
                enrollments
              </p>
            </div>
            <Award className="h-24 w-24 opacity-20" />
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  change,
  positive,
}: {
  icon: any;
  label: string;
  value: string;
  change: string;
  positive: boolean;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <span
          className={`text-sm font-medium ${positive ? "text-green-600" : "text-red-600"}`}
        >
          {change}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

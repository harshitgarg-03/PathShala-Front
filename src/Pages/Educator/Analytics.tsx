import { useState, useEffect } from "react";
import { Users, DollarSign, BookOpen, Activity, Award } from "lucide-react";
import { CourseStore } from "../../ZustandStore/CourseStore";
import { AnalyticsStore } from "../../ZustandStore/AnalyticsStore";
import type { Enrollment } from "../../Types";

export default function Analytics() {
  const courses = CourseStore((s) => s.UserFetchedCourse) || [];

  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  const totalRevenue = AnalyticsStore((s) => s.TotalIncomefromCourses);
  const totalRevenueFunc = AnalyticsStore((s) => s.TotalRevenue);
  const totalStudents = AnalyticsStore((s) => s.TotalStudents);
  const avgCoursePrice = AnalyticsStore((s) => s.AvgCoursePrice);
  const avgRating = AnalyticsStore((s) => s.AverageRating);

  // Calculate analytics when courses available
  useEffect(() => {
    if (courses.length > 0) {
      totalRevenueFunc();

      // OPTIONAL: derive enrollments from courses
      const allEnrollments =
        courses.flatMap((c) => c.enrollStudents || []) || [];
      setEnrollments(allEnrollments);

      setLoading(false);
    }
  }, [courses]);

  // Completion Rate
  const completionRate =
    enrollments.length > 0
      ? (enrollments.filter((e) => e.completed).length /
          enrollments.length) *
        100
      : 0;

  // Safe Top Performing Course
  const topPerformingCourse =
    courses.length > 0
      ? courses.reduce((best, course) => {
          const courseEnrollments = enrollments.filter(
            (e) => e.course_id === course._id,
          );
          const bestEnrollments = enrollments.filter(
            (e) => e.course_id === best._id,
          );
          return courseEnrollments.length > bestEnrollments.length
            ? course
            : best;
        }, courses[0])
      : null;

  // Monthly Data
  const getMonthlyData = () => {
    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec",
    ];

    const currentMonth = new Date().getMonth();
    const last6Months = [];

    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;

      const enrollmentsInMonth = enrollments.filter((e) => {
        const enrollDate = new Date(e.enrolled_at!);
        return enrollDate.getMonth() === monthIndex;
      }).length;

      last6Months.push({
        month: months[monthIndex],
        enrollments: enrollmentsInMonth,
      });
    }

    return last6Months;
  };

  const monthlyData = getMonthlyData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6 p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">
          Track your performance and insights
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          icon={DollarSign}
          label="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          change="+12.5%"
          positive
        />
        <MetricCard
          icon={Users}
          label="Total Students"
          value={totalStudents.toString()}
          change="+8.2%"
          positive
        />
        <MetricCard
          icon={BookOpen}
          label="Active Courses"
          value={courses.filter((c) => c.status === "Published").length.toString()}
          change="+2"
          positive
        />
        <MetricCard
          icon={Award}
          label="Avg. Rating"
          value={avgRating.toFixed(1)}
          change="+0.3"
          positive
        />
        <MetricCard
          icon={Activity}
          label="Completion Rate"
          value={`${completionRate.toFixed(0)}%`}
          change="+5.1%"
          positive
        />
        <MetricCard
          icon={DollarSign}
          label="Avg. Course Price"
          value={`$${avgCoursePrice.toFixed(2)}`}
          change="$0"
          positive
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trends */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Enrollment Trends</h2>

          {monthlyData.map((data, index) => (
            <div key={index} className="flex items-center mb-3">
              <div className="w-16 text-sm text-gray-600">{data.month}</div>

              <div className="flex-1 ml-4">
                <div className="bg-gray-200 rounded-full h-6">
                  <div
                    className="bg-blue-600 h-full rounded-full text-xs text-white flex items-center justify-end pr-2"
                    style={{
                      width: `${
                        Math.min(
                          (data.enrollments /
                            Math.max(
                              ...monthlyData.map((m) => m.enrollments),
                              1,
                            )) *
                            100,
                          100,
                        )
                      }%`,
                    }}
                  >
                    {data.enrollments}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Course Performance */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Course Performance</h2>

          {courses.slice(0, 5).map((course) => {
            const courseEnrollments = enrollments.filter(
              (e) => e.course_id === course._id,
            );

            const avgCourseRating =
              courseEnrollments.length > 0
                ? courseEnrollments.reduce(
                    (sum, e) => sum + (e.rating || 0),
                    0,
                  ) / courseEnrollments.length
                : 0;

            return (
              <div key={course._id} className="border-b pb-3 mb-3">
                <h3 className="font-medium">{course.title}</h3>

                <div className="text-sm text-gray-600">
                  {courseEnrollments.length} students
                </div>

                <div className="text-sm mt-1">
                  Rating: {avgCourseRating.toFixed(1)} | Revenue: $
                  {(courseEnrollments.length * Number(course.price)).toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Course */}
      {topPerformingCourse && (
        <div className="bg-blue-600 text-white p-6 rounded-lg">
          <h2 className="text-xl font-bold">Top Performing Course</h2>
          <p className="text-2xl">{topPerformingCourse.title}</p>
        </div>
      )}
    </div>
  );
}

// 🔥 Metric Card
function MetricCard({ icon: Icon, label, value, change, positive }: any) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Icon className="h-6 w-6 text-blue-600 mb-2" />
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-xl font-bold">{value}</p>
      <p className={positive ? "text-green-600" : "text-red-600"}>
        {change}
      </p>
    </div>
  );
}
import { CheckCircle2, Clock, BookOpen, Award, Video, FileText, Download, Play } from 'lucide-react';
import { CourseStore } from '../../ZustandStore/CourseStore';
import { useEffect } from 'react';

function Enrollement() {
  const modules = [
    { id: 1, title: 'Introduction to the Fundamentals', lessons: 8, duration: '2h 15m', completed: false },
    { id: 2, title: 'Advanced Techniques & Strategies', lessons: 12, duration: '3h 45m', completed: false },
    { id: 3, title: 'Real-World Applications', lessons: 10, duration: '2h 50m', completed: false },
    { id: 4, title: 'Expert Level Mastery', lessons: 15, duration: '4h 20m', completed: false },
  ];

  const PurchaseCourse = CourseStore(s => s.UserPurchasedCourse);
  const GetPurchaseCourse = CourseStore(s => s.GetPurchaseCoures);

  useEffect(() => {
    GetPurchaseCourse();
  }, [GetPurchaseCourse])

  useEffect(() => {
    console.log("Purchased course is: ", PurchaseCourse);
  }, [PurchaseCourse])

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-sky-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-sky-50 via-blue-50 to-green-50 px-8 py-12 text-gray-700 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white shadow-md p-4 rounded-full">
                <CheckCircle2 className="w-16 h-16 text-green-500" strokeWidth={2} />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-slate-800">
              Welcome Aboard!
            </h1>

            <p className="text-xl text-center text-slate-600 max-w-2xl mx-auto">
              You're now enrolled in the complete course. Let's begin your learning journey.
            </p>
          </div>
        </div>

        {/* BODY */}
        <div className="p-8">

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center mb-3">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <h3 className="ml-3 text-lg font-semibold text-slate-800">45 Lessons</h3>
              </div>
              <p className="text-slate-600">High-quality video content</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
              <div className="flex items-center mb-3">
                <div className="bg-green-500 p-2 rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="ml-3 text-lg font-semibold text-slate-800">13+ Hours</h3>
              </div>
              <p className="text-slate-600">Comprehensive curriculum</p>
            </div>

            <div className="bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl p-6 border border-sky-200">
              <div className="flex items-center mb-3">
                <div className="bg-sky-500 p-2 rounded-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="ml-3 text-lg font-semibold text-slate-800">Certificate</h3>
              </div>
              <p className="text-slate-600">Upon completion</p>
            </div>

          </div>

          {/* CURRICULUM */}
          <div className="mb-8">

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Course Curriculum</h2>
              <div className="flex items-center text-sm text-slate-500">
                <span className="font-medium">Progress:</span>
                <span className="ml-2 text-blue-600 font-semibold">0%</span>
              </div>
            </div>

            <div className="bg-slate-200 rounded-full h-3 mb-8 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-full rounded-full transition-all duration-500"
                style={{ width: '0%' }}
              ></div>
            </div>

            <div className="space-y-4">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="p-6">

                    <div className="flex items-start justify-between">
                      <div className="flex-1">

                        <div className="flex items-center mb-2">
                          <div className="bg-blue-100 text-blue-700 rounded-lg px-3 py-1 text-sm font-semibold">
                            Module {module.id}
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                          {module.title}
                        </h3>

                        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                          <div className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                            <span>{module.lessons} lessons</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-green-500" />
                            <span>{module.duration}</span>
                          </div>
                        </div>
                      </div>

                      <button className="ml-4 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center transition-all duration-300 hover:shadow-lg hover:scale-105">
                        <Play className="w-5 h-5 mr-2" />
                        Start
                      </button>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RESOURCES */}
          <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-xl p-8 mt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">

              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Download Course Resources
                </h3>
                <p className="text-blue-100">
                  Access worksheets, templates, and bonus materials
                </p>
              </div>

              <div className="flex gap-4">
                <button className="bg-white hover:bg-slate-100 text-slate-800 px-6 py-3 rounded-lg font-semibold flex items-center transition-all duration-300 hover:shadow-lg">
                  <FileText className="w-5 h-5 mr-2" />
                  Workbook
                </button>

                <button className="bg-slate-900 hover:bg-black text-white px-6 py-3 rounded-lg font-semibold flex items-center transition-all duration-300 hover:shadow-lg">
                  <Download className="w-5 h-5 mr-2" />
                  All Files
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-slate-600">
        <p>
          Need help? Contact support at{" "}
          <span className="text-blue-600 font-semibold">support@pathshala.com</span>
        </p>
      </div>
    </div>
  </div>
);

}

export default Enrollement;

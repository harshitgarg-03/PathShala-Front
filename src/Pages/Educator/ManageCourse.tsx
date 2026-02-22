import { Plus, Edit2, Trash2, Search, BookOpen, X } from "lucide-react";
import { CourseStore } from "../../ZustandStore/CourseStore";
import { useEffect, useRef, useState } from "react";
import CourseCard from "../../Componets/Student/CourseCard";

export default function ManageCourses() {
  function openModal() {
    setshowModal(true);
  }
  function handleDelete(id) {}
  const ref = useRef(null);
  const filtered = CourseStore((s) => s.GetManageCourse);
  const filteredCourses = CourseStore((s) => s.UserFetchedCourse);
  const UpdatingFunc = CourseStore(s => s.updateCourse)
  const [list, setlsit] = useState(false);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [status, setstatus] = useState("");
  const [language, setlanguage] = useState("");
  const [level, setlevel] = useState("");
  const [updatestate, setupdatestate] = useState(false);
  const [updateCourseId, setupdateCourseId] = useState("");
  const [showModal, setshowModal] = useState<boolean>(false);
  const [Thumbnail, setthumbnail] = useState<File | null>(null);

  
  const CreateCourse = CourseStore((s) => s.CreateCourse);
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const FormedData = new FormData();

    FormedData.append("title", title);
    FormedData.append("description", description);
    FormedData.append("category", category);
    FormedData.append("price", price);
    FormedData.append("status", status);
    FormedData.append("language", language);
    FormedData.append("level", level);
    if (Thumbnail != null) {
      FormedData.append("thumbnail", Thumbnail);
    }
    console.log("Formed data ", FormedData);
    console.log("data", list, title, description, level, status, Thumbnail, language );
    
    {updatestate ? UpdatingFunc(updateCourseId, FormedData) : CreateCourse(FormedData)}
    
    setshowModal(false);
  };

  const HandleUpdate = (courseId: string) => {
    setupdateCourseId(courseId);
    setupdatestate(true);
  };

  const closeModal = () => {
    setshowModal(false);
    setupdatestate(false);
  };

  useEffect(() => {
    filtered();
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Courses</h1>
          <p className="text-gray-600 mt-2">
            Create, update, and manage your courses
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Create Course</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search courses..."
              //   value={searchTerm}
              //   onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {list && (
          <div className="text-gray-800 fixed bg-sky-100">
            <ul>Update</ul>
            <ul>Delete</ul>
          </div>
        )}

        {filteredCourses?.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <BookOpen className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>No courses found. Create your first course to get started!</p>
          </div>
        ) : (
          <div className="flex gap-6">
            {filteredCourses?.map((item) => (
              <div className="relative group">
                <CourseCard course={item} />

                <div className="absolute top-3 right-3 z-10">
                  {/* Dropdown */}
                  <div
                    className="
          absolute right-0 mt-2 w-32
          bg-white/95 backdrop-blur
          border border-gray-200
          rounded-xl shadow-xl
          opacity-0 invisible scale-95
          group-hover:opacity-100 group-hover:visible group-hover:scale-100
          transition-all duration-200
          origin-top-right
          "
                  >
                    <ul className="text-sm text-gray-700 py-1">
                      <li
                        className="
              flex items-center gap-2
              px-4 py-2
              hover:bg-blue-50 hover:text-blue-700
              cursor-pointer
              "
                        onClick={() => HandleUpdate(item._id)}
                      >
                        ✏️ Update
                      </li>

                      <li
                        className="
              flex items-center gap-2
              px-4 py-2
              hover:bg-red-50 hover:text-red-600
              cursor-pointer
              "
                      >
                        🗑 Delete
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {(showModal || updatestate) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {updatestate ? "Edit Course" : "Create new Course"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter course title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter course description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setcategory(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Programming">Programming</option>
                      <option value="Design">Design</option>
                      <option value="Business">Business</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={price}
                      onChange={(e) => setprice(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Thumnail
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setthumbnail(file);
                    }}
                    className="w-full px-4 py-2 flex border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setstatus(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setlanguage(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="draft">Hindi</option>
                    <option value="published">Hinglish</option>
                    <option value="archived">English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Level
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setlevel(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="draft">Beginner</option>
                    <option value="published">Intermediate</option>
                    <option value="archived">Advance</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {updatestate ? "Edit Course" : "Create Course"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

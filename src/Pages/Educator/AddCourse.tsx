import crossicon from "../../../public/cross_icon.svg";
import "../../../src/index.css";
import { useNavigate } from "react-router-dom";
import { CourseStore } from "../../ZustandStore/CourseStore";
import { useState } from "react";
function AddCourse() {
  const navigate = useNavigate();
  const CreateCourse = CourseStore((s) => s.CreateCourse);
  const [title, settitle] = useState<string>("");
  const [description, setdescription] = useState<string>("");
  const [price, setprice] = useState<number>(0);
  const [level, setlevel] = useState<string>("Beginner");
  const [thumbnail, setthumbnail] = useState<File | null>(null);
  const [category, setcategory] = useState<string>("");
  const [language, setlanguage] = useState<string>("Hindi");
  const [status, setstatus] = useState<string>("Hindi");

  const handlecreate = () => {
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("price", String(price));
    formdata.append("level", level);
    if (thumbnail) formdata.append("thumbnail", thumbnail);
    formdata.append("category", category);
    formdata.append("language", language);
    formdata.append("status", status);
    CreateCourse(formdata);
    navigate("/Educator/AddSection")
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      {/* Modal Card */}
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl max-h-[90vh] no-scrollbar overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b">
          <h1 className="text-2xl font-semibold text-gray-800">
            Create New Course
          </h1>
          <img
            src={crossicon}
            alt="close"
            className="h-5 w-5 cursor-pointer opacity-60 hover:opacity-100"
            onClick={() => navigate("/Educator/Dashboard")}
          />
        </div>

        <div className="px-8 py-6 space-y-6">
          {/* Course Title */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Course Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Advanced React Development"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-2">
              A clear, descriptive title for your course
            </p>
          </div>

          {/* Course Description */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Course Description *
            </label>
            <textarea
              rows={5}
              placeholder="Describe what students will learn in this course..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-2">
              Help students understand what they'll learn
            </p>
          </div>

          {/* Price & Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Price (USD) *
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <span className="px-4 bg-gray-100 text-gray-600">$</span>
                <input
                  type="number"
                  placeholder="49.99"
                  className="w-full px-4 py-3 focus:outline-none"
                  value={price}
                  onChange={(e) => setprice(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Course Level */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Course Level
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={level}
                onChange={(e) => setlevel(e.target.value)}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Course Thumbnail *
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => {
                if (e.target.files?.[0]) setthumbnail(e.target.files?.[0]);
              }}
            />
            <p className="text-sm text-gray-500 mt-2">
              Use a direct Course Thumbnail or upload from your computer
            </p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Category
            </label>
            <input
              type="text"
              placeholder="e.g. Programming, Design, Business"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={language}
              onChange={(e) => setlanguage(e.target.value)}
            >
              <option>Hindi</option>
              <option>English</option>
              <option>Hinglish</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={status}
              onChange={(e) => setstatus(e.target.value)}
            >
              <option>Draft</option>
              <option>Published</option>
              <option>Archieved</option>
            </select>
          </div>

          {/* Tips Section */}
          <div className="bg-gray-50 border rounded-xl p-6">
            <h2 className="font-semibold text-gray-800 mb-4">
              Tips for a Great Course
            </h2>
            <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
              <li>Write a clear and compelling title.</li>
              <li>Explain what students will achieve.</li>
              <li>Keep your course structured and organized.</li>
              <li>Use high-quality visuals and content.</li>
              <li>Choose the correct category and level.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 px-8 py-6 border-t">
          <button
            className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer transition"
            onClick={() => navigate("/Educator/Dashboard")}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer shadow"
            onClick={handlecreate}
          >
            Create Course
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CourseStore } from "../../ZustandStore/CourseStore";
import type { section } from "../../Types";

export const InternalLecture = ({
  courseId,
  sectionId,
  index,
  lecture,
}: {
  courseId: string;
  sectionId: string;
  index: number;
  lecture?: any;
}) => {
  const isTemp = lecture?.isTemp;

  const [showContent, setShowContent] = useState(isTemp ? true : false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [PdfFile, setPdfFile] = useState<File | null>(null);

  const [title, settitle] = useState(lecture?.title || "");
  const [isPreview, setisPreview] = useState(lecture.isPreviewFree || false);

  const addLecture = CourseStore((s) => s.AddLecture);

  const order = index + 1;
  const duration = "5000";

  const HandleAddLecture = async () => {
    if (!title.trim()) return;

    const formData = new FormData();

    formData.append("title", title);
    formData.append("duration", duration);
    formData.append("order", String(order));
    formData.append("isPreviewFree", String(isPreview));
    formData.append("courseId", courseId);
    formData.append("sectionId", sectionId);

    if (videoFile) formData.append("video", videoFile);
    if (PdfFile) formData.append("pdf", PdfFile);
    console.log("hello ");
    
    const res = await addLecture(formData);

    if (res) {
      setShowContent(false);
      settitle("");
      setVideoFile(null);
      setPdfFile(null);
      setisPreview(false);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* 🔹 Lecture Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
        {/* Left Section */}
        <div className="flex items-center gap-3 flex-1">
          <span className="h-3 w-3 rounded-full bg-gray-700"></span>

          <div className="flex items-center gap-3 flex-1">
            <span className="text-gray-700 font-medium">Lecture {order}:</span>

            <input
              type="text"
              placeholder="Introduction"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              className="flex-1 px-2 py-1 rounded-md border border-transparent focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm"
            />
          </div>
        </div>

        {/* Content Button */}
        <button
          onClick={() => setShowContent((prev) => !prev)}
          className="ml-4 px-4 py-1.5 text-sm rounded-lg border border-purple-500 text-purple-600 hover:bg-purple-50 transition"
        >
          + {lecture?.title ? "Update" : "Content"}
        </button>
      </div>

      {/* 🔹 Upload Content Box */}
      {showContent && (
        <div className="border-dashed border-2 border-gray-300 m-4 rounded-xl p-6 space-y-5">
          <h3 className="text-sm font-semibold text-gray-700">
            Upload content
          </h3>

          {/* existing video */}
          {lecture?.videoUrl && (
            <div className="text-xs text-green-600">✅ Video uploaded</div>
          )}

          {/* Video File Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Video File</label>

            <input
              type="file"
              accept="video/*,video/mp4"
              onChange={(e) => setVideoFile(e.target.files?.[0]!)}
              className="block w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-medium
              file:bg-purple-50 file:text-purple-600
              hover:file:bg-purple-100
              cursor-pointer"
            />
          </div>

          {/* existing pdf */}
          {lecture?.resourceFiles?.[0] && (
            <div className="text-xs text-green-600">📄 PDF attached</div>
          )}

          {/* PDF input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">
              Attach PDF / Resources
            </label>

            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files?.[0]!)}
              className="block w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-medium
              file:bg-purple-50 file:text-purple-600
              hover:file:bg-purple-100
              cursor-pointer"
            />
          </div>

          {/* Preview Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="preview"
              className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              onChange={() => setisPreview(!isPreview)}
            />
            <label htmlFor="preview" className="text-sm text-gray-600">
              Mark as preview (free lecture)
            </label>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={HandleAddLecture}
              className="px-5 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export function InternalSection({
  id,
  sectionId,
  courseId,
  section,
}: {
  id: number;
  sectionId: string;
  courseId: string;
  section: section;
}) {
  const [localLectures, setLocalLectures] = useState<any[]>(
    section.lectures || [],
  );
  const [Title, setTitle] = useState(section.title || "Introduction");
  const [Description, setDescription] = useState(section.description || "");
  const [Clicking, setClicking] = useState(false);

  useEffect(() => {
    setLocalLectures(section.lectures || []);
  }, [section]);

  const handleLecture = () => {
    setLocalLectures((prev) => {
      if (prev.some((lec) => lec.isTemp)) return prev;

      return [
        ...prev,
        {
          _id: `temp-${Date.now()}`, // temp id for React key
          title: "",
          isPreviewFree: false,
          isTemp: true, // optional flag
        },
      ];
    });
  };

  return (
    <div className="bg-white border rounded-xl p-6 space-y-6">
      {/* 🔹 Section Header */}
      <div className="space-y-5">
        {/* 🔹 Title Row */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setClicking(true)}
        >
          <span className="font-semibold text-gray-200">Section {id + 1}:</span>

          <input
            type="text"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 bg-transparent px-3 py-2 rounded-md
      border border-transparent
      text-gray-100 placeholder-gray-500
      focus:border-purple-500 focus:ring-2 focus:ring-purple-500
      focus:outline-none transition"
            placeholder="Section title"
          />
        </div>

        {/* 🔹 Edit Mode */}
        {Clicking && (
          <div className="space-y-4 pl-1">
            {/* Description Label */}
            <div className="text-sm font-medium text-gray-400">Description</div>

            {/* Description Box */}
            <textarea
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short description..."
              rows={3}
              className="w-full bg-transparent
        px-4 py-3 rounded-lg
        border border-gray-700
        text-gray-200 placeholder-gray-500
        focus:ring-2 focus:ring-purple-500 focus:border-purple-500
        focus:outline-none resize-none transition"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setClicking(false)}
                className="px-4 py-2 rounded-lg
          border border-gray-600
          text-gray-300 hover:bg-gray-800
          transition"
              >
                Cancel
              </button>

              <button
                onClick={() => setClicking(false)}
                className="px-5 py-2 rounded-lg
          bg-purple-600 text-white
          hover:bg-purple-700
          transition shadow-sm"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 🔹 Lectures — USE LOCAL STATE */}
      {localLectures.map((lec: any, index: number) => (
        <InternalLecture
          key={lec._id || index}
          courseId={courseId}
          sectionId={sectionId}
          lecture={lec}
          index={index}
        />
      ))}

      {/* 🔹 Add Lecture Button */}
      <button onClick={handleLecture}>+ Add Lecture</button>
    </div>
  );
}

export function SectionForm({
  onClose,
  order,
  setOrders,
}: {
  order: number;
  onClose: () => void;
  setOrders: () => void;
}) {
  const [title, setTitle] = useState("Introduction");
  const [description, setDescripition] = useState("");
  const { courseId } = useParams();
  const AddSection = CourseStore((s) => s.AddSection);
  console.log("sec", order);

  const data = {
    title: title,
    description: description,
    order: order,
    courseId: courseId!,
  };
  const HandleSectionAdding = async () => {
    console.log(data);

    const res = await AddSection(data);
    if (res) setOrders();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-xs">
      {/* 🔹 Modal Card */}
      <div className="w-full max-w-4xl bg-white border rounded-2xl shadow-xl p-8 space-y-6">
        {/* Heading */}
        <h3 className="text-xl font-semibold text-gray-800">Create Section</h3>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Title</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Introduction"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescripition(e.target.value)}
            placeholder="Write a short description..."
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm resize-none"
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            className="px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition shadow-sm"
            onClick={() => {
              HandleSectionAdding();
              onClose();
            }}
          >
            Save Section
          </button>
        </div>
      </div>
    </div>
  );
}

function Addsections() {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setorder] = useState(0);
  const courses = CourseStore((s) => s.courses);
  const fetchallcourses = CourseStore((s) => s.FetchAllCourse);
  const { courseId } = useParams();

  const FetchspecificCorse = CourseStore((s) => s.FetchSpecificCourse);
  const specificCourse = CourseStore((s) => s.specificCourse);
  useEffect(() => {
    fetchallcourses();
  }, []);

  useEffect(() => {
    if (courses && courseId) FetchspecificCorse(courseId!);
  }, [courses, courseId]);
  useEffect(() => {
    if (specificCourse?.sections) {
      setorder(specificCourse.sections.length);
    }
  }, [specificCourse]);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Create sections</h2>

        {specificCourse?.sections?.map((item, idx) => (
          <InternalSection
            key={item?._id}
            sectionId={item?._id}
            section={item}
            courseId={specificCourse._id}
            id={idx}
          />
        ))}

        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="px-5 py-2 border border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition"
        >
          + Section
        </button>
      </div>

      {isOpen && (
        <SectionForm
          onClose={() => setIsOpen(false)}
          order={order}
          setOrders={() => setorder(order + 1)}
        />
      )}
    </div>
  );
}

export default Addsections;

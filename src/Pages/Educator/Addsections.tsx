import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CourseStore } from "../../ZustandStore/CourseStore";

export const InternalLecture = ({ courseId, sectionId }: { courseId: string, sectionId: object }) => {

  const [showContent, setShowContent] = useState(false);
  const [videoUrl, setVideoUrl] = useState<File | null>(null);
  const [clicking, setclicking] = useState(false);
  const [title, settitle] = useState("");
  const [isPreview, setisPreview] = useState(false);
  const [Pdf, setPdf] = useState<File | null>(null);
  const order = 1;
  const courseid = courseId;
  const duration = "12:30";
  const sectionid = sectionId;
  const addLecture = CourseStore(s => s.AddLecture);

  const HandleLectureAdditon = () => {
    setclicking(true);
  };

  const data = {
    title: title,
    duration: duration,
    order: order,
    isPreviewFree: isPreview,
    courseId: courseid,
    sectionId: sectionid
  }

  const HandleAddLecture = () => {
    addLecture(data);
    setShowContent(() => false);
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* 🔹 Lecture Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
        {/* Left Section */}
        <div className="flex items-center gap-3 flex-1">
          <span className="h-3 w-3 rounded-full bg-gray-700"></span>

          <div className="flex items-center gap-3 flex-1">
            <span className="text-gray-700 font-medium">Lecture 1:</span>

            <input
              type="text"
              placeholder="Introduction"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              onClick={HandleLectureAdditon}
              className="flex-1 px-2 py-1 rounded-md border border-transparent focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm"
            />

            {clicking && (
              <button
                className="px-3 py-1 text-xs rounded-md bg-purple-600 text-white hover:bg-purple-700 transition"
                onClick={() => setclicking(false)}
              >
                Save
              </button>
            )}
          </div>
        </div>

        {/* Content Button */}
        <button
          onClick={() => setShowContent((prev) => !prev)}
          className="ml-4 px-4 py-1.5 text-sm rounded-lg border border-purple-500 text-purple-600 hover:bg-purple-50 transition"
        >
          + Content
        </button>
      </div>

      {/* 🔹 Upload Content Box */}
      {showContent && (
        <div className="border-dashed border-2 border-gray-300 m-4 rounded-xl p-6 space-y-5">
          <h3 className="text-sm font-semibold text-gray-700">
            Upload content
          </h3>

          {/* Video URL */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Video File</label>

            <input
              type="file"
              accept="video/*,video/mp4"
              // value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.files?.[0]!)}
              className="block w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-medium
              file:bg-purple-50 file:text-purple-600
              hover:file:bg-purple-100
              cursor-pointer"
            />
          </div>

          {/* PDF Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">
              Attach PDF / Resources
            </label>

            <input
              type="file"
              accept="application/pdf"
              // value={Pdf}
              onChange={(e) => setPdf(e.target.files?.[0]!)}
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

export function InternalSection({id, sectionId }: { id: number, sectionId: object}) {
  const [lectures, setLectures] = useState([{ id: 1 }]);
  const [Clicking, setClicking] = useState(false);
  const [Title, setTitle] = useState("Introduction");
  const [Description, setDescription] = useState("");
  const { courseid } = useParams();
  const [order, setorder] = useState(0);
  const AddSection = CourseStore((s) => s.AddSection);

  const handleLecture = () => {
    setLectures((prev) => [...prev, { id: prev.length + 1 }]);
  };
  
  const data = {
    title: Title,
    description: Description,
    order: order,
    courseId: courseid!,
  };
  console.log("section", sectionId);
  
  const HandleAddingSection = () => {
    setClicking(!Clicking);
    //AddSection(data)
  };

  return (
    <div className="bg-white border rounded-xl p-6 space-y-6">
      {/* 🔹 Section Header */}
      <div className="space-y-4">
        {/* Title Row */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setClicking(true)}
        >
          <span className="font-semibold text-gray-800">Section {id+1}:</span>

          <input
            type="text"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border border-transparent focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-700"
          />
        </div>

        {/* 🔹 Edit Mode */}
        {Clicking && (
          <div className="space-y-4 pl-1">
            {/* Title Label */}
            <div className="text-sm font-medium text-gray-600">Title</div>

            {/* Description */}
            <textarea
              placeholder="Description.."
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-25 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none text-sm"
            />

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={HandleAddingSection}
                className="px-5 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 🔹 Lectures */}
      {lectures.map((item) => (
        <InternalLecture key={item.id} courseId={courseid!} sectionId={sectionId} />
      ))}

      {/* 🔹 Add Lecture Button */}
      <button
        onClick={handleLecture}
        className="px-4 py-2 border rounded-lg text-purple-600 border-purple-500 hover:bg-purple-50 transition"
      >
        + Add Lecture
      </button>
    </div>
  );
}

export function SectionForm({
  onClose,
  order,
  setOrders
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
  const HandleSectionAdding = async() => {
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
  console.log(specificCourse);

  console.log("add", order);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Create sections</h2>

        {specificCourse?.sections?.map((item, idx) => (
          <InternalSection key={item._id} sectionId={item} id={idx} />
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
        <SectionForm onClose={() => setIsOpen(false)} order={order} setOrders={() => setorder(order+1)}/>
      )}
    </div>
  );
}

export default Addsections;

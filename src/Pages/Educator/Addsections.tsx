import { useState } from "react";

export const InternalLecture = () => {
  const [showContent, setShowContent] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  return (
    <div className="border rounded-lg">
      {/* 🔹 Lecture Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-gray-700"></span>
          <h4 className="text-gray-700">
            Lecture 1: <span className="font-medium">Introduction</span>
          </h4>
        </div>

        <button
          onClick={() => setShowContent((prev) => !prev)}
          className="px-4 py-1.5 text-sm rounded-lg border border-purple-500 text-purple-600 hover:bg-purple-50 transition"
        >
          + Content
        </button>
      </div>

      {/* 🔹 Upload Content Box */}
      {showContent && (
        <div className="border-dashed border-2 border-gray-300 m-4 rounded-xl p-6 space-y-4">

          <h3 className="text-sm font-semibold text-gray-700">
            Upload content
          </h3>

          {/* Video URL */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">
              Video URL
            </label>

            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Paste video URL (Cloudinary / S3)"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm"
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
              className="block w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-medium
              file:bg-purple-50 file:text-purple-600
              hover:file:bg-purple-100
              cursor-pointer"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setShowContent(false)}
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
}: {
  id: number;
}) {
  const [lectures, setLectures] = useState([{ id: 1 }]);

  const handleLecture = () => {
    setLectures((prev) => [...prev, { id: prev.length + 1 }]);
  };

  return (
    <div className="bg-white border rounded-xl p-6 space-y-4">
      <h3 className="font-semibold text-gray-800">
        Section {id + 1}: <span className="font-normal">Introduction</span>
      </h3>

      {lectures.map((item) => (
        <InternalLecture key={item.id} />
      ))}

      <button
        onClick={handleLecture}
        className="px-4 py-2 border rounded-lg text-purple-600 border-purple-500 hover:bg-purple-50 transition"
      >
        + Add Lecture
      </button>
    </div>
  );
}


function Addsections() {
  const [sections, setSections] = useState([{ id: 1 }]);

  const handleSection = () => {
    setSections((prev) => [...prev, { id: prev.length + 1 }]);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Create sections
        </h2>

        {sections.map((item) => (
          <InternalSection key={item.id} id={item.id} />
        ))}

        <button
          onClick={handleSection}
          className="px-5 py-2 border border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition"
        >
          + Section
        </button>
      </div>
    </div>
  );
}

export default Addsections;

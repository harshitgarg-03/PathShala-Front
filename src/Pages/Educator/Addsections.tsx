import { LogIn } from "lucide-react";
import { useState } from "react";

// export function InternalLecture({ id }: { id: number }) {
//   return (
//     <div className="border rounded-lg">
//       <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
//         <div className="flex items-center gap-3">
//           <span className="h-3 w-3 rounded-full bg-gray-700"></span>
//           <h4 className="text-gray-700">
//             Lecture {id}: <span className="font-medium">Introduction</span>
//           </h4>
//         </div>

//         <button className="px-4 py-1.5 text-sm cursor-pointer rounded-lg border border-purple-500 text-purple-600 hover:bg-purple-50 transition">
//           + Content
//         </button>
//       </div>
//     </div>
//   );
// }

// export function InternalSection({
//   section,
//   sectionIndex,
//   addLecture,
// }: {
//   section: { id: number; lectures: { id: number }[] };
//   sectionIndex: number;
//   addLecture: (sectionIndex: number) => void;
// }) {
//   return (
//     <div className="bg-white border rounded-xl p-6 space-y-4">
//       <div className="flex">
//         <h3 className="font-semibold text-gray-800">
//           Section {sectionIndex + 1} :{" "}
//         </h3>{" "}
//         <span> Introduction</span>
//       </div>
//       {/* Lectures */}
//       {section.lectures.map((lec) => (
//         <InternalLecture key={lec.id} id={lec.id} />
//       ))}

//       <button
//         onClick={() => addLecture(sectionIndex)}
//         className="px-4 py-2 border rounded-lg cursor-pointer text-purple-600 border-purple-500 hover:bg-purple-50 transition"
//       >
//         + Add Lecture
//       </button>
//       <button
//         onClick={() => addLecture(sectionIndex)}
//         className="px-4 py-2 border rounded-lg cursor-pointer text-purple-600 border-purple-500 hover:bg-purple-50 transition"
//       >
//         + Curriculum Item
//       </button>
//     </div>
//   );
// }

// function Addsections() {
//   const [sections, setSections] = useState([{ id: 1, lectures: [{ id: 1 }] }]);

//   const addSection = () => {
//     setSections([...sections, { id: Date.now(), lectures: [] }]);
//   };

//   const addLecture = (sectionIndex: number) => {
//     const updatedSections = [...sections];

//     updatedSections[sectionIndex].lectures.push({
//       id: updatedSections[sectionIndex].lectures.length + 1,
//     });

//     setSections(updatedSections);
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen p-6">
//       <div className="max-w-4xl mx-auto space-y-6">
//         <h2 className="text-xl font-semibold text-gray-800">Create sections</h2>

//         {sections.map((section, index) => (
//           <InternalSection
//             key={section.id}
//             section={section}
//             sectionIndex={index}
//             addLecture={addLecture}
//           />
//         ))}

//         <button
//           onClick={addSection}
//           className="px-5 py-2 border cursor-pointer border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition"
//         >
//           + Section
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Addsections;

// it's initial export function InternalSection () {
//     return (
//         <div className="bg-sky-100 h-auto max-w-5xl" >
//             <div>
//                 <h3>Section</h3>
//                 <div>
//                     <img src="" alt="" />
//                     <input type="text" placeholder="title eg. Introduction"/>
//                 </div>
//             </div>

//             <div>
//                 <div>
//                     <div>
//                         <h3>Lecture</h3>
//                         <input type="text" placeholder="title" />
//                     </div>
//                     <div>
//                         <img src="" alt="" />
//                         <button>Content</button>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     )
// }
// function Addsections() {
//   return (
//     <div>
//         <h2>Create sections</h2>
//         <InternalSection/>
//         <button>
//             <img src="" alt="" />
//             Section
//         </button>
//     </div>
//   )
// }

// export default Addsections

export const InternalLecture = () => {
  const [divider, setdivider] = useState(false);
  const [videoUrl, setvideoUrl] = useState<string | null>(null);
  const [videofile, setvideofile] = useState<string | null>(null);
  const SaveLectureContent = () => {
    setdivider(!divider);
  };
  const handlevideochange = (e) => {
    if (e) {
      const file = e.target.files[0];
      setvideofile(file);
      setvideoUrl(URL.createObjectURL(file));
    }
  };
  const AddLectureContent = () => {
    setdivider(!divider);
    console.log("hiii");

    // return (
    //     <div>
    //       <h4>Upload Content</h4>
    //       <div>
    //         <video />
    //         <input type="file" placeholder="attach pdf" />
    //       </div>
    //       <button onClick={SaveLectureContent} >Save Content</button>
    //     </div>
    //   );
  };
  return (
    <>
      <div className="border rounded-lg">
        {/* Lecture Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
          {/* Left */}
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-gray-700"></span>
            <h4 className="text-gray-700">
              Lecture 1: <span className="font-medium">Introduction</span>
            </h4>
          </div>

          {/* Right Button */}
          <button
            className="flex items-center gap-2 px-4 py-1.5 text-sm rounded-lg border cursor-pointer border-purple-500 text-purple-600 hover:bg-purple-50 transition"
            onClick={AddLectureContent}
          >
            + Content
          </button>
        </div>

        {/* 🔹 Content Add Options */}
        {divider && (
          <div className="border-dashed border-2 border-gray-300 m-4 rounded-xl p-6 space-y-4">
            {/* Title */}
            <h3 className="text-sm font-semibold text-gray-700">
              Upload content
            </h3>

            {/* Content Row */}
            <div className="flex flex-col md:flex-row gap-20 items-start md:items-center">
              {/* Video Preview Box */}
              <div className="w-full md:w-64 h-36 bg-gray-100 p-2 rounded-lg flex flex-col items-center justify-center border">
              <input
                type="file"
                accept="video/mp4, video/*"
                placeholder="video url"
                className="p-2"
                value={videoUrl}
                onChange={(e) => handlevideochange(e)}
              />
                
              </div>
              {/* File Upload */}
              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm text-gray-600">
                  Attach PDF / Resources
                </label>

                <input
                  type="file"
                  className="block w-full text-sm text-gray-600
        file:mr-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-medium
        file:bg-purple-50 file:text-purple-600
        hover:file:bg-purple-100
        cursor-pointer"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={SaveLectureContent}
                className="px-5 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition shadow-sm"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export function InternalSection({
  id,
  Lecturenum,
  setLecturenum,
}: {
  id: number;
  Lecturenum: number;
  setLecturenum: number;
}) {
  const [Lecture, setLecture] = useState([{ id: 1 }]);
  const HandleCurriculum = () => {
    <div>
      <input type="file" />
    </div>;
  };
  const HandleLecture = () => {
    setLecture(() => [...Lecture, { id: Lecture.length + 1 }]);
  };
  return (
    <div className="bg-white border rounded-xl p-6 space-y-4">
      {/* 🔹 Section Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">
          Section {id + 1}: <span className="font-normal">Introduction</span>
        </h3>
      </div>

      {Lecture.map(() => (
        <InternalLecture />
      ))}

      {/* 🔹 Add Curriculum Item Button */}
      <button
        className="flex items-center gap-2 px-4 py-2 border rounded-lg text-purple-600 border-purple-500 hover:bg-purple-50 transition"
        onClick={HandleLecture}
      >
        + Add Lecture
      </button>
      <button
        className="flex items-center gap-2 px-4 py-2 border rounded-lg text-purple-600 border-purple-500 hover:bg-purple-50 transition"
        onClick={HandleCurriculum}
      >
        + Curriculum item
      </button>
    </div>
  );
}

function Addsections() {
  const [Sections, setSection] = useState([{ id: 1 }]);
  const [Lecturenum, setLecturenum] = useState(1);

  function handleSection() {
    setSection(() => [...Sections, { id: Sections.length + 1 }]);
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Create sections</h2>

        {Sections.map((item, idx) => (
          <InternalSection
            id={idx}
            key={idx}
            Lecturenum={Lecturenum}
            setLecture={setLecturenum}
          />
        ))}

        {/* 🔹 Add Section Button */}
        <button
          className="flex items-center gap-2 cursor-pointer px-5 py-2 border border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition"
          onClick={handleSection}
        >
          + Section
        </button>
      </div>
    </div>
  );
}

export default Addsections;

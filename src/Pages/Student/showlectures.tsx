import { useLocation } from "react-router-dom";
import type { lecture } from "../../Types";
import { Play, Clock, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import voideorl from "C:/Users/harsh/Videos/2024-11-07 11-36-08.mp4"

function Showlectures() {
  const location = useLocation();
  const module = location?.state?.section;

  console.log("module is ", module);
  
  const [activeLecture, setActiveLecture] = useState<string | null>(null);
  const [playLecture, setplayLecture] = useState("");

  useEffect(() => {
    console.log("playLecture is: ", playLecture);
    
  }, [playLecture])

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-slate-800">Lessons</h2>

      <div className="space-y-4">
        {module.lectures.map((item: lecture, index: number) => (
          <div
            key={item._id}
            onClick={() => setActiveLecture(item._id)}
            className={`group flex items-center justify-between bg-white border rounded-xl p-5 cursor-pointer transition-all duration-300 
              hover:border-blue-400 hover:shadow-lg
              ${activeLecture === item._id ? "border-blue-500 shadow-md" : "border-slate-200"}
              `}
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 text-blue-700 w-10 h-10 flex items-center justify-center rounded-lg font-semibold">
                {index + 1}
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition">
                  {item.title}
                </h3>

                <div className="flex items-center text-sm text-slate-500 mt-1">
                  <Clock className="w-4 h-4 mr-1 text-green-500" />
                  <span>{item.duration || "5 min"}</span>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              {activeLecture === item._id && (
                <CheckCircle className="text-green-500 w-5 h-5" />
              )}

              <button
                onClick={() => setplayLecture(item.videoUrl!)}
                className="flex items-center gap-2 cursor-pointer bg-linear-to-r from-blue-600 to-green-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition"
              >
                <Play className="w-4 h-4" />
                Play
              </button>
            </div>
          </div>
        ))}
      </div>

      {playLecture ? (
        <div>
          <video controls width="100%">
            <source src={playLecture} type="video/mp4" />
          </video>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Showlectures;

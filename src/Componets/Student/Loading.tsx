import type { LoadingProp } from "../../Types";

function Loading(classname: LoadingProp) {
   return (
    <div
      className={`fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center ${classname}`}
    >
      <div className="flex flex-col items-center gap-6">
        
        {/* Spinner */}
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-blue-200"></div>
          <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>
        </div>

        {/* Animated dots */}
        <div className="flex gap-2">
          <span className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></span>
          <span className="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:0.15s]"></span>
          <span className="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:0.3s]"></span>
        </div>

        {/* Text */}
        <p className="text-gray-700 font-medium tracking-wide animate-pulse">
          Loading content...
        </p>

      </div>
    </div>
  );
}

export default Loading;

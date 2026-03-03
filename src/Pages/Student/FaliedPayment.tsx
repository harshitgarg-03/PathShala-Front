import { useNavigate } from "react-router-dom";
import { CourseStore } from "../../ZustandStore/CourseStore";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const courseId = CourseStore((s) => s.specificCourseId);
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-100 via-sky-100 to-sky-200 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md text-center animate-fadeIn">
        {/* Animated Cross Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-sky-100 animate-ping"></div>
            <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-sky-500">
              <svg
                className="w-10 h-10 text-white animate-cross"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M6 18L18 6"
                />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-sky-600 mb-3">
          Payment Failed ❌
        </h1>

        <p className="text-gray-600 text-sm mb-6">
          Your transaction could not be completed.
          <br />
          Please try again or contact support.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 hover:bg-gray-300 transition duration-300 text-gray-800 font-medium py-2 px-5 rounded-lg"
          >
            Go Back
          </button>

          <button
            onClick={() => navigate(`/Course-Details/${courseId}`)}
            className="bg-sky-600 hover:bg-sky-700 transition duration-300 text-white font-medium py-2 px-5 rounded-lg shadow-md hover:shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>

      {/* Custom Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out forwards;
          }

          @keyframes cross {
            0% { transform: scale(0.5) rotate(-90deg); opacity: 0; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }

          .animate-cross {
            animation: cross 0.5s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default PaymentFailed;

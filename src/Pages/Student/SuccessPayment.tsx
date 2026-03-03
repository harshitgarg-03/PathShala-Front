// import { FC } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-100 via-sky-200 to-sky-300 p-4">
      
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md text-center animate-fadeIn">
        
        {/* Animated Check Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-sky-100 animate-ping"></div>
            <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-sky-500">
              <svg
                className="w-10 h-10 text-white animate-check"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-sky-600 mb-3">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 text-sm mb-6">
          Your transaction has been completed successfully.
          <br />
          Thank you for your purchase.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-sky-600 hover:bg-sky-700 cursor-pointer transition duration-300 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg"
        >
          Go to Home
        </button>
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

          @keyframes check {
            0% { stroke-dasharray: 0 50; }
            100% { stroke-dasharray: 50 0; }
          }

          .animate-check {
            stroke-dasharray: 50;
            animation: check 0.8s ease-in-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default PaymentSuccess;
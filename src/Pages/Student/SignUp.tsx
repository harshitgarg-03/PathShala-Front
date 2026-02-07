import { useNavigate } from "react-router-dom";
import Wrapper from "../../Componets/ReuseCompo/Wrapper";
import Fotter from "../../Data/FooterLogo.png";
import { User, Mail, Lock } from "lucide-react";

function SignUp() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div
        className="
    w-full sm:w-[80%] md:w-[50%] lg:w-[30%]
    bg-white max-h-screen
    border border-blue-200
    rounded-2xl
    shadow-md
    sm:py-6 → py-10
    lg:px-4 → px-8
    flex flex-col
    justify-center items-center mx-auto 
    space-y-6 sm:space-y-7 md:space-y-8
    "
      >
        <div>
          <img src={Fotter} alt="" className="h-20 sm:h-18 md:h-20" />
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Create Your Account
          </h2>

          <p className="text-sm sm:text-base text-gray-600">
            Sign up to start learning from the best instructors
          </p>
        </div>

        <div className="w-full space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />

            <input
              type="text"
              placeholder="Full Name"
              className="
          w-full
          pl-10 pr-4 py-2.5
          border border-gray-300
          rounded-lg
          text-sm
          focus:outline-none
          focus:ring-2 focus:ring-blue-500
          "
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />

            <input
              type="text"
              placeholder="Email Address"
              className="
          w-full
          pl-10 pr-4 py-2.5
          border border-gray-300
          rounded-lg
          text-sm
          focus:outline-none
          focus:ring-2 focus:ring-blue-500
          "
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />

            <input
              type="password"
              placeholder="Password"
              className="
          w-full
          pl-10 pr-4 py-2.5
          border border-gray-300
          rounded-lg
          text-sm
          focus:outline-none
          focus:ring-2 focus:ring-blue-500
          "
            />
          </div>
        </div>

        <div className="w-full">
          <button
            className="
        w-full
        bg-blue-700 hover:bg-blue-800
        text-white
        py-2.5
        rounded-lg
        font-medium
        transition
        cursor-pointer
        "
          >
            Sign Up
          </button>
        </div>

        <div className="w-full text-center space-y-4 pt-2">
          {/* Login Link */}
          <p className="text-sm sm:text-base text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-700 cursor-pointer font-semibold hover:underline"
            >
              Login
            </span>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300"></div>

            <span className="text-sm text-gray-500">or</span>

            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Button */}
          <button
            className="
    w-full
    flex items-center justify-center gap-3
    border border-gray-300
    rounded-lg
    py-2 sm:py-2.5
    text-sm sm:text-base
    text-gray-700
    hover:bg-gray-50
    transition
    "
          >
            {/* Google Icon (Optional) */}
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="h-5 w-5 cursor-pointer"
            />
            Continue with Google
          </button>
        </div>
      </div>
    </Wrapper>
  );
}

export default SignUp;

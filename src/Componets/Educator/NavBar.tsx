import logonew from "../../../public/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import usericon from "../../../public/user_icon.svg";
import Button from "../ReuseCompo/Button";

function NavBar() {
  const navigate = useNavigate();

  return (
    <div className="max-full mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
        {/* 🔹 Logo */}
        <img
          src={logonew}
          alt="Logo"
          className="h-9 sm:h-11 md:h-13 lg:h-15 w-auto cursor-pointer object-contain transition-transform duration-300 hover:scale-105"
          onClick={() => navigate("/")}
        />

        {/* 🔹 Middle Section */}
        <div className="hidden md:flex items-center gap-10 lg:gap-14 font-medium text-gray-700">
          <Link
            to="/My-Enroll"
            className="relative group hover:text-blue-600 transition"
          >
            Exploring
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Button
            title="Categories"
            classname="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 transition duration-300"
          />
        </div>

        {/* 🔹 Profile Icon */}
        <div className="flex items-center">
          <img
            src={usericon}
            alt="Profile"
            className="h-6 w-6 sm:h-7 sm:w-7 rounded-full cursor-pointer transition-transform duration-300 hover:scale-110"
            onClick={() => navigate("Profile")}
          />
        </div>
      </div>
    </div>
  );
}

export default NavBar;

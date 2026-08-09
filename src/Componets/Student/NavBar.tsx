import logonew from "../../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../ZustandStore/AuthStore";
import { UseProfile } from "../../ZustandStore/ProfileStore";
import Button from "../ReuseCompo/Button";
import usericon from '../../assets/user_icon.svg'

function NavBar() {
  const isCourlistpage = location.pathname.includes("/Course-List");
  const navigate = useNavigate();
  const isAuthenticate = useAuth((s) => s.isAuthenticate);
  const user = useAuth((s) => s.user);
  const updateProfile = UseProfile((s) => s.UpdateProfile);

  const handleBecomeEducator = async () => {
    if (!isAuthenticate) {
      navigate("/login");
      return;
    }

    if (user?.role === "student") {
      const confirmed = window.confirm("Are you sure you want to become an Educator/Instructor?");
      if (confirmed) {
        const formData = new FormData();
        formData.append("role", "instructor");
        await updateProfile(formData);
      } else {
        return;
      }
    }
    navigate("/Educator/DashBoard");
  };

  return (
    <div
      className={`flex h-16 md:h-20 mx-auto px-3 sm:px-4 md:px-6 lg:px-8 
  text-sm md:text-md justify-between items-center
  ${isCourlistpage ? "bg-sky-100" : "bg-sky-50"}`}
    >
      <img
        src={logonew}
        className="h-14 sm:h-16 md:h-16 lg:h-20 w-auto cursor-pointer object-contain"
        alt="logonew"
        onClick={() => navigate("/")}
      />
      <div className={`flex items-center gap-2 sm:gap-3 md:gap-4`}>
        {isAuthenticate && (
          <div
            className={`hidden sm:flex flex-row font-medium font-sans items-center justify-center`}
          > 
          <div onClick={handleBecomeEducator} >
            <Button  title={user?.role === "instructor" ? "Instructor Dashboard" : "Become Instructor"} classname="px-4 mr-2" />
          </div>
            <span className="text-gray-400 mx-1 md:mx-2">|</span>
            <Link
              to={"/My-Enroll"}
              className={`text-blue-700 ml-2 md:ml-4 hover:underline`}
            >
              My Enrollment
            </Link>
          </div>
        )}

        {isAuthenticate ? 
        
        (

          
          // logout button 
//           <button
//   onClick={handleLogout}
//   className="
//     group
//     flex items-center gap-2
//     px-3 sm:px-4 py-2
//     rounded-full
//     bg-gradient-to-r from-red-500 to-pink-500
//     hover:from-red-600 hover:to-pink-600
//     text-white
//     transition-all duration-300
//     shadow-md hover:shadow-lg
//     active:scale-95
//     cursor-pointer
//   "
// >
//   {/* Icon */}
//   <img
//   src={Logout}
//   alt="Logout"
//   className="
//     h-5 sm:h-6
//     transition-all duration-300
//     group-hover:translate-x-1
//     group-hover:rotate-12
//     filter invert brightness-200
//   "
// />

//   {/* Text */}
//   <span
//     className="
//       max-w-0 overflow-hidden
//       group-hover:max-w-15
//       transition-all duration-300
//       text-sm font-medium
//       whitespace-nowrap
//     "
//   >
//     Logout
//   </span>
// </button>

          <div>
            <img src={usericon} alt="" className={`h-6 cursor-pointer`} onClick={() => navigate("/Profile")} />
          </div>
        )
          : (
          <button
            className="
      flex items-center justify-center
      w-28 sm:w-36 md:w-40
      h-9 sm:h-10 md:h-12
      bg-blue-700 hover:bg-blue-800
      text-white text-xs sm:text-sm md:text-base
      rounded-xl
      px-3 sm:px-4 md:px-6
      transition
      cursor-pointer
    "
            onClick={() => navigate("/signup")}
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
}

export default NavBar;

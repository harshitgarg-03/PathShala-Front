import logonew from "../../Data/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ReuseCompo/Button";
import { useStore } from "../../ZustandStore/Store";
function NavBar() {

  const isCourlistpage = location.pathname.includes("/Course-List");
  const navigate = useNavigate();
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
  onClick={() => navigate('/')}
/>
      <div className={`flex items-center gap-2 sm:gap-3 md:gap-4`}>
        {/* <div
          className={`hidden sm:flex flex-row font-medium font-sans items-center justify-center`}
        >
          <Button title="Create Account " classname="px-4 mr-2" />
          <span className="text-gray-400 mx-1 md:mx-2">|</span>
          <Link to={"/My-Enroll"} className={`text-blue-700 ml-2 md:ml-4 hover:underline`}>
            My Enrollment
          </Link>
        </div> */}

        <button
          className={`flex items-center justify-center
    w-28 sm:w-36 md:w-40
    h-9 sm:h-10 md:h-12
    bg-blue-700 hover:bg-blue-800
    text-white text-xs sm:text-sm md:text-base
    rounded-xl
    px-3 sm:px-4 md:px-6
    transition cursor-pointer`}
    onClick={() => navigate("/signup")}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

export default NavBar;

import React from "react";
import logonew from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import Button from "../ReuseCompo/Button";
function NavBar() {
  const isCourlistpage = location.pathname.includes("/Course-List");

  return (
    <div
      className={`flex h-20 mx-auto text-md px-18 pr-8 justify-between ${isCourlistpage ? "bg-sky-100" : "bg-white"} w-screen`}
    >
      <img src={logonew} className="h-22 w-auto object-contain" alt="logonew" />
      <div className={`flex gap-4`}>
        <div
          className={`flex flex-row font-medium font-sans items-center justify-center`}
        >
          <Button title="Create Account "classname="px-4 mr-2" />
          |{" "}
          <Link to={"/My-Enroll"} className={`text-blue-700 ml-4`}>
            My Enrollment
          </Link>
        </div>

        <button
          className={`ml-10 items-center w-50 h-12 bg-blue-700 mt-4 text-white rounded-xl px-8`}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

export default NavBar;

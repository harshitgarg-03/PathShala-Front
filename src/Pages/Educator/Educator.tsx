import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../Componets/Educator/NavBar";
import Wrapper from "../../Componets/ReuseCompo/Wrapper";
import DashBoard from "./DashBoard";
import Footer from "../../Componets/Student/Footer";
import AddCourse from "./AddCourse";

function Educator() {
  return (
    <div>
      <NavBar />
      <Wrapper>{<Outlet />}</Wrapper>
    </div>
  );
}

export default Educator;

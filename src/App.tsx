import { Route, Routes, useMatch } from "react-router-dom";
import Home from "./Pages/Student/Home";
import CoursesList from "./Pages/Student/CoursesList";
import CourseDetails from "./Pages/Student/CourseDetails";
import MyEnrollment from "./Pages/Student/MyEnrollment";
import Player from "./Pages/Student/Player";
import Loading from "./Componets/Student/Loading";
import Educator from "./Pages/Educator/Educator";
import DashBoard from "./Pages/Educator/DashBoard";
import MyCourses from "./Pages/Educator/MyCourses";
import StudentEnrolled from "./Pages/Educator/StudentEnrolled";
import AddCourse from "./Pages/Educator/AddCourse";
import NavBar from "./Componets/Student/NavBar";
import Login from "./Pages/Student/Login";
import SignUp from "./Pages/Student/SignUp";
import { useAuth } from "./ZustandStore/AuthStore";
import { useEffect } from "react";
import ProfileCard from "./Pages/Student/ProfileCard";
import EducatorProfile from './Pages/Educator/ProfileCard'
import Footer from "./Componets/Student/Footer";
import Addsections from "./Pages/Educator/Addsections";

function App() {
  const isEducatorPage = useMatch("/Educator/*");
  const getuser = useAuth((s) => s.CurrentUser);
  useEffect(() => {
    getuser();
  }, []);
  return (
    <>
      {!isEducatorPage && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Course-List" element={<CoursesList />} />
        <Route path="/Course-List/:input" element={<CoursesList />} />
        <Route path="/Course-Details/:id" element={<CourseDetails  />} />
        <Route path="/My-Enroll" element={<MyEnrollment />} />
        <Route path="/Player/:courseId" element={<Player />} />
        <Route path="/Loading/:path" element={<Loading />} />
        <Route path="/Profile" element={<ProfileCard />} />
 ]    
        <Route path="/Educator" element={<Educator />}>
          <Route path="DashBoard" element={<DashBoard />} />
          <Route path="Profile" element={<EducatorProfile/>} />
          <Route path="MyCourses" element={<MyCourses />} />
          <Route path="StudentsEnroll" element={<StudentEnrolled />} />
          <Route path="AddCourse" element={<AddCourse />} />
          <Route path="AddSection" element={<Addsections/>} />
        </Route>
      </Routes>

      <Footer/>
    </>
  );
}

export default App;

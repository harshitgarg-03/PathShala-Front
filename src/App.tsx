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
import EducatorProfile from "./Pages/Educator/ProfileCard";
import Footer from "./Componets/Student/Footer";
import Addsections from "./Pages/Educator/Addsections";
import Enrolled from "./Pages/Student/Enrolled";
import ManageCourses from "./Pages/Educator/ManageCourse";
import Analytics from "./Pages/Educator/Analytics";
import ProtectedRoute from "./Componets/ProtectedRoute";

function App() {
  const isEducatorPage = useMatch("/Educator/*");

  const getuser = useAuth((s) => s.CurrentUser);
  const isBooting = useAuth((s) => s.isBooting);

  useEffect(() => {
    getuser();
  }, []);

  if (isBooting) return <Loading />;

  return (
    <>
      {!isEducatorPage && <NavBar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Course-List" element={<CoursesList />} />
        <Route path="/Course-List/:input" element={<CoursesList />} />
        <Route path="/Course-Details/:id" element={<CourseDetails />} />

        {/*  Student Protected */}
        <Route
          path="/My-Enroll"
          element={
            <ProtectedRoute role="student">
              <MyEnrollment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Player/:courseId"
          element={
            <ProtectedRoute role="student">
              <Player />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Profile"
          element={
            <ProtectedRoute>
              <ProfileCard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/EnrollC"
          element={
            <ProtectedRoute role="student">
              <Enrolled />
            </ProtectedRoute>
          }
        />

        {/*  Educator Protected Layout */}
        <Route
          path="/Educator"
          element={
            <ProtectedRoute role="educator">
              <Educator />
            </ProtectedRoute>
          }
        >
          <Route path="DashBoard" element={<DashBoard />} />
          <Route path="Profile" element={<EducatorProfile />} />
          <Route path="MyCourses" element={<MyCourses />} />
          <Route path="StudentsEnroll" element={<StudentEnrolled />} />
          <Route path="AddCourse" element={<AddCourse />} />
          <Route path="AddSection/:courseId" element={<Addsections />} />
          <Route path="Manage-Course" element={<ManageCourses />} />
          <Route path="Analytics" element={<Analytics />} />
        </Route>

        {/* Optional Loading Route */}
        <Route path="/Loading/:path" element={<Loading />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

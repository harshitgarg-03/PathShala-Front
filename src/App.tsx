import { Route, Routes, useMatch } from "react-router-dom";
import Home from "./Pages/Student/Home";
import CoursesList from "./Pages/Student/CoursesList";
import CourseDetails from "./Pages/Student/CourseDetails";
import Loading from "./Componets/Student/Loading";
import Educator from "./Pages/Educator/Educator";
import DashBoard from "./Pages/Educator/DashBoard";
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
import PaymentSuccess from "./Pages/Student/SuccessPayment";
import PaymentFailed from "./Pages/Student/FaliedPayment";
import Enrollement from "./Pages/Student/Enrolled";
import Showlectures from "./Pages/Student/showlectures";
import { StudentCourseStore } from "./ZustandStore/StudentCourseStore";


function App() {
  const isEducatorPage = useMatch("/Educator/*");

  const getuser = useAuth((s) => s.CurrentUser);
  const isBooting = useAuth((s) => s.isBooting);
  const fetchPublishedCourses = StudentCourseStore(s => s.getPublishedCourse);

  useEffect(() => {
    getuser();
    fetchPublishedCourses();
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
              <Enrollement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/My-Enroll/Section"
          element={
            <ProtectedRoute role="student">
              <Showlectures/>
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

        <Route
          path="/success"
          element={
            <ProtectedRoute role="student">
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cancel"
          element={
            <ProtectedRoute role="student">
              <PaymentFailed />
            </ProtectedRoute>
          }
        />

        {/*  Educator Protected Layout */}
        <Route
          path="/Educator"
          element={
            <ProtectedRoute role="instructor">
              <Educator />
            </ProtectedRoute>
          }
        >
          <Route path="DashBoard" element={<DashBoard />} />
          <Route path="Profile" element={<EducatorProfile />} />
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

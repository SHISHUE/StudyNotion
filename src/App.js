import { Route, Routes } from "react-router-dom";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Setting from "./components/core/Dashboard/Setting";
import Error from "./pages/Error";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import {useSelector} from 'react-redux'
import MyCourses from "./components/core/Dashboard/MyCourses";
import AddCourse from "./components/core/Dashboard/AddCourse/index";
import EditCourse from "./components/core/Dashboard/EditCourse/index";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import InstructorPage from "./components/core/Dashboard/InstructorDashboard/InstructorPage";

function App() {
  const {user} = useSelector((state) => state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <OpenRoute>
              <Home />
            </OpenRoute>
          }
        />
        <Route
          path="catalog/:catalogName"
          element={
            <OpenRoute>
              <Catalog />
            </OpenRoute>
          }
        /><Route
        path="courses/:courseId"
        element={
          <OpenRoute>
            <CourseDetails />
          </OpenRoute>
        }
      />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="/forget-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route
          path="/about"
          element={
            <OpenRoute>
              <About />
            </OpenRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <OpenRoute>
              <Contact />
            </OpenRoute>
          }
        />
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<Setting />} />
          

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
                <Route path="/dashboard/cart" element={<Cart />} />
              </>
            )
          }

          {/* for INstructor only  */}
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="/dashboard/my-courses" element={<MyCourses />} />
                <Route path="/dashboard/add-course" element={<AddCourse />} />
                <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />} />
                <Route path="/dashboard/instructor" element={<InstructorPage />} />
               
              </>
            )
          }




        </Route>

          <Route element={<PrivateRoute><ViewCourse /></PrivateRoute>}>
              {
                user?.accountType === "Student" && (
                  <>
                    <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails />}>
                      
                    </Route>
                  </>
                )
              }
          </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;

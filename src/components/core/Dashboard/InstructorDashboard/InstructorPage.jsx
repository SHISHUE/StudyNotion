import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchInstructorCourses } from "../../../../services/operations/courseAPI";
import { getInstructorData } from "../../../../services/operations/profileAPI";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorChart";

function InstructorPage() {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const getCourseDataWithStats = async () => {
      setLoading(true);

      try {
        const instructorApiData = await getInstructorData(token);
        const result = await fetchInstructorCourses(token);

        // console.log("INSTRUCTOR", instructorApiData)

        if (instructorApiData.length) {
          setInstructorData(instructorApiData);
        }
        if (result) {
          setCourses(result);
        }
      } catch (error) {
        // console.log("error in instructor dashboard", error.message);
      }
      setLoading(false);
    };
    getCourseDataWithStats();
  }, [token]);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );
  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentEnrolled,
    0
  );

  return (
    <div className="text-richblack-5">
      <div className="flex flex-col ">
        <h2 className="text-[28px] leading-[34px] font-semibold">hey 👋 {user?.firstName}</h2>
        <p className="text-[18px] leading-[24px] font-medium">Let's start something new</p>
      </div>

      {loading ? (
        <div className="text-[34px] leading-[38px] font-semibold flex justify-center items-center">Loading...</div>
      ) : courses?.length > 0 ? (
        <div>
          {" "}
          <div className="flex gap-2">
          {instructorData && <InstructorChart courses={instructorData} />}

            <div className="bg-richblack-700 w-[40%] p-2 rounded">
                <h1 className="text-[34px] leading-[38px] font-semibold">Statistics</h1>
              <div className="flex flex-col justify-evenly h-full">
                <div className="flex flex-col gap-3">
                  <h2 className="text-[26px] leading-[36px] font-medium text-richblack-200">Total Courses</h2>
                  <p className="text-[34px] leading-[34px] ml-4 font-semibold">{courses.length} Courses</p>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="text-[26px] leading-[36px] font-medium text-richblack-200">Total Students</h2>
                  <p className="text-[34px] leading-[34px] ml-4 font-semibold">{totalStudents} Students</p>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="text-[26px] leading-[36px] font-medium text-richblack-200">Total Income</h2>
                  <p className="text-[34px] leading-[34px] ml-4 font-semibold"> Rs. {totalAmount}</p>
                </div>
              </div>{" "}
            </div>
          </div>
          <div className="bg-richblack-700 mt-2 p-2 rounded">
            {/* Render 3 Courses  */}
            <div className="flex w-full justify-between my-1">
              <p className="text-[28px] leading-[34px] font-semibold ml-4">Your Courses</p>
              <Link to="/dashboard/my-courses" className="text-[18px] leading-[24px] mr-4 hover:text-[#FFD60A] border-b-[0px] overflow-hidden hover:border-b-[1px] transition-all duration-200">View all</Link>
            </div>
            <div className="w-full h-full flex justify-between">
              {courses?.slice(0, 3).map((course) => (
                <div className="w-[33%] h-[20%] bg-richblack-900 rounded-md">
                 <div className="w-full overflow-hidden h-[185px] rounded-md">
                 <img src={course.thumbnail} alt="" className=" aspect-square object-cover"/>
                 </div>
                  <div className="text-[18px] leading-[24px] px-2 mt-2">
                    <p>{course.courseTitle}</p>
                  </div>
                  <div className="flex gap-x-3 px-1 my-2">
                    <p className="text-[16px] leading-[24px] text-richblack-200">{course?.studentEnrolled?.length} Students</p>
                    <p className="text-[16px] leading-[24px] text-richblack-200">|</p>
                    <p className="text-[16px] leading-[24px] text-richblack-200">Rs. {course.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>You have not created any course yet</p>{" "}
          <Link to="/dashboard/add-course">Create a Course</Link>
        </div>
      )}
    </div>
  );
}

export default InstructorPage;

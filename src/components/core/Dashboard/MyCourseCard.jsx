import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../services/operations/courseAPI";
import { Table, Thead, Tr, Th, Tbody, Td } from "react-super-responsive-table";
import { MdError } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import ConfirmationModal from "../../common/ConfirmationModal";
import { useDispatch } from "react-redux";
import { deleteCourse } from "../../../services/operations/courseAPI";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

function MyCourseCard() {
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [hour, setHour] = useState(3);
  const [minute, SetMinute] = useState(30);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);

      if (result) {
        setCourses(result);
      }
    };
    fetchCourses();
  }, []);

  const handleCourseDelete = async (courseId) => {
    setLoading(true);

    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  };


 

  return (
    <div>
      <Table>
        <Thead>
          <Tr className="flex gap-x-12 border-richblack-800 py-2 px-10 border-[1px] ">
            <Th className="grow -ml-[24vw]  leading-[22px] font-medium text-richblack-100">Courses</Th>
            <Th className=" leading-[22px] font-medium text-richblack-100">Duration</Th>
            <Th className=" leading-[22px] font-medium text-richblack-100">Price</Th>
            <Th className=" leading-[22px] font-medium text-richblack-100">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses.length === 0 ? (
            <Tr className="flex justify-center items-center">
              <Td className="text-[22px] leading-[32px] font-semibold text-richblack-5">No Courses Found</Td>
            </Tr>
          ) : (
            courses.map((course) => (
              <Tr
                key={course._id}
                className="flex gap-x-2 border-richblack-800 p-8 border-[1px]"
              >
                <Td className="flex gap-x-8 w-full">
                  <img
                    src={course?.thumbnail}
                    alt="course-logo"
                    className="h-[150px] w-[220px] rounded-md object-cover"
                  />
                  <div className="flex grow flex-col ">
                    <p className="text-[20px] leading-[28px] font-semibold text-richblack-5">{course?.courseTitle}</p>
                    <p className="text-[14px] leading-[22px] text-richblack-100">{course?.courseDescription}</p>
                    

                    {course.status === "draft" ? (
                      <p className="text-[#c745af] flex text-[12px] items-center gap-x-2 my-2 px-2 py-1 bg-[#2C333F] w-fit rounded-full">
                        <MdError />
                        DRAFTED
                      </p>
                    ) : (
                      <p className="text-[#c6e150] text-[12px] flex gap-x-2 items-center my-2 px-2 py-1 bg-[#2C333F] w-fit rounded-full">
                        <IoMdCheckmarkCircle /> PUBLISHED
                      </p>
                    )}
                  </div>
                </Td>
                <Td className="mr-[3vw] w-[8vw] text-[14px] font-medium leading-[22px] text-richblack-100 ">{hour}hr {minute}min</Td>
                <Td className="mr-[5vw] text-[14px] font-medium leading-[22px] text-richblack-100">{course?.price}</Td>
                <Td className="flex h-7 items-center text-[14px] font-medium leading-[22px] text-richblack-100">
                  <button
                    disabled={loading}
                    className="mr-5"
                    onClick={() => navigate(`/dashboard/edit-course/${course._id}`) }
                  >
                    <MdModeEdit />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course ?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: () => {
                          setConfirmationModal(null);
                        },
                      });
                    }}
                  >
                    <RiDeleteBin5Line />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}

export default MyCourseCard;

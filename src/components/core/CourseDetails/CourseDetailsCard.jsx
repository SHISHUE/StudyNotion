import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import copy from 'copy-to-clipboard';
import {toast} from 'react-hot-toast';
import { setAddCart } from "../../../slices/cartSlice";
import { FaShare } from "react-icons/fa";

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile);
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if(user && user?.accountType === "Instructor") {
        toast.error("Yor are an Instructor, you cant buy a course");
        return;
    }
    
    if(token) {
        dispatch(setAddCart(course));
        return;
    }
    setConfirmationModal({
        text1: "You are not logged in.",
        text2: "Please login to add to cart",
        bnt1Text: "Log in",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
  }
  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link Copy to Clipboard")
  }

  return (
    <div className="flex flex-col bg-richblack-700 rounded-xl">
      <img
        src={course.thumbnail}
        alt="thumbnail-logo"
        className="max-h-[300px] min-h-[180px] w-[25vw] rounded-xl object-cover"
      />

      <div className="px-3 py-1">
      <div className="text-[30px] leading-[38px] font-bold text-richblack-5">Rs. {course?.price}</div>
      <div className='flex flex-col gap-y-3 mt-2'>
        <button 
        className="bg-[#FFD60A] w-full px-1 py-2 mx-auto rounded-xl text-richblack-900"
          onClick={
            user && course?.studentEnrolled?.includes(user?._id)
              ? () => navigate("/dashboard/enrolled-courses")
              : handleBuyCourse
          }
        >
          {user && course?.studentEnrolled.includes(user?._id)
            ? "Go to Course "
            : "Buy Now"}
        </button>

        {
            (!course?.studentEnrolled.includes(user?._id)) && (<button onClick={() => handleAddToCart()}  className="bg-[#161D29] w-full px-1 py-2 mx-auto rounded-xl text-richblack-5 shadow-sm">Add Cart</button>)
        }
      </div>

      <div className="w-full my-2 py-1">
        <p className="text-[14px] text-center leading-[22px] text-richblack-25 mb-1">30-Day Money-Back Guarentee</p>
        <p className="text-[16px] leading-[24px] font-medium text-richblack-5">This Course Includes:</p>
        <div className="flex flex-col gap-y-3">
        {
            course?.instructions?.map((item, index) => (
                <p key={index} className="flex gap-x-2 text-[14px] leading-[22px] font-medium text-[#06D6A0]"><span>{item.replace(/^\[["']|["']\]$/g, "")}</span></p>
            ))
        }
        </div>
      </div>
      <div>
        <button className="mx-auto flex items-center gap-x-2 py-2  text-[#FFD60A]" onClick={handleShare}>Share <FaShare /></button>
      </div>
      </div>
    </div>
  );
}

export default CourseDetailsCard;

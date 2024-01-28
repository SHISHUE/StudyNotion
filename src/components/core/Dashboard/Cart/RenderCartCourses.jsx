import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoStarFill } from "react-icons/go";
import ReactStars from "react-rating-stars-component";
import { RiDeleteBin5Line } from "react-icons/ri";
import { setRemoveCart } from "../../../../slices/cartSlice";
import GetAvgRating from "../../../../utils/avgRating";
import RatingStars from "../../../common/RatingStars";

function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const getAvgRating = (course) => {
      cart.forEach((element) => {
        if (
          element &&
          element.ratingAndReview &&
          Array.isArray(element.ratingAndReview)
        ) {
          const count = GetAvgRating(element.ratingAndReview);
          setAvgReviewCount(count);
        } else {
          // Handle the case when ratingAndReview is not an array
          setAvgReviewCount(0);
        }
      });
    };
    getAvgRating();
  }, []);

  return (
    <div className="w-full">
      {cart.map((course, index) => (
        <div className="flex justify-between mb-3 pb-2 border-b-[1px] border-richblack-300">
          <div key={index} className="flex gap-x-4 items-center">
            <img
              src={course.thumbnail}
              alt="course-thubmnail"
              className="w-[18vw] h-[24vh] object-cover rounded-lg"
            />
            <div className="flex flex-col gap-3">
              <p className="text-[18px] leading-[26px] font-medium text-richblack-5">
                {course.courseTitle}
              </p>
              <p className="text-[16px] leading-[24px] text-richblack-200">
                {course?.courseDescription}
              </p>
              <div className="flex gap-x-2 items-center ">
                <span className="text-[16px] leading-[24px] font-semibold text-[#E7C009]">
                  {avgReviewCount}
                </span>
                {/* TODO: GEt Average rate  */}
                <RatingStars Review_Count={avgReviewCount} Star_Size={16} />

                <span className="flex text-richblack-200">
                  {" "}
                  ({course?.ratingAndReview?.length} Ratings )
                </span>
              </div>
              <p className="text-[14px] leading-[22px] font-medium text-richblack-300">
                Total Courses • Lesson • Beginner
              </p>
            </div>
          </div>

          <div className="flex  flex-col items-center gap-y-5">
            <button
              className="flex items-center gap-x-3 px-4 py-2 bg-richblack-900 border-[1px] border-richblack-800 rounded-xl text-[#EF476F] hover:bg-richblack-800 hover:border-richblack-700 transition-all duration-200"
              onClick={() => dispatch(setRemoveCart(course._id))}
            >
              <RiDeleteBin5Line />
              <span>Remove</span>
            </button>

            <p className="text-[24px] leading-[32px] font-semibold text-[#FFD60A]">Rs {course?.price} </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RenderCartCourses;

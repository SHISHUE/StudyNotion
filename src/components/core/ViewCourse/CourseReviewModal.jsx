import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import IconBtn from '../../common/IconBtn';
import { createRating } from "../../../services/operations/courseAPI";
import { RxCross1 } from "react-icons/rx";


function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile);
  const {courseEntireData} = useSelector((state) => state.viewCourse)
  const token = JSON.parse(localStorage.getItem("token"));



  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, []);

  const onSubmit = async(data) => {
    await createRating({
      courseId: courseEntireData._id,
      rating: data.courseRating,
      review: data.courseExperience,
    },token);

    setReviewModal(false);

  };
  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  };

  return (
    <div className="absolute top-[10%] left-[40%]  z-50 bg-black text-richblack-5">
      <div className="w-[400px] h-maxContent  flex flex-col items-center bg-richblack-700 rounded backdrop:blur-md">
        {/* Modal Header  */}
        <div className="flex w-full justify-between border-b-[1px] border-richblack-200 bg-richblack-500 p-3 mx-auto">
          <p className="text-[18px] leading-[26px] font-semibold text-richblack-5">Add Review</p>
          <button onClick={() => setReviewModal(false)}><RxCross1 /></button>
        </div>

        {/* Modal Body  */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-2">
            <img
              src={user?.image}
              alt="user-avatar"
              className="aspect-square w-[15%] rounded-full object-cover mt-2"
            />
            <div className="flex gap-x-2 items-center">
              <p className="text-[16px] leading-[24px] font-semibold">{user?.firstName}</p>
              <p className="text-[16px] leading-[24px] font-semibold">{user?.lastName}</p>
            </div>
            <p className="text-[16px] leading-[24px] font-medium">Posting Publicly</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mt-1 star"
        >
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
            classNames={"star"}
          />

          <div className="flex flex-col gap-2">
          <label htmlFor="review" className="text-[14px] leading-[22px] ">Give your review</label>
          <textarea
            name="review"
            id="review"
            cols="40"
            className="w-full bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]"
            placeholder="Add your experience"
            {...register("courseExperience", { required: true })}
            rows="7"
          ></textarea>
          {errors.courseExperience && (<span className="text-[14px] leading-[20px] text-[#d14545]">Please add review**</span>)}

          </div>

          <div className="flex gap-2 ml-auto my-2">
            <button onClick={() => setReviewModal(false)}  className="bg-richblack-900 text-richblack-5 text-[18px] rounded-md leading-[24px] font-semibold px-2 py-2 mr-2 hover:bg-richblack-800 hover:text-richblack-25 transition-all duration-200">Cancel</button>
            <IconBtn text="Submit" ></IconBtn>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CourseReviewModal;

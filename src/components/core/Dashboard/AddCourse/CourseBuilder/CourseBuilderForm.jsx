 // eslint-disable-next-line
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { GrAddCircle } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import NestedView from "./NestedView";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import { toast } from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseAPI";

function CourseBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  
  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  
  // console.log("COURSE KA DATA DEKH RAHE HAI....", course);
  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }

    //Update Value
    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    //Loading False
    setLoading(false);
  };

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const gotoNext = () => {
    if (course?.courseContent?.length === 0) {
      toast.error("Please add atleast one section");
    }
    else if (
      course.courseContent.some((section) => section?.subSection?.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section");
    } else {
      dispatch(setStep(3));
    }

  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }

  return (
    <div className="text-richblack-5 mt-3 ">
      <p className="text-[24px] font-semibold leading-[32px] text-richblack-5">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4">
          <label htmlFor="sectionName" className="text-[16px]  leading-[24px] text-richblack-5 ml-2 ">
            Section Name <sup className="text-[14px] text-[#EF476F] ">*</sup>
          </label>
          <input
            type="text"
            id="sectionName"
            placeholder="Add section"
            {...register("sectionName", { required: true })}
            className="w-full ml-2 mt-2 bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]"
          />
          {errors.sectionName && <span>Section Name is required **</span>}
        </div>
        <div className="mt-5 flex gap-4">
          <IconBtn
            type="submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses={"text-white bg-richblack-900"} // Fix the syntax error here
          >
            <GrAddCircle className="text-richblack-900" />
          </IconBtn>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course?.courseContent?.length > 0 && <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>}

      <div className="flex justify-end gap-x-3 mt-10">
        <button
          onClick={goBack}
          className="rounded-md cursor-pointer flex items-center"
        >
          Back
        </button>
        <IconBtn text="Next" onClick={gotoNext}>
          <IoIosArrowForward />{" "}
        </IconBtn>
      </div>
    </div>
  );
}

export default CourseBuilderForm;

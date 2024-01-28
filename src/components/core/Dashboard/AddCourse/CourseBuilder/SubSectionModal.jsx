import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { setCourse } from "../../../../../slices/courseSlice";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseAPI";
import { RxCross1 } from "react-icons/rx";
import Upload from "../CourseInformation/Upload";
import IconBtn from "../../../../common/IconBtn";

function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { course } = useSelector((state) => state.course);
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("videoFile", currentValues.lectureVideo);
    }if (currentValues.lectureDuration !== modalData.videoDuration) {
      formData.append("videoDuration", currentValues.lectureDuration);
    }

    setLoading(true);

    const result = await updateSubSection(formData, token);

    if (result) {
      //TODO: same check
      const updatedCourseContent = course.courseContent.map((section) => section._id === modalData.sectionId ? result : section);
      const updatedCourse = {...course, courseContent: updatedCourseContent}
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) return;
    if (edit) {
      if (!isFormUpdated) {
        toast.error("No change");
      } else {
        //edit kr do
        handleEditSubSection();
      }
      return;
    }

    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("videoFile", data.lectureVideo);
    formData.append("videoDuration", data.lectureDuration);
    setLoading(true);
    //API CALL
    const result = await createSubSection(formData, token);
    if (result) {
      //TODO: check for updation
      const updatedCourseContent = course.courseContent.map((section) => section._id === modalData ? result : section);
      const updatedCourse = {...course, courseContent: updatedCourseContent}
      dispatch(setCourse(updatedCourse))
      
    }
    setModalData(null);
    setLoading(false);
  };

  return (
    <div className="relative  top-1/2 left-1/2 rounded-xl bg-richblack-800 translate-x-[-50%]  translate-y-[-50%] w-[45vw] overflow-hidden scrollbar-hidden">
      <div className="mx-[1vw] rounded-xl overflow-hidden scrollbar-hidden">
        <div className="w-full mb-2 px-3 py-2 flex justify-between my-3 border-b-[1px] rounded-md border-richblack-200 items-center bg-[#424854]">
          <p className="text-[18px] font-semibold leading-[26px] ">
            {view && "viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross1 />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} >
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          <div className="my-2">
            <label htmlFor="lectureDuration" className="text-[14px] text-richblack-5 flex items-center">Lecture Duration <sup className="text-[14px] text-[#EF476F] ">*</sup></label>
            <input
              type="text"
              id="lectureDuration"
              placeholder="Enter Lecture Duration"
              {...register("lectureDuration", { required: true })}
              className="w-full bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]"
            />
            {errors.lectureDuration && <span className="text-[12px] text-[#dd3f3f]">Lecture Duration is required **</span>}
          </div>


          <div className="my-2">
            <label htmlFor="lectureTitle" className="text-[14px] text-richblack-5 flex items-center">Lecture Title <sup className="text-[14px] text-[#EF476F] ">*</sup></label>
            <input
              type="text"
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="w-full bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]"
            />
            {errors.lectureTitle && <span className="text-[12px] text-[#dd3f3f]">Lecture Title is required **</span>}
          </div>
          <div className="my-2">
            <label htmlFor="lectureDesc" className="text-[14px] text-richblack-5 flex items-center">Lecture Description <sup className="text-[14px] text-[#EF476F] ">*</sup></label>
            <textarea
              id="lectureTitle"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              className="w-full min-h-[120px]  bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]"
            />
            {errors.lectureDesc && (
              <span className="text-[12px] text-[#dd3f3f]">Lecture Description is required **</span>
            )}
          </div>

          {
            !view && (<div className="mb-1">
              <IconBtn text={loading ? "Loading..." : edit ? "Save Changes" : "Save"} />
            </div>)
          }
        </form>
      </div>
    </div>
  );
}

export default SubSectionModal;

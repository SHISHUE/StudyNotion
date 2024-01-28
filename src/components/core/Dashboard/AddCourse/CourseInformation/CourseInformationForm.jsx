import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseAPI";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import RequirementField from "./RequirementField";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";
import { toast } from "react-hot-toast";
import ChipInput from "./ChipInput";
import Upload from "./Upload";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    };

    if (editCourse) {
      setValue("courseTitle", course.courseTitle);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirment", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories();
  },[]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseTitle ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tags.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseImage !== course.thumbnail ||
      currentValues.courseRequirments.toString() !==
        course.instructions.toString()
    )
      return true;

    return false;
  };

  //handles Next button click
  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);
        formData.append("token", token);
        if (currentValues.courseTitle !== course.courseTitle) {
          formData.append("courseTitle", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseDescription);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.courseTags.toString() !== course.tags.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags));
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }
        if (currentValues.thumbnail !== course.thumbnail) {
          formData.append("thumbnailImage", data.thumbnail);
        }
        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No Changes made so far");
      }
      return;
    }
    const formData = new FormData();
    formData.append("courseTitle", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("category", data.courseCategory);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("thumbnailImage", data.thumbnail);

    // console.log(
    //   "COURSE KA DATA....",
    //   data.courseTitle,
    //   data.courseShortDesc,
    //   data.courseBenefits,
    //   data.coursePrice,
    //   JSON.stringify(data.courseTags),
    //   data.courseCategory,
    //   JSON.stringify(data.courseRequirements),
    //   data.thumbnail
    // );
    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);

    // console.log("RESULT YEH AA RAHA HAI....", result);
  };

  return (
    <div className="text-richblack-5 bg-richblack-800 rounded-md">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full rounded-md richblack-700 bg-richblack-800 p-6 space-y-8"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="courseTitle"
            className="text-[14px] text-richblack-5 flex items-center"
          >
            Course Title<sup className="text-[14px] text-[#EF476F] ">*</sup>
          </label>
          <input
            type="text"
            id="courseTitle"
            placeholder="Enter course title"
            {...register("courseTitle", { required: true })}
            className="w-full bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]"
          />
          {errors.courseTitle && (
            <span className="text-[12px] text-[#dd3f3f]">
              Course title is required **
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="courseShortDesc"
            className="text-[14px] text-richblack-5 flex items-center"
          >
            Course Short Description{" "}
            <sup className="text-[14px] text-[#EF476F] ">*</sup>
          </label>
          <textarea
            name="courseShortDesc"
            placeholder="Enetr Description"
            id="courseShortDesc"
            cols="30"
            rows="10"
            {...register("courseShortDesc", { required: true })}
            className="w-full min-h-[130px]  bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]"
          />
          {errors.courseShortDesc && (
            <span className="text-[12px] text-[#dd3f3f]">
              Course Description is required **
            </span>
          )}
        </div>

        <div className="relative flex flex-col gap-2">
          <label
            htmlFor="price"
            className="text-[14px] text-richblack-5 flex items-center"
          >
            Course price<sup className="text-[14px] text-[#EF476F] ">*</sup>
          </label>

          <div className="relative flex items-center">
            <HiOutlineCurrencyRupee className="absolute top-[10%] mt-2 ml-2 text-richblack-400 " />
            <input
              type="text"
              id="coursePrice"
              placeholder="Enter course price"
              {...register("coursePrice", {
                required: true,
                valueAsNumber: true,
              })}
              className="w-full pl-8 bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]"
            />
          </div>

          {errors.coursePrice && (
            <span className="text-[12px] text-[#dd3f3f]">
              Course price is required **
            </span>
          )}
        </div>

        <div className="relative flex flex-col gap-2">
          <label
            htmlFor="courseCategory"
            className="text-sm text-richblack-5 flex items-center"
          >
            Course Category <sup className="text-[#EF476F]">*</sup>
          </label>

          <select
            id="courseCategory"
            defaultValue=""
            {...register("courseCategory", { required: true })}
            className="bg-richblack-800 text-richblack-5 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E] w-full"
          >
            <option value="" disabled className="text-richblack-5">
              Choose a Category
            </option>

            {!loading &&
              courseCategories.map((category, index) => (
                <option
                  key={index}
                  value={category?._id}
                  className="text-richblack-5"
                >
                  {category?.name}
                </option>
              ))}
          </select>

          {errors.courseCategory && (
            <span className="text-[12px] text-[#dd3f3f]">
              Course Category is Required **
            </span>
          )}
        </div>

        {/* Create a custom component */}
        {/* TODO */}
        <ChipInput
          label="Tags"
          name="courseTags"
          placeholder="Enter Course tags"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        {/* create a component for uploading and showing for media  */}
        <Upload
          name="thumbnail"
          label="thumbnail"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        <div className="flex flex-col gap-2">
          <label
            htmlFor="courseBenefits"
            className="text-[14px] text-richblack-5 flex items-center"
          >
            Benefits of the course <sup className="text-[14px] text-[#EF476F] ">*</sup>
          </label>
          <textarea
            name="courseBenefits"
            id="courseBenefits"
            cols="30"
            rows="10"
            placeholder="Enter Benefits of the course"
            {...register("courseBenefits", { required: true })}
            className="w-full min-h-[130px]  bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]"
          ></textarea>
          {errors.courseBenefits && (
            <span className="text-[12px] text-[#dd3f3f]">
              Benefits of the course are required **
            </span>
          )}
        </div>

        <RequirementField
          name="courseRequirements"
          label="Requirments/Instructions"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        <div className={`w-full flex gap-x-2 ${editCourse ? "ml-[21vw]" : "ml-[90%]"} `}>
          {editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              className="flex items-center bg-richblack-300 rounded-md px-2 py-3 hover:bg-richblack-200 transition-all duration-200"
            >
              Continue without saving
            </button>
          )}

          <IconBtn text={!editCourse ? "Next" : "Save Changes"} />
        </div>
      </form>
    </div>
  );
};

export default CourseInformationForm;

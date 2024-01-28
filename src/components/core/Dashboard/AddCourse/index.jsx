import React from "react";
import RenderSteps from "./RenderSteps";

function AddCourse() {
  return (
    <>
      <div className="text-richblack-5 flex gap-3 w-full overflow-x-hidden">
        <div className="w-[105%]">
          <h1 className="text-[30px] leading-[38px] text-richblack-5">
            Add Course
          </h1>
          <div>
            <RenderSteps />
          </div>
        </div>
        <div className="bg-richblack-800  rounded-md border-[1px] border-richblack-700 p-4 h-fit">
          <p className="text-[18px] leading-[26px] font-inter ">
            ⚡Course Upload Tips
          </p>
          <ul className="flex flex-col gap-2 mt-4">
            <li className="text-[12px] leading-[20px] font-medium">
              ⭕ Set the Course Price option or make it free.
            </li>
            <li className="text-[12px] leading-[20px] font-medium">
              ⭕ Standard size for the course thumbnail is 1024x576.
            </li>
            <li className="text-[12px] leading-[20px] font-medium">
              ⭕ Video section controls the course overview video.
            </li>
            <li className="text-[12px] leading-[20px] font-medium">
              ⭕ Course Builder is where you create & organize a course.
            </li>
            <li className="text-[12px] leading-[20px] font-medium">
              ⭕ Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li className="text-[12px] leading-[20px] font-medium">
              ⭕ Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li className="text-[12px] leading-[20px] font-medium">
              ⭕ Make Announcements to notify any important
            </li>
            <li className="text-[12px] leading-[20px] font-medium">
              ⭕ Notes to all enrolled students at once.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default AddCourse;

import React from "react";
import { FaCheck } from "react-icons/fa6";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];
 
  console.log("STEP...", step);

  return (
    <div className="text-richblack-5">
      <div className="flex w-full items-center justify-between">
        {steps.map((item, index) => (
          <>
            <div
              className="flex items-center justify-center my-5 flex-col gap-2 mx-3"
              key={index}
            >
              <div
                className={`w-[2.3vw] h-[2.3vw] rounded-full text-[16px] flex items-center justify-center ${
                  step === item.id
                    ? "bg-[#ffd06a33] border-[#f2c564] border-[1px] text-[#f2c564] "
                    : "border-richblack-700 border-[1px] bg-richblack-800 text-richblack-300"
                }`}
              >
                {step > item.id ? <span className="w-full h-full bg-[#FFD06A] flex justify-center items-center overflow-hidden"><FaCheck className="text-richblack-700"/></span> : item.id}
              </div>

              <div>
                <p className="text-[14px] leading-[22px]">{item.title}</p>
              </div>
            </div>
          </>
        ))}
      </div>

      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {/* {step === 3 && <Publish />} */}
    </div>
  );
};

export default RenderSteps;

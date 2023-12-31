import React from "react";
import { FaCheck } from "react-icons/fa6";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";

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

  return (
    <div>
      <div>
        {steps.map((item, index) => (
          <>
            <div>
              <div
                className={`${
                  step === item.id
                 ? "bg-[#ffd06a50] border-[#FFD06A] text-[#FFD06A] " : "border-richblack-100 bg-richblack-800 text-richblack-300"}n`}
              >
                {step > item.id ? <FaCheck /> : item.id}
              </div>
            </div>
            {
                item.id !== steps.length ? (<div className="text-[#FFD06A]">........</div>) : (<div className="text-richblack-500">............</div>)
            }
          </>
        ))}
      </div>

       <div>
            {steps.map((item) => (
                <>
                    <div>
                        <p>{item.title}</p>
                    </div>
                </>
            ))}
       </div>

       {
        step === 1 && <CourseInformationForm />
       }
       {/* {step === 2 && <CourseBuilderForm />}
       {step === 3 && <Publish />} */}

    </div>
  );
};

export default RenderSteps;

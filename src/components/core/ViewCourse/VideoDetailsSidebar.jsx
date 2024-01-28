import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import IconBtn from "../../common/IconBtn";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";

function VideoDetailsSidebar({ setReviewModal }) {
  const [activerStatus, setActiveStatus] = useState("");
  const [videobarActive, setVideobarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    const call = () => {
      if (!courseSectionData.length) {
        return;
      }
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection?.findIndex((data) => data._id === subSectionId);

      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id;

      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      setVideobarActive(activeSubSectionId);
    }
    call();
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <>
      <div className="text-richblack-5 flex flex-col gap-2">
        {/* for buttons and headings */}
        <div className="flex flex-col items-center gap-3">
          {/* for buttons  */}
          <div className="flex items-center mt-3 gap-2">
            <div onClick={() => navigate("/dashboard/enrolled-courses")} className="bg-richblack-700 p-2 rounded-full flex items-center justify-center hover:bg-richblack-600 transition-all duration-200">
              <FaArrowLeftLong />
            </div>

            <div className="w-fit">
              <IconBtn
                text={"Add Review"}
                onClick={() => setReviewModal(true)}
              />
            </div>
          </div>
          {/* for heading or title  */}
          <div className="flex flex-col items-center">
            <p className="text-[16px] leading-[24px] w-fit font-semibold">{courseEntireData?.courseTitle}</p>
            <p className="bg-richblack-600 px-3 py-3 rounded-full flex items-center justify-center aspect-square text-richblack-25">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        {/* for Sections and Subsections  */}
        <div className="flex flex-col mx-1 gap-1">
          {courseSectionData?.map((course, index) => (
            <div onClick={() => setActiveStatus(course?._id)} key={index}>
              {/* section  */}
              <div className="bg-richblack-700 rounded px-2 py-1 text-richblack-25 flex items-center gap-2 cursor-pointer">
                <MdKeyboardArrowDown />
                <div>{course?.sectionName}</div>
                {/* TODO: add arrow icon  */}
              </div>

              {/* subSection  */}
              <div >
                {activerStatus === course?._id && (
                  <div className="flex cursor-pointer">
                    {course?.subSection?.map((topic, index) => (
                      <div 
                        className={`flex gap-2 text-[14px] leading-[24px] text-richblack-900 w-full mt-1 px-2 py-1 ${
                          videobarActive === topic._id
                            ? "bg-[#ffd60a] text-richblack-900"
                            : "bg-richblack-900 text-richblack-5"
                        }`}
                        key={index}
                        onClick={() => {
                          navigate(
                            `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                          );
                          setVideobarActive(topic?._id);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={completedLectures.includes(topic._id)}
                          onChange={() => {}}
                        />
                        <span>{topic.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default VideoDetailsSidebar;

import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { markLectureAsComplete } from "../../../services/operations/courseAPI";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import IconBtn from "../../common/IconBtn";

function VideoDetails() {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const token = JSON.parse(localStorage.getItem("token"));
  const {
    courseSectionData,
    completedLectures,
    updateCompletedLectures,
  } = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length) {
        return;
      }
      if (!courseId || !sectionId || !subSectionId) {
        // Use "||" instead of "&&" to check for any missing ID
        navigate("/dashboard/enrolled-courese");
      } else {
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        );
  
        if (filteredData.length > 0) {
          const filteredVideoData = filteredData[0].subSection?.filter(
            (data) => data._id === subSectionId
          );
  
          if (filteredVideoData && filteredVideoData.length > 0) {
            // Check if filteredVideoData is defined and not empty
            setVideoData(filteredVideoData[0]);
            setVideoEnded(false);
          } else {
            // Handle the case where subSectionId is not found
            console.error(`Subsection with ID ${subSectionId} not found.`);
          }
        } else {
          // Handle the case where sectionId is not found
          console.error(`Section with ID ${sectionId} not found.`);
        }
      }
    };
  
    setVideoSpecificDetails();
  }, [courseSectionData, courseId, sectionId, subSectionId, navigate]);
  

  const isFirstVideo = () => {
    // Check if courseSectionData is defined and not empty
    if (!courseSectionData || courseSectionData.length === 0) {
      return false;
    }
  
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
  
    // Check if currentSectionIndex is valid
    if (currentSectionIndex === -1) {
      return false;
    }
  
    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
      (data) => data._id === subSectionId
    );
  
    // Check if currentSubSectionIndex is valid
    if (currentSubSectionIndex === -1) {
      return false;
    }
  
    return currentSectionIndex === 0 && currentSubSectionIndex === 0;
  };
  
  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSection?.findIndex((data) => data._id === subSectionId);

    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSection?.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== noOfSubSections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSectionIndex + 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;

      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };
  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSection?.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSectionIndex - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          prevSubSectionLength - 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };
  const handleLectureCompletion = async () => {
    //dummy code, baad me replace krenge
    setLoading(true);

    const result = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token
    );

    // state update
    if (result) {
      dispatch(updateCompletedLectures(subSectionId));
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col mx-1 gap-1  relative">
      {!videoData ? (
        <div className="w-screen h-screen flex justify-center items-center text-[24px] leading-[32px] text-richblack-5">No Data Found</div>
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoUrl}
        >

          {videoEnded && (
            <div className="absolute top-1/2 left-1/2 translate-x-[50%] translate-y-[50%] flex flex-col gap-3 z-50">
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onClick={() => handleLectureCompletion()}
                  text={!loading ? "Mark as completed" : "Loading..."}
                />
              )}

              <IconBtn disabled={loading} onClick={() => {
                if(playerRef?.current) {
                  playerRef?.current?.seek(0);
                  setVideoEnded(false)
                }
              }} text="Rewatch" customClasses="text-xl"/>


              <div className="flex gap-x-3">
                {!isFirstVideo() && (
                  <button disabled={loading} onClick={() => goToPrevVideo()} className="bg-black">Prev</button>
                )
                }

                {
                  !isLastVideo() && (
                    <button disabled={loading} onClick={() => goToNextVideo()} className="bg-[#ffd60a]">Next</button>
                  )
                }
              </div>
            </div>
          )}
        </Player>
      )}
      <h1 className="text-[18px] leading-[24px] w-full text-richblack-5 font-semibold mt-2">Title: {
        videoData?.title}</h1>
        <h3 className="text-[16px] leading-[24px] w-full text-richblack-25 ">Description:  {videoData?.description}</h3>
    </div>
  );
}

export default VideoDetails;

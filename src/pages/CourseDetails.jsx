import React, { useEffect, useState } from "react";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourseDetails } from "../services/operations/courseAPI";
import GetAvgRating from "../utils/avgRating";
import { formatDate } from "../services/formatedDate";
import ConfirmationModal from "../components/common/ConfirmationModal";
import RatingStars from "../components/common/RatingStars";
import CourseDetailsCard from "../components/core/CourseDetails/CourseDetailsCard";
import { MdError } from "react-icons/md";
import { IoIosGlobe } from "react-icons/io";
import { MdPlayCircle } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import Footer from '../components/common/Footer';
import ReviewSlider from "../components/common/ReviewSlider";


function CourseDetails() {
  const token = JSON.parse(localStorage.getItem("token"));
  const { user } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);

  const [confirmationModal, setConfirmationModal] = useState(null);

  useEffect(() => {
    const getCourseFullDetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId);
        setCourseData(result);
        // console.log("PRINTING COURSEDATA....", result);
      } catch (error) {
        // console.log("Could not fetch course details");
      }
    };
    getCourseFullDetails();
  }, [courseId]);

  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    if (
      courseData &&
      courseData.ratingAndReview &&
      Array.isArray(courseData.ratingAndReview)
    ) {
      const count = GetAvgRating(courseData.ratingAndReview);
      setAvgReviewCount(count);
    } else {
      // Handle the case when ratingAndReview is not an array
      setAvgReviewCount(0);
    }
  }, [courseData]);

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  useEffect(() => {
    let lectures = 0;
    courseData?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });

    setTotalNoOfLectures(lectures);
  }, [courseData]);



  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    } else {
      setConfirmationModal({
        text1: "You are not logged in.",
        text2: "Please login to purchase the course",
        bnt1Text: "Log in",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
    }
  };

  if (loading || !courseData) {
    return <div>Loading...</div>;
  }

  const {
    courseTitle,
    courseDescription,
    whatYouWillLearn,
    courseContent,
    ratingAndReview,
    instructor,
    studentEnrolled,
    createdAt,
  } = courseData;

  return (
    <div className="flex flex-col w-full  text-richblack-5  bg-richblack-900">
      <div className="bg-richblack-800 w-full pt-[5%]">
        <div className="relative flex flex-col justify-start pb-5 gap-2 bg-richblack-800 w-11/12 mx-auto ">
          <div className="w-[65%] border-r-[1px] border-richblack-700">
            <p className="text-[30px] leading-[38px] font-medium text-richblack-5">
              {courseTitle}
            </p>
            <p className="text-[14px] leading-[22px] text-[#999DAA]">
              {courseDescription}
            </p>
            <div className="flex gap-x-3 items-center">
              <span className="text-[#E7C009] text-[18px] font-semibold">
                {avgReviewCount}
              </span>
              <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
              <span className="text-[16px] leading-[24px] text-richblack-25">{`(${ratingAndReview.length} reviews)`}</span>
              <span className="text-[16px] leading-[24px] text-richblack-25">{`(${studentEnrolled.length} student enrolled)`}</span>
            </div>

            <div>
              <p className="text-[16px] leading-[24px] text-richblack-25">
                Created By {`${instructor.firstName}`}{" "}
                {`${instructor.lastName}`}{" "}
              </p>
            </div>

            <div className="flex gap-x-3 items-center">
              <p className="text-[16px] flex gap-x-1 items-center leading-[24px] text-richblack-25">
                <MdError /> Created At {formatDate(createdAt)}
              </p>
              <p className="text-[16px] flex gap-x-1 items-center leading-[24px] text-richblack-25">
                <IoIosGlobe /> English
              </p>
            </div>

            <div className="absolute right-[0%] top-[0%]">
              <CourseDetailsCard
                course={courseData}
                setConfirmationModal={setConfirmationModal}
                handleBuyCourse={handleBuyCourse}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-11/12 mx-auto my-5 mb-7">
        <div className="p-4 w-[65%] border-[1px] border-[#2C333F]">
          <h1 className="text-[30px] leading-[38px] font-semibold text-richblack-5">
            {" "}
            What you will learn
          </h1>
          <p className="text-[14px] leading-[22px] font-medium text-richblack-50">
            {whatYouWillLearn}
          </p>
        </div>
      </div>

      <div className="w-11/12 mx-auto">
        <div>
          <p className="text-[24px] leading-[32px] font-semibold text-richblack-5">
            Course Content
          </p>
        </div>
        <div className="w-[65%] flex text-[14px] leading-[22px] text-richblack-50 gap-x-3 justify-between">
          <div className="flex gap-x-2">
            <span>{courseContent.length} sections</span>
            <span>{totalNoOfLectures} lectures</span>
            <span>12 min</span>
          </div>
        </div>

        <div className="w-[65%]  bg-richblack-700 rounded-lg">
          {courseContent.map((section) => (
            <details
              key={section._id}
              className="bg-richblack-700 px-2 py-2 mt-1 rounded-md"
            >
              <summary className="text-[14px] leading-[22px] font-medium flex justify-between mx-1 cursor-pointer">
               <p className="flex items-center gap-x-2">
                <FaAngleDown />
               {section.sectionName}
               </p>

                <p className="text-[14px] leading-[22px] text-[#FFD60A] ">{section?.subSection?.length} lectures</p>
              </summary>

              <div className="bg-richblack-900 w-full px-2 py-3 rounded">
                {section.subSection.map((subsection) => (
                  <div
                    key={subsection._id}
                    className="border-b-[1px] pb-2 border-richblack-200 flex justify-between"
                  >
                   <div className="flex flex-col">
                    <p className="flex text-[14px] leading-[22px] font-medium text-richblack-5 gap-x-2 items-center ">
                        <MdPlayCircle className="text-[#FFD60A]" />{" "}
                        {subsection.title}
                      </p>
                      <span className="text-[14px] leading-[22px] text-richblack-50 ml-8">
                        {subsection.description}
                      </span>
                   </div>

                   <p className="text-[14px] leading-[22px] text-[#ffd60a]">{subsection.timeDuration} minute</p>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>

      <div className="w-11/12 mx-auto my-5">
        <p className="text-[24px] leading-[32px] font-semibold">Author</p>
        <div className="flex items-center gap-x-5">
          <img src={instructor.image} alt="instructor-logo" className="w-[5vw] h-[10vh] object-cover rounded-full" />
          <p className="text-[16px] flex flex-col  leading-[24px] font-medium text-richblack-5">{instructor.firstName} {" "} {instructor.lastName}
          <span className="text-[14px] leading-[22px] text-richblack-50">{instructor?.email}</span></p>
        </div>
          
      </div>

      <div className="mt-[3%] flex flex-col items-center gap-3">
          <h1 className="text-[36px] text-richblack-5 font-bold leading-[44px] text-center">
            Reviews from other learners
          </h1>
          {/* <ReviewSlider />  */}
          <ReviewSlider />
        </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      <Footer />
    </div>
  );
}

export default CourseDetails;

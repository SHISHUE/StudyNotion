import React, { useEffect } from 'react'
import { useState } from 'react'
import {Outlet, useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { getFullDetailsOfCourse } from '../services/operations/courseAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';

function ViewCourse() {

    const [reviewModal, setReviewModal] = useState(false);
    const token = JSON.parse(localStorage.getItem("token"));
    const {courseId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const setCourseSpecificDetails = async() => {
            const courseData = await getFullDetailsOfCourse(courseId, token);
            dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent))
            dispatch(setEntireCourseData(courseData?.courseDetails));
            dispatch(setCompletedLectures(courseData?.completedVideos));
            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseSpecificDetails();
    },[])



  return (
    <>
        <div  className='relative flex min-h-[calc(100vh-3.5rem)]'>
            <VideoDetailsSidebar setReviewModal={setReviewModal}/>

            <div className='h-[calc(100vh-3.5rem)] w-11/12 overflow-auto'>
                <Outlet />
            </div>
        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
        </div>
    </>
  )
}

export default ViewCourse
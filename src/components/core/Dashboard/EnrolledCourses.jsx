import React, { useEffect, useState } from 'react'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from "@ramonak/react-progress-bar";
import {useNavigate} from 'react-router-dom'

function EnrolledCourses() {

    const token = JSON.parse(localStorage.getItem("token"));

    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const navigate = useNavigate()


    const getEnrolledCourses = async() => {
        try {
            const response = await getUserEnrolledCourses(token);
                setEnrolledCourses(response);
        } catch (error) {
            // console.log("Unavle to fetch enrolled courses", error);
        }
    }

    useEffect(() => {
       getEnrolledCourses();
    })



  return (
    <div className='text-richblack-5'>
        <div className='text-[30px] leading-[38px] font-medium'>Enrolled Courses</div>
        {
            !enrolledCourses ? (<div>Loading...</div>) : !enrolledCourses.length ? (<div>You have not enrolled in any course yet</div>) : (
                <div className='flex flex-col border-[1px] border-[#2C333F]'>
                    <div className='flex bg-[#2C333F] items-center px-5 gap-x-20 py-2'>
                        <p className='grow text-[14px] leading-[22px] font-medium text-richblack-50'>Course Name</p>
                        <p className='text-[14px] leading-[22px] font-medium text-richblack-50'>Durations</p>
                        <p className='text-[14px] leading-[22px] font-medium text-richblack-50'>Progress</p>
                    </div>

                    {/* Cards Shuru hote h ab  */}
                    {
                        enrolledCourses.map((course, index) => (
                            <div onClick={() => navigate(`/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.subSection?.[0]?._id}`)} className='flex  items-center border-b-[1px] border-[#2C333F] px-5 gap-x-12' key={index}>
                                <div className='flex items-center gap-x-3 grow p-2'>
                                    <img src={course.thumbnail} alt="course-img" width={50} className='object-cover aspect-square rounded-full'/>
                                    <div className='flex flex-col cursor-pointer'>
                                        <p className='text-[16px] leading-[24px] font-medium text-richblack-5'>{course.courseName}</p>
                                        <p className='text-[16px] leading-[24px] text-[#838894]'>{course.courseDescription}</p>
                                    </div>
                                </div>

                                <div className='text-[16px] leading-[24px] font-medium text-richblack-50 cursor-pointer'>
                                    3hr 20min
                                </div>

                                <div className='flex flex-col'>
                                    <p className='text-[12px] leading-[20px] font-semibold'>Progress: {course.progressPercentage || 0}% </p>
                                    <ProgressBar completed={course.progressPercentage || 0} height='8px' isLabelVisible={false} bgColor='#47A5C5'/>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )
        }
    </div>
  )
}

export default EnrolledCourses
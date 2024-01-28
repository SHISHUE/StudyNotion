import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import RenderSteps from '../AddCourse/RenderSteps';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
import { fetchCourseDetails} from '../../../../services/operations/courseAPI';

function EditCourse() {

    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {course} = useSelector((state) => state.course)

    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const populateCourseDetails = async() => {
            setLoading(true);
            try {
                const result = await fetchCourseDetails(courseId);
                if(result) {
                    dispatch(setEditCourse(true));
                    dispatch(setCourse(result))
                    console.log("courseId", result)
                }
                setLoading(false)
            } catch (error) {
                console.log("Error", error)
            }
        }
        populateCourseDetails();
    },[])

    if(loading) {
        return <div>Loading...</div>
    }

  return (
    <div className='text-white overflow-x-hidden'>
        <h1 className='text-[28px] leading-[32px] font-semibold text-richblack-5'>Edit Course</h1>
        <div className='flex justify-center items-center w-[80%] relative'>
            {
                course ? (<RenderSteps />) : (<p>Course not found</p>)
            }
        </div>
    </div>
  )
}

export default EditCourse
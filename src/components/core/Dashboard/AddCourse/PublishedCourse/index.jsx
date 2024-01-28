import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import IconBtn from '../../../../common/IconBtn';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { editCourseDetails } from '../../../../../services/operations/courseAPI';
import {toast} from 'react-hot-toast';

function Publish() {

    const {register,handleSubmit, setValue, getValues} = useForm();
    const { course } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem("token"));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(course?.status === published) {
            setValue("public", true)
        }
    },);

    const published = "published"
    const draft = "draft"

    const goToCourses = () => {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses")
    }

    const handleCoursePublish = async() => {
        if((course?.status === published && getValues("public") === true) || (course?.status === draft && getValues("public") === false)) {
            goToCourses();
            return;
        }

        const formData = new FormData();
        formData.append("courseId", course._id);
        const courseStatus = getValues("public") ? "published" : "draft" 
        formData.append("status", courseStatus);

        setLoading(true);
        const result = await editCourseDetails(formData, token);

        if(result) {
            goToCourses();
        }

        setLoading(false);
        toast.success("Course Published")
        goToCourses();
    }

    const onSubmit = () => {

        handleCoursePublish();
    }
    const goBack = () => {
        dispatch(setStep(2))
    }

  return (
    <div className='rounded-md border-[1px] bg-richblack-900 p-6 border-richblack-700'>
        <h1 className='text-[24px] leading-[32px] font-semibold my-3'>Publish Course</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
           <div className='flex items-center gap-x-3'>
           <input type="checkbox" id='public' {...register("public")} className='rounded-md h-4 w-4' />
            <label htmlFor="public" className='text-[16px] leading-[24px] text-richblack-200'>Make this course as Public</label>
           </div>

           <div className='flex justify-end gap-x-3 items-center'>
            <button disabled={loading} type='button' onClick={() => goBack()} className='flex items-center rounded-md bg-richblack-700 px-4 py-2'>
                Back
            </button>

            <IconBtn disabled={loading} text="Save Changes" />
           </div>
        </form>
        
    </div>
  )
}

export default Publish
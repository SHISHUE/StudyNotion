import React from 'react'
import MyCourseCard from './MyCourseCard'
import IconBtn from '../../common/IconBtn'
import {useNavigate} from 'react-router-dom'
import { FaCirclePlus } from "react-icons/fa6";

function MyCourses() {
    const navigate = useNavigate();
  return (
    <div className='p-5 text-richblack-5 '>
        <div className='flex w-full justify-between px-3 items-center  mb-[5%]'>
            <h1 className='text-[30px]  leading-[38px] font-medium '>My Courses</h1>
            <IconBtn text="Add Course" onClick={() => navigate("/dashboard/add-course")} ><FaCirclePlus className='text-richblack-900'/></IconBtn>
        </div>

       

            <MyCourseCard />
        </div>
  )
}

export default MyCourses
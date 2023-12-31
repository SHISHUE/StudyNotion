import React from 'react'
import MyCourseCard from './MyCourseCard'

function MyCourses() {
  return (
    <div className='p-5 text-richblack-5'>
        <h1 className='text-[30px] leading-[38px] font-medium mb-[5%]'>My Courses</h1>

        <div className='border-[1px] border-richblack-500'>
            <div className='border-b-[1px] border-richblack-500 flex justify-between p-3 px-4'>
                <div className='text-[14px] leading-[22px] font-medium text-[#AFB2BF]'>
                    COURSES
                </div>

                <div className='flex gap-16'>
                    <p className='text-[14px] leading-[22px] font-medium text-[#AFB2BF]'>DURATION</p>
                    <p className='text-[14px] leading-[22px] font-medium text-[#AFB2BF]'>PRICE</p>
                    <p className='text-[14px] leading-[22px] font-medium text-[#AFB2BF]'>ACTIONS</p>
                </div>
            </div>

            <MyCourseCard />
        </div>
    </div>
  )
}

export default MyCourses
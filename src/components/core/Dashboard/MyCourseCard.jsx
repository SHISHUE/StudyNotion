import React from 'react'
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

function MyCourseCard() {

  const {user} = useSelector((state) => state.profile);
  console.log("INSTRUCTOR KA DATA....", user);

  const navigate = useNavigate()
  return (
    <div>
      <div className='p-4 flex mb-[3%] items-center'>
        <div className='mr-5'>
          <img src="https://gradepowerlearning.com/wp-content/uploads/2018/09/how-to-use-self-study.jpeg" className='w-[15vw] rounded-md' alt="" />
        </div>
        <div className='flex flex-col gap-3 w-[43%]'>
          <h3 className='text-[20px] leading-[28px] font-semibold'>Introduction to Design: </h3>
          <p className='text-[14px] leading-[22px] text-[#AFB2BF] w-[95%] overflow-hidden'>This course provides an overview of the design process, design thinking, and basic design principles.</p>
          <p className='text-[12px] leading-[20px] font-medium text-[#DBDDEA]'>Created: April 27, 2023 | 05:15 PM</p>
        </div>
        <div className='flex flex-start justify-between w-[35%] items-center px-2'>
          <p className='text-[14px] leading-[22px] font-medium text-[#AFB2BF]'>20h 10m</p>
          <p className='text-[14px] leading-[22px] font-medium text-[#AFB2BF]'>₹520</p>
          <p className='flex gap-3'>
            <MdModeEdit className='text-[22px] cursor-pointer text-[#AFB2BF]' onClick={() => {navigate('/edit-course')}}/>
            <RiDeleteBin5Line className='text-[22px] cursor-pointer text-[#AFB2BF]'  onClick={() => {navigate('/delete-course')}}/>
          </p>
        </div>
      </div>
    </div>
  )
}

export default MyCourseCard
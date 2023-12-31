import React from 'react'
import instructor from '../../../assest/images/instructor.svg'
import HighlightText from './HighlightText'
import CTAButton from "../../../components/core/HomePage/Button";
import { FaArrowRightLong } from "react-icons/fa6";

function InstructorSection() {
  return (
    <div className='flex flex-row gap-20 items-center justify-center mx-auto mt-16'>
        <div className='w-[50%]'>
            <img src={instructor} alt="InstructorImage" className='shadow-white'/>
        </div>
        <div className='flex flex-col gap-10 w-[50%]'>
            <div className='text-4xl font-semibold '>
                Become an <br />
                <HighlightText text={"instructor"}/>

                <p className='text-richblack-300 text-[16px] leading-5 mt-5 font-medium w-[80%]'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
            </div>
            

           <div className='w-fit'>
           <CTAButton active={true} linkto={"/signup"}>
                <div className='flex flex-row gap-2 items-center'>
                    Start Teaching Today
                    <FaArrowRightLong />
                </div>
            </CTAButton>
           </div>
        </div>
    </div>
  )
}

export default InstructorSection
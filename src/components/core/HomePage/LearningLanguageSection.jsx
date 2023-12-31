import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from '../../../assest/images/1st.svg'
import campare_with_others from '../../../assest/images/Frame 74.svg'
import plan_your_lesson from '../../../assest/images/Frame 57.svg'
import CTAButton from '../../../components/core/HomePage/Button'

function LearningLanguageSection() {
  return (
    <div className='w-11/12 flex flex-col gap-5 mt-[130px] items-center justify-center mb-32'>
        <div className='text-4xl font-semibold text-center'>
            Your swiss knife for
            <HighlightText  text={"learning any language"}/>
        </div>

        <div className='text-center text-richblack-600 mx-auto text-base mt-3 font-medium w-[70%]'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='flex flex-row items-center justify-center mt-5 '>
            <img src={know_your_progress} className='object-contain -mr-32'/>
            <img src={campare_with_others} />
            <img src={plan_your_lesson} className='object-contain -ml-36'/>
        </div>

        <div className='w-fit'>
            <CTAButton active={true} linkto={"/signup"}>
                <div>Learn more</div>
            </CTAButton>
        </div>
    </div>
  )
}

export default LearningLanguageSection
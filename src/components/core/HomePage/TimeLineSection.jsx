import React from 'react'
import Logo1 from '../../../assest/logo/Logo1.svg'
import Logo2 from '../../../assest/logo/Logo2.svg'
import Logo3 from '../../../assest/logo/Logo3.svg'
import Logo4 from '../../../assest/logo/Logo4.svg'
import timelineImage from '../../../assest/images/Frame 51.svg'

function TimeLineSection() {
    const timeLine = [
        {
            Logo: Logo1,
            Heading: "Leadership",
            Description: "Fully committed to the success company",
        },
        {
            Logo: Logo2,
            Heading: "Responsibility",
            Description: "Students will always be our top priority",
        },
        {
            Logo: Logo3,
            Heading: "Flexibility",
            Description: "The ability to switch is an important skills",
        },
        {
            Logo: Logo4,
            Heading: "Solve the problem",
            Description: "Code your way to a solution",
        }
]
  return (
    <div className='flex w-11/12 gap-15  mx-auto items-center z-10 relative'>
        <div className='w-[45%] flex flex-col gap-5'>
            {
               timeLine.map((element, index) => {
                return (
                <div className='flex flex-row gap-6' key={index}>
                    <div className='w-[50px] h-[50px] bg-white flex items-center rounded-full justify-center'>
                        <img src={element.Logo}/>
                    </div> 
                        {/* <div className='bg-black outline-dotted rounded-full'></div> */}
                    <div>
                        <h2 className='text-[18px] font-semibold'>{element.Heading}</h2>
                        <p className='text-base'>{element.Description}</p>
                    </div>
                </div>
                )
               })
            }

            <div className='h-[190px] top-[115px] left-[23px]  border-opacity-70 -z-10 border-2 absolute border-[#AFB2BF] border-dashed rounded-full'></div>
            
        </div>


        <div className='w-[55%] relative shadow-blue-200'>
            <img src={timelineImage} className='rounded-sm object-cover h-fit shadow-[#65C7F7] shadow-xl' />

            <div className='absolute bg-[#014a32] flex flex-row text-white uppercase py-7 left-[10%] bottom-[-6%] w-[80%]'>
                <div className='flex flex-row gap-5 items-center border-r border-[#038561] px-7'>
                    <h1 className='text-3xl font-bold'>10</h1>
                    <p className='text-[#038561] text-sm'>Years of Experience</p>
                </div>
                <div className='flex gap-5 items-center px-7'>
                <h1 className='text-3xl font-bold'>250</h1>
                    <p className='text-[#038561] text-sm'>types of courses</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TimeLineSection
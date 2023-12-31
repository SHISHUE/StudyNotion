import React from 'react'
import IconBtn from './IconBtn'

function ConfirmationModal({modalData}) {
  return (
    <div className='absolute border-[1px] border-[#ffffff73] top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] bg-[#2c333f27] rounded-md backdrop-blur-[5px] '>
        <div className='text-richblack-5 flex flex-col gap-3 border-[1px] border-[#fffafa5a] rounded-md p-6'>
            <p className='text-3xl font-semibold leading-[48px]'>{modalData.text1}</p>
            <p className='text-md text-richblack-300 '>
                {modalData.text2}
            </p>

            <div className='flex items-center justify-between'>
                <IconBtn onClick={modalData?.btn1Handler}
                text={modalData?.btn1Text}/>

                <button onClick={modalData?.btn2Handler} className='bg-[#ffffff6b] backdrop-blur-sm text-richblack-900 py-2 px-3 rounded-xl transition-all duration-200 hover:scale-[0.9] hover:bg-[#72e75b9c]'>
                    {
                        modalData?.btn2Text
                    }

                </button>
            </div>
        </div>

    </div>
  )
}

export default ConfirmationModal
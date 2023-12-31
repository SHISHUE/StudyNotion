import React from 'react'
import { TbError404 } from "react-icons/tb";

function Error() {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      
        <TbError404 className='text-[12vw] text-center text-[#e04141]'/>
        <h1 className='text-3xl text-center text-[#e04141]'>
          Error - 404 Page Not found
        </h1>
      
    </div>
  )
}

export default Error
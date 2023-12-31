import React from 'react'
import { Link } from 'react-router-dom'

function Ancore({text , path}) {
  return (
        <Link to={path} className='text-[14px] text-richblack-400 hover:text-richblack-100 transition-all duration-200'>{text}</Link>
  )
}

export default Ancore
import React from 'react'

function IconBtn({
    text,
    onClick,
    children,
    disabled,
    outline=false,
    customClasses,
    type,
}) {
  return (
    <button
    className='bg-[#FFD60A] flex gap-2 items-center py-2 px-3 rounded-xl text-richblack-900 font-medium leading-[24px] hover:scale-[0.95] transition-all duration-200 hover:bg-[#d6ff0a]'
    disabled={disabled}
    onClick={onClick}
    type={type}>
        {
            children ? (
            <>
                <span className='text-richblack-900 font-semibold'>
                {text}
                </span>
                {children}
            </>) : (text)
        }
      
    </button>
  )
}

export default IconBtn
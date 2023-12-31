import React, { useState } from 'react';
import { IoMdContacts } from "react-icons/io";
import { FiBarChart } from "react-icons/fi";

function CourseCard({ cardData, activeCard, setActiveCard }) {


  const isActive = activeCard === cardData.heading;

  const clickHandler = () => {
    setActiveCard(cardData.heading);
  };

  return (
    <div
      className={`bg-richblack-800 ${isActive ? `shadow-[10px_10px_0px_0px_rgba(255,214,10,0.97)] bg-white` : ''} px-5 w-full rounded-md py-5 justify-between h-[300px] flex flex-col transition-all duration-200`}
      onClick={clickHandler}
    >
      <div className={`flex flex-col gap-5 `}>
        <h1 className={`text-xl font-semibold ${isActive? 'text-black': ''}`}>{cardData.heading}</h1>
        <p className='text-sm text-richblack-300 w-[80%]'>{cardData.description}</p>
      </div>

      <div className='flex items-center justify-between border-t-2 border-dashed border-richblack-300 pt-5'>
        <div className='flex items-center gap-3 text-richblack-300'>
          <IoMdContacts />
          {cardData.level}
        </div>
        <div className='flex items-center gap-3 text-richblack-300'>
          <FiBarChart />
          {cardData.lessionNumber}
          {" "}
          Lesson
        </div>
      </div>
    </div>
  );
}

export default CourseCard;

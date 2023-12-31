import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

function ExploreMore() {
  const tabNames = [
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths",
  ];

  const [currentTab, setCurrentTab] = useState(tabNames[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    let result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div>
      <div className="text-4xl font-semibold text-center ">
        Unlock the
        <HighlightText text={"Power of code"} />
      </div>

      <p className="text-center text-richblack-300 text-sm mt-3">
        Learn To Build Anything You Can Imagine
      </p>

      <div className="flex flex-row bg-richblack-800 gap-2 rounded-full mb-3 border-richblack-100 mt-3 px-1 py-1">
        {tabNames.map((element, index) => {
          return (
            <div
              className={`text-[16px] flex flex-row items-center gap-2
                        ${
                          currentTab === element
                            ? "bg-richblack-900 text-richblack-5 font-medium"
                            : "bg-richblack-800 text-richblack-200"
                        } rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
           key={index} onClick={() => setMyCards(element)} >
              {element}
            </div>
          );
        })}
      </div>

      <div className="lg:h-[150px]"></div>

      {/* course card ka group */}
      <div className="absolute right-[100px] bottom-[-180px] flex gap-8 mx-auto w-[85%]">
        {
            courses.map((element, index) => {
                return (<CourseCard 
                key={index}
                cardData= {element}
                activeCard={currentCard}
                setActiveCard={setCurrentCard}
                />);
               
            })
        }
      </div>
    </div>
  );
}

export default ExploreMore;

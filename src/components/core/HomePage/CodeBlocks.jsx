import React from "react";
import CTAButton from "../HomePage/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";

function CodeBlocks({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10 `}>
      {/* Section 1 */}
      <div className="w-[50%] flex flex-col gap-8 ">
        {heading}
        <div className="text-richblack-300 font-bold ">{subheading}</div>

        <div className="flex gap-7 mt7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRightLong />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            <div className="flex gap-2 items-center">{ctabtn2.btnText}</div>
          </CTAButton>
        </div>
      </div>

      {/* Section 2 */}
      <div className="h-fit flex flex-row text-[16px] w-[100%] py-4 lg:w-[500px] z-10 bg-opacity-75 glassy">
        {/* backgroundGradient create krna hai  */}
        <div className={`w-[200px] h-[200px] absolute -z-10 ${backgroundGradient} blur-[55px] right-[225px] opacity-80 transition-all duration-1000 animate-pulse`}></div>
        <div className="text-center flex flex-col w-[10%] text-[#838894] font-inter ">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>
        <div
          className={`w-[90%] flex flex-col gap-2 opacity-90 font-mono ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codeblock, 5000, ""]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CodeBlocks;

import React from "react";
import HighlightText from "../HomePage/HighlightText";

function Quote() {
  return (
    <div className="text-[36px] text-center leading-[52px] text-[#AFB2BF] tracking-[.015em]">
      We are passionate about revolutionizing the way we learn. Our innovative
      platform
      <HighlightText text={"combines technology"} />,
      <span className="text-color1 "> expertise</span>, and community to
      create an{" "}
      <span className="text-color2">
        unparalleled educational experience.
      </span>
    </div>
  );
}

export default Quote;

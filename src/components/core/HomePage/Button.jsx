import React from "react";
import { Link } from "react-router-dom";

function Button({ children, active, linkto }) {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-[13px] px-6 py-3 rounded-md font-bold
            ${active ? "bg-[#ffd60a] text-black" : "bg-richblack-800 boxs"}
            hover:scale-95 transition-all duration-200 hover:drop-shadow-xl
        `}
      >
        {children}
      </div>
    </Link>
  );
}

export default Button;

import React from "react";

function HighlightText({ text }) {
  return (
    <span className="font-bold text-color text-transparent bg-clip-text">
      {" "}
      {text}
    </span>
  );
}

export default HighlightText;

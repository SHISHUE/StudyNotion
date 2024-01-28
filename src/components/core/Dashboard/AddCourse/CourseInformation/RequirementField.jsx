import React, { useEffect, useState } from "react";

function RequirementField({
  name,
  label,
  register,
  errors,
  setValue,
  getValues,
}) {
  const [requirment, setRequirment] = useState("");
  const [requirmentList, setRequirmentList] = useState([]);

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, []);

  useEffect(() => {
    setValue(name, requirmentList);
  }, [requirmentList]);

  const handleAddRequirment = () => {
    if (requirment) {
      setRequirmentList([...requirmentList, requirment]);
      setRequirment("");
    }
  };

  const handleRemoveRequirment = (index) => {
    const updatedRequirmentList = [...requirmentList];
    updatedRequirmentList.splice(index, 1);
    setRequirmentList(updatedRequirmentList);
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-[14px] text-richblack-5 flex items-center"
      >
        {label}
        <sup className="text-[14px] text-[#EF476F] ">*</sup>
      </label>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          id={name}
          value={requirment}
          onChange={(e) => setRequirment(e.target.value)}
          className="w-full bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]"
        />
        <button
          type="button"
          onClick={handleAddRequirment}
          className="font-semibold text-[#FFDA06]"
        >
          Add
        </button>
      </div>

      {requirmentList.length > 0 && (
        <ul>
          {requirmentList.map((requirment, index) => (
            <li
              key={index}
              className="flex gap-1 items-center text-richblack-5"
            >
              <span>{requirment}</span>
              <button
                type="button"
                onClick={() => handleRemoveRequirment(index)}
                className="text-xs text-richblack-200"
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
        <span className="text-[12px] text-[#dd3f3f]">{label} is required **</span>
      )}
    </div>
  );
}

export default RequirementField;

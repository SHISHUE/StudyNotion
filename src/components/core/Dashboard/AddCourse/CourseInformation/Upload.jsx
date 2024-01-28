import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import icon from "../../../../../assest/logo/Frame 3310.svg";

const Upload = ({ name, label, register, errors, setValue, video, viewData, editData }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    register(name, {
      required: true,
    });
  }, []);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setValue(name, null);
  };

  return (
    <div className=" flex flex-col gap-3 ">
      <h1 className="text-richblack-5">{label} <sup className="text-[14px] text-[#EF476F] ">*</sup></h1>
      <div className="w-full h-[80vh] bg-richblack-900  flex justify-center rounded-xl items-center">
        <div className="flex flex-col gap-5 justify-center relative mx-auto">
          <img src={icon} alt="icon" className="w-[3vw] mx-auto" />
          <p className="text-[12px] leading-[20px] font-semibold text-center text-richblack-200">
            {video ? "Drag and drop a video, or Max 12MB" : "Drag and drop an image, or Max 6MB each"}
          </p>
          <label htmlFor={name} className="text-[#FFD06A] text-center">
            Browse
            <input
              type="file"
              id={name}
              name={name}
              onChange={handleFileChange}
              className="mt-2 mx-auto hidden"
            />
          </label>

          <div className="flex justify-between mt-8">
            {video && <p className="text-[12px] leading-[20px] font-semibold text-richblack-400">Max size: 12MB</p>}
            <p className="text-[12px] leading-[20px] font-semibold text-richblack-400">{video ? "Aspect ratio 16:9" : "Aspect ratio 1:1"}</p>
            {video && <p className="text-[12px] leading-[20px] font-semibold text-richblack-400">Recommended size 1024x576</p>}
          </div>

          {errors[name] && (
            <span className='text-[12px] text-[#dd3f3f] absolute -bottom-[180px] -left-[110px]'>
              {label} is required **
            </span>
          )}

          {selectedFile && (
            <div className="absolute w-full object-contain z-20">
              <p className="flex mr-2">Selected File: {selectedFile.name}</p>
              {video ? (
                <video width="75%" height="75%" controls>
                  <source src={URL.createObjectURL(selectedFile)} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={selectedFile && URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="w-full object-contain aspect-square"
                />
              )}
              <button onClick={removeSelectedFile} className="remove-icon mb-2">
                <IoClose />
              </button>
            </div>
          )}

          {viewData && (
            <div className="absolute w-full object-contain z-20">
              {video ? (
                <video width="85%" height="85%" controls>
                  <source src={viewData} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={viewData}
                  alt="Preview"
                  className="w-full object-contain aspect-square"
                />
              )}
            </div>
          )}

          {editData && (
            <div className="absolute w-full object-contain z-20">
              {video ? (
                <video width="85%" height="85%" controls>
                  <source src={editData} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={editData}
                  alt="Preview"
                  className="w-full object-contain aspect-square"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;

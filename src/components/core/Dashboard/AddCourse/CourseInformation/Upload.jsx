import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import icon from "../../../../../assest/logo/Frame 3310.svg";

const Upload = ({ name, label, register, errors, setValue }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    register(name, {
      required: true,
    });
  },[]);

  useEffect(() => {
    setValue(name, selectedFile);
    // console.log("UPLOAD KE AANDER....", selectedFile);
  }, [selectedFile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setValue(name, null); // Clear the value using setValue
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-richblack-5">Thumbnail</h1>
      <div className="w-full h-[80vh] bg-richblack-900 relative flex justify-center rounded-xl items-center">
        <div className="flex flex-col gap-5 justify-center relative mx-auto">
          <img src={icon} alt="icon" className="w-[3vw] mx-auto" />
          <p className="text-[12px] leading-[20px] font-semibold text-center text-richblack-200">
            Drag and drop an image, or Max 6MB each (12MB for videos)
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
            <p className="text-[12px] leading-[20px] font-semibold text-richblack-400">Aspect ratio 16:9</p>
            <p className="text-[12px] leading-[20px] font-semibold text-richblack-400">Recommended size 1024x576</p>
          </div>

          {errors[name] && <span className='text-[12px] text-[#dd3f3f] absolute -bottom-[180px] -left-[110px]'>{label} is required **</span>}

          {selectedFile && (
            <div className="absolute w-full object-contain z-20">
              <p className="flex mr-2">Selected File: {selectedFile.name}</p>
              <img
                src={selectedFile && URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="w-full object-contain aspect-square"
              />
              <button onClick={removeSelectedFile} className="remove-icon mb-2">
                <IoClose />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;

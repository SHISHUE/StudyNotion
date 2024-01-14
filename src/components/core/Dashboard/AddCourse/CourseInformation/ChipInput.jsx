import React, { useEffect, useState } from 'react';

function ChipInput({ label, name, placeholder, register, errors, setValue, getValues }) {
  const [chipInput, setChipInput] = useState('');
  const [chipList, setChipList] = useState([]);

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, [register, name]);

  useEffect(() => {
    setValue(name, chipList);
  }, [chipList, setValue, name]);

  const handleKeyDown = (e) => {
    if (e.key === ' ' && chipInput.trim() !== '') {
      setChipList([...chipList, chipInput.trim()]);
      setChipInput('');
    }
  };

  const handleRemoveChip = (index) => {
    const updatedChipList = [...chipList];
    updatedChipList.splice(index, 1);
    setChipList(updatedChipList);
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div className="flex flex-wrap gap-2 bg-richblack-900 text-richblack-5 w-fit rounded-full">
        {chipList.map((chip, index) => (
          <div key={index} className="bg-gray-300 px-2 py-1 rounded-full flex items-center">
            <span>{chip}</span>
            <button type="button" onClick={() => handleRemoveChip(index)} className="ml-2 text-red-500">
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          id={name}
          value={chipInput}
          onChange={(e) => setChipInput(e.target.value)}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          
          className="w-full bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]"
        />
      </div>

      {errors[name] && <span className='text-[12px] text-[#dd3f3f]'>{label} is required **</span>}
    </div>
  );
}

export default ChipInput;

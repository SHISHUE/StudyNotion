import React, { useState } from "react";
import { LiaLessThanSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  updateprofile,
  updateprofileInfo,
  changePassword,
  deleteAccount
} from "../../../services/operations/updateAPI";
import { countryCode } from "../../../data/countryCode";
import ConfirmationModal from "../../common/ConfirmationModal";


function Setting() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const { user } = useSelector((state) => state.profile);

  // console.log("SETTINGS KE ANDER TOKEN", token);
  // State to hold the selected file
  const [displayPicture, setDisplayPicture] = useState(null);
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState(null);
  const [about, setAbout] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showText, setShowText] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showText1, setShowText1] = useState(false);

  const [confirmationModal, setConfirmationModal] = useState(null);

  const clickHandler = () => {
    setShowText(!showText);
    setShowPassword(!showText);
  };

  const clickHandler1 = () => {
    setShowText1(!showText1);
    setShowConfirmPassword(!showText1);
  };

  // Event handler for file input change
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    // Update the state with the selected file
    setDisplayPicture(file);
  };

  // Event handler for form submission (you can implement your logic here)
  const handleSubmit = (event) => {
    event.preventDefault();

    // Use the displayPicture state as needed (e.g., upload to server)
    if (displayPicture) {
      // Add your logic to upload the file or perform other actions
      dispatch(updateprofile(token, user?.email, displayPicture));
    }
  };

  // Evnet handler for Profile info form submission
  const handleSubmitProfile = (event) => {
    event.preventDefault();

    // console.log("Profile wale form ka Data", dob, gender, about, phonenumber);
    if (dob || gender || about || phonenumber) {
      dispatch(updateprofileInfo(gender, dob, phonenumber, about, token));
    }
    setDob("");
    setAbout("");
    setGender("");
    setPhonenumber("");
  };

  //Event handler for Profile Password form submission
  const handlerSubmitPassword = (event) => {
    event.preventDefault();
    // console.log(
    //   "PROFILE PASS WORD WALE ME DATA AA RAHA HAI...",
    //   password,
    //   newPassword,
    //   token
    // );

    if (password && newPassword) {
      dispatch(changePassword(token, password, newPassword, navigate));
    }

    setPassword("");
    setNewPassword("");
  };

  return (
    <section className="text-white relative">
      {/* Back  */}
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => navigate("/dashboard/my-profile")}
      >
        <LiaLessThanSolid className="text-[#838894] text-[14px] leading-[22px] " />
        <p className="text-[#838894] text-[14px] leading-[22px] ">Back </p>
      </div>

      {/* Setting  */}
      <h1 className="text-[30px] leading-[38px] font-medium text-richblack-5 my-6">
        Setting
      </h1>

      {/* Profile Picture Update */}
      <div className="bg-richblack-800 p-5 ml-6 mt-6 rounded-xl flex gap-5 items-center relative">
        <img
          src={user?.image}
          alt=""
          className="w-[15%] h-[15%] aspect-square rounded-full object-cover"
        />
        <div className="w-full">
          <p className="text-[16px] leading-[24px] font-medium text-richblack-5">
            Change Profile Picture
          </p>
          <form onSubmit={handleSubmit} className="flex justify-between ">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="profilePicture"
                className="cursor-pointer bg-[#FFD60A] text-richblack-900 font-semibold text-[16px] px-3 transition-all duration-200 hover:bg-[#ffd60ada] py-2 mt-4 rounded-md"
              >
                Change
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            {/* Display a preview of the selected file */}
            {displayPicture && (
              <img
                src={URL.createObjectURL(displayPicture)}
                alt="Preview"
                className="w-[12vw] h-[12vw]  rounded-full object-cover absolute right-36 bottom-3 aspect-square"
              />
            )}
            <div className="flex items-center gap-1">
              <button
                type="submit"
                className="bg-richblack-900 px-3 py-2 transition-all duration-200 hover:bg-[#111] text-richblack-5 leading-[24px] rounded-md "
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Profile Details Update  */}
      <div className="bg-richblack-800 p-5 ml-6 mt-6 rounded-xl flex gap-5 flex-col">
        <h1 className="text-[18px] leading-[26px] font-semibold text-richblack-5">
          Personal Information
        </h1>

        <form onSubmit={handleSubmitProfile} className="flex flex-col gap-8">
          <div className="flex gap-5 items-center">
            {/* Date of Birth  */}
            <div className="flex gap-3 flex-col w-[50%]">
              <label
                htmlFor="dob"
                className="text-[14px] leading-[24px] text-richblack-5"
              >
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                id="dob"
                value={dob}
                onChange={(event) => {
                  setDob(event.target.value);
                }}
                className="border w-[100%] items-center flex bg-richblack-800 py-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E] px-6 border-richblack-300 p-2 rounded-md focus:outline-none text-richblack-5"
              />
            </div>

            {/* Gender  */}
            <div className="w-[50%]">
              <label className="text-[14px] leading-[24px] text-richblack-5 ml-2">
                Gender
              </label>
              <div className="mt-2 items-center flex bg-richblack-800 py-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E] p-3 px-6 w-[90%] rounded-md">
                <label className="inline-flex items-center mr-6">
                  <input
                    type="radio"
                    className="appearance-none w-4 h-4 bg-richblack-700 rounded-full checked:bg-[#FFD06A] checked:ring-[#FFD06A] ring-2 checked:border-richblack-900 border-richblack-700 border-[2px]"
                    name="gender"
                    value="male"
                    // Additional attributes and event handlers as needed
                    onClick={(event) => {
                      setGender(event.target.value);
                    }}
                  />
                  <span className="ml-3">Male</span>
                </label>

                <label className="inline-flex items-center mx-6">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="appearance-none w-4 h-4 bg-richblack-700 rounded-full checked:bg-[#FFD06A] checked:ring-[#FFD06A] ring-2 checked:border-richblack-900 border-richblack-700 border-[2px]"
                    // Additional attributes and event handlers as needed
                    onClick={(event) => {
                      setGender(event.target.value);
                    }}
                  />
                  <span className="ml-3">Female</span>
                </label>

                <label className="inline-flex items-center mx-6">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    className="appearance-none w-4 h-4 bg-richblack-700 rounded-full checked:bg-[#FFD06A] checked:ring-[#FFD06A] ring-2 checked:border-richblack-900 border-richblack-700 border-[2px]"
                    // Additional attributes and event handlers as needed
                    onClick={(event) => {
                      setGender(event.target.value);
                    }}
                  />
                  <span className="ml-3">Other</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-5 items-center justify-between">
            {/* Phone Number  */}
            <div className="flex flex-col gap-x-10 w-[50%]">
              <label
                htmlFor="phoneNo"
                className="text-[14px] mb-2 text-richblack-5"
              >
                Phone Number
              </label>
              <div className="flex gap-5 items-center justify-center">
                {/* dropDown  */}

                <select
                  name="dropdown"
                  id="dropdown"
                  className="bg-richblack-800 text-richblack-5 rounded-md py-2 px-1 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E] w-[15%]"
                  value="+91"
                >
                  {countryCode.map((elem, index) => {
                    return (
                      <option
                        key={index}
                        value={elem.code}
                        className="text-richblack-5"
                      >
                        {elem.code} -{elem.name}
                      </option>
                    );
                  })}
                </select>

                <input
                  type="tel"
                  name="phonenumber"
                  id="phonenumber"
                  value={phonenumber}
                  onChange={(event) => {
                    setPhonenumber(event.target.value);
                  }}
                  placeholder="12345 678910"
                  className="bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E] w-[90%]"
                />
              </div>
            </div>

            {/* About Bio  */}
            <div className="w-[50%] flex flex-col gap-2">
              <label
                htmlFor="bio"
                className="text-[14px] leading-[24px] text-richblack-5 ml-2"
              >
                About
              </label>
              <input
                type="text"
                id="bio"
                placeholder="Enter your Bio..."
                name="about"
                value={about}
                onChange={(event) => {
                  setAbout(event.target.value);
                }}
                className="bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E] w-[90%]"
              />
            </div>
          </div>

          <input
            type="submit"
            value="Change"
            className="ml-auto mr-11 my-4 bg-[#f0ff6a] rounded-md py-2 px-3 text-richblack-900 transition-all duration-200 hover:bg-[#f0c361]"
          />
        </form>
      </div>

      {/* Change PassWord Section  */}
      <div className="relative bg-richblack-800 p-5 ml-6 mt-6 rounded-xl flex gap-5 flex-col">
        <h1 className="text-[18px] font-semibold leading-[26px] text-richblack-5">
          Change Password
        </h1>

        <form
          className="flex flex-col gap-5 items-center"
          onSubmit={handlerSubmitPassword}
        >
          <div className="w-full flex ">
            <div className="flex flex-col gap-2 w-[45%] mr-[5%]">
              <label
                htmlFor="password"
                className="text-[14px] text-richblack-5"
              >
                Current Password{" "}
                <sup className="text-[14px] text-[#EF476F] ">*</sup>
              </label>
              <input
                type={showText ? "text" : "password"}
                id="password"
                placeholder="Current Password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="bg-richblack-800 rounded-md py-2 px-2 relative placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]"
              />
              {/* eye wala icon aanega ider */}
              <i
                className="absolute left-[380px] bottom-[42%] text-[20px] cursor-pointer"
                onClick={clickHandler}
              >
                {showPassword ? (
                  <FaEye className="text-richblack-200" />
                ) : (
                  <FaEyeSlash className="text-richblack-200" />
                )}
              </i>
            </div>

            <div className="flex flex-col gap-2 w-[45%]">
              <label
                htmlFor="NewPassword"
                className="text-[14px] text-richblack-5"
              >
                New Password{" "}
                <sup className="text-[14px] text-[#EF476F] ">*</sup>
              </label>
              <input
                type={showText1 ? "text" : "password"}
                id="NewPassword"
                placeholder="New Password"
                value={newPassword}
                name="newPassword"
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-richblack-800 rounded-md py-2 px-2 relative placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]"
              />
              {/* eye wala icon aanega ider */}
              <i
                className="absolute right-[80px] bottom-[42%] text-[20px] cursor-pointer"
                onClick={clickHandler1}
              >
                {showConfirmPassword ? (
                  <FaEye className="text-richblack-200" />
                ) : (
                  <FaEyeSlash className="text-richblack-200" />
                )}
              </i>
            </div>
          </div>

          <input
            type="submit"
            value="Change Password"
            className="bg-[#FFD06A] py-2 px-3 ml-auto rounded-md text-richblack-900 mr-10"
          />
        </form>
      </div>

      {/* Delete Account  */}
      <div className="bg-gradient-to-r from-[#691432e0] to-[#3400199f]  p-5 ml-6 mt-6 rounded-xl flex gap-5" onClick={() => setConfirmationModal({
                        text1:"Are You Sure ?",
                        text2:"You will be logged out of your Account and your Account will be permanently deleted.",
                        btn1Text:"Delete Account",
                        btn2Text:"Cancel",
                        btn1Handler: () => dispatch(deleteAccount(token, navigate)),
                        btn2Handler: () => setConfirmationModal(null),
                    }
                )}>
        <div className="w-[52px] h-[52px] aspect-square rounded-full bg-[#691432] flex items-center justify-center">
          <MdDelete className="text-[24px] text-[#EF476F]" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-[18px] leading-[26px] font-bold text-[#FFF1F1]">
            Delete Account
          </h1>
          <div className="flex flex-col">
            <p className="text-[14px] leading-[22px] font-medium text-[#FBC7D1]">
              Would you like to delete account?
            </p>
            <p className="text-[14px] leading-[22px] font-medium text-[#FBC7D1] w-[75%]">
              This account contains Paid Courses. Deleting your account will
              remove all the contain associated with it.
            </p>
          </div>
          <i className="text-16 leading-24 font-medium text-[#D43D63] transition-all duration-200 border-b w-[70%] border-transparent hover:border-b-2 hover:border-[#691432] cursor-pointer">
            I want to delete my account.
          </i>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal  modalData={confirmationModal}/>}
    </section>
  );
}

export default Setting;

import React, { useState } from "react";
import SignupImage from "../assest/images/image 5.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { countryCode } from "../data/countryCode";
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setSignupData} from '../slices/authSlice';
import { sendOtp } from "../services/operations/authAPI";

function Signup() {
  const [accountType, setAccountType] = useState("Student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setcontactNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password : password,
      confirmPassword: confirmPassword,
      accountType: accountType,
      contactNumber: contactNumber
    }
    dispatch(setSignupData(payload));
    // console.log("SIGN UP ME HAI YEH..........",  firstName,
    // lastName,
    // email,
    // password,
    // confirmPassword,
    // accountType,
    // contactNumber)
    dispatch(sendOtp(email, navigate))
    navigate('/verify-email');
    setAccountType("Student");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setcontactNumber("");
    setConfirmPassword("");
  };

  const code = countryCode;

  const clickHandler = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
      setShowText(!showText);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
      setShowText2(!showText2);
    }
  };


  return (
    <div className="text-white flex w-11/12 mx-auto m-2 justify-between items-center">
      <div className="flex flex-col  w-[50%]">
        <div className="flex flex-col gap-2">
          <h1 className="text-richblack-5 text-[30px]">
            Join the millions learning to code with StudyNotion for free
          </h1>
          <p className="text-richblack-200 text-[18px]">
            Build skills for today, tomorrow, and beyond.
            <span className="text-[#47A5C5] text-[16px] font-edu-sa">
              Education <br />
              to future-proof your career.
            </span>
          </p>
        </div>

        <div className="bg-richblack-800 w-fit rounded-full py-1 px-2 gap-[5px] flex shadow-[#FFFFFF2E] shadow">
          <button
            onClick={() => setAccountType("Student")}
            className={`${
              accountType === "Student"
                ? "bg-richblack-900 text-richblack-5"
                : "bg-transparent text-richblack-200 "
            } py-2 px-5 rounded-full transition-all`}
          >
            Student
          </button>
          <button
            onClick={() => setAccountType("Instructor")}
            className={`${
              accountType === "Instructor"
                ? "bg-richblack-900 text-richblack-5"
                : "bg-transparent text-richblack-200 "
            } py-2 px-5 rounded-full transition-all`}
          >
            Instructors
          </button>
        </div>

        <div className="flex flex-col mt-3">
          <form
            action=""
            onSubmit={submitHandler}
            className="flex flex-col gap-4 relative w-[75%]"
          >
            <div className="flex gap-3">
              <div>
                <label htmlFor="fName" className="text-[14px] text-richblack-5">
                  First Name{" "}
                  <sup className="text-[14px] text-[#EF476F] ">*</sup>
                </label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  id="fName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]"
                />
              </div>
              <div>
                <label htmlFor="lName" className="text-[14px] text-richblack-5">
                  Last Name <sup className="text-[14px] text-[#EF476F] ">*</sup>
                </label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  id="lName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-[14px] text-richblack-5">
                Email Address{" "}
                <sup className="text-[14px] text-[#EF476F] ">*</sup>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                name="email"
                placeholder="Enter email address"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]"
              />
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="text-[14px] text-richblack-5"
              >
                Phone Number{" "}
                <sup className="text-[14px] text-[#EF476F] ">*</sup>
              </label>
              <div className="flex items-center">
                <select
                  id="phoneNumberCode"
                  value={"+91"}
                  className=' bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E] mr-2'
                >
                  {code.map((country) => {
                    return (
                      <option key={country.code} value={country.code} className="scroll-hidden">
                        {country.code}
                      </option>
                    );
                  })}
                </select>

                <input
                  type="tel"
                  numberOnly="true"
                  id="phoneNumber"
                  onChange={(e) =>
                    setcontactNumber(e.target.value)
                  }
                  value={contactNumber}
                  placeholder="Enter phone number"
                  className="bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E] w-[80%]"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div>
                <label
                  htmlFor="password"
                  className="text-[14px] text-richblack-5"
                >
                  Password <sup className="text-[14px] text-[#EF476F] ">*</sup>
                </label>
                <input
                  type={showText ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]"
                />
                {/* eye wala icon aanega ider */}
                <i
                  className="absolute bottom-[64px] right-[55%] text-[20px] cursor-pointer"
                  onClick={() => clickHandler("password")}
                >
                  {showPassword ? (
                    <FaEye className="text-richblack-200" />
                  ) : (
                    <FaEyeSlash className="text-richblack-200" />
                  )}
                </i>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-[14px] text-richblack-5"
                >
                  Confirm Password{" "}
                  <sup className="text-[14px] text-[#EF476F] ">*</sup>
                </label>
                <input
                  type={showText2 ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="confirm password"
                  value={confirmPassword}
                  name="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]"
                />
                {/* eye wala icon aanega ider */}
                <i
                  className="absolute bottom-[63px] right-4 text-[20px] cursor-pointer"
                  onClick={() => clickHandler("confirmPassword")}
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
              value={"Create Account"}
              className="bg-[#FFD60A] font-semibold rounded-md text-richblack-900 py-2 px-2"
            />
          </form>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <img src={SignupImage} alt="signup-image" className="w-[80%] mt-9" />
      </div>
    </div>
  );
}

export default Signup;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { sendOtp, signUp } from "../services/operations/authAPI";
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import { BsArrowRepeat } from "react-icons/bs";

function VerifyEmail() {
  const { signupData, loading } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log("Verify email me response aa raha hai........", signupData);
  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [navigate, signupData]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      contactNumber
    } = signupData;

    dispatch(
      signUp(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp,
        navigate
      )
    );
  };
  return (
    <div className="text-white flex justify-center w-11/12 mx-auto my-auto">
      {loading ? (
        <div className="flex justify-center items-center">Loading...</div>
      ) : (
        <div className="flex flex-col w-[350px] gap-3">
          <h1 className="text-[30px] font-semibold leading-[38px] text-richblack-5">Verify Email</h1>
          <p className="text-[18px] leading-[26px] text-[#AFB2BF] font-normal">A verification code has been sent to you. Enter the code below</p>
          <form onSubmit={handleOnSubmit}>
         
          <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => <input {...props} className='bg-richblack-800 mx-3 text-center mb-3 w-full rounded-md py-2 px-2 shadow shadow-[#FFFFFF2E]'/>}
              skipDefaultStyles={true}
              />

        
            <button type="submit" className="text-center w-full bg-[#FFD60A] text-richblack-800 p-[12px] rounded-md text-[16px] leading-[24px] font-medium  gap-[8px]">Verify and Register</button>
          </form>

          <div className="w-full flex justify-between">
            <div className="flex items-center gap-1 mr-auto w-[50%]">
              <Link to="/login" className="flex items-center gap-1">
                <FaLongArrowAltLeft className="text-richblack-5" />
                <p>Back to login</p>
              </Link>
            </div>

            <button onClick={() => dispatch(sendOtp(signupData.email, navigate))} className="flex items-center gap-1 ml-[35%] w-[50%]">
              <BsArrowRepeat />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;

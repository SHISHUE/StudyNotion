import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";
import { FaLongArrowAltLeft } from "react-icons/fa";

function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="w-11/12 flex justify-center items-center my-auto mx-auto">
      <div className="text-white flex justify-center items-center mx-auto">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className={`${emailSent ? 'w-[60%]' : 'w-[35%]'}  flex flex-col gap-5 `}>
            <h1 className="text-richblack-5 font-semibold text-[30px]">{!emailSent ? "Reset your Password" : "Check Your email"}</h1>

            <p className="text-richblack-100 text-[18px] font-normal">
              {!emailSent
                ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                : `We have sent the reset email to ${email}`}
            </p>

            <form onSubmit={handleOnSubmit} className="flex flex-col gap-6">
              {!emailSent && (
                <label>
                  <p className="text-richblack-5 font-normal text-sm">Email Address <sup className="text-[#EF476F] ">*</sup></p>
                  <input
                    className='bg-richblack-800 w-full mt-2 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]'
                    type="email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                  />
                </label>
              )}

              <button type="submit" className="bg-[#FFD60A] font-normal rounded-md text-richblack-900 py-2 px-2">
                {!emailSent ? "Reset Password" : "Resend Email"}
              </button>
            </form>

            <div>
              <Link to="/login" className="flex items-center gap-1">
                <FaLongArrowAltLeft className="text-richblack-5"/>
                <p>Back to login</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;

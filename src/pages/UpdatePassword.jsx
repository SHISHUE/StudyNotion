import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation,useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";

function UpdatePassword() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { password, confirmPassword } = formData;
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token,navigate));
  };
  return (
    <div className="text-white">
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div>
          <h1>Choose new Password</h1>
          <p>Almost done. Enter your new password and youre all set.</p>
          <form onSubmit={handleOnSubmit}>
            <label>
              <p>
                New Password <sup>*</sup>
              </p>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                required
                placeholder="Password"
                className='bg-richblack-800 w-full mt-2 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]'
              />
              <span onClick={() => setShowPassword((prev) => !prev)}>
                {
                   showPassword ? <FaEye className='text-richblack-200'/> : <FaEyeSlash className='text-richblack-200'/>
                }
              </span>
            </label>


            <label>
              <p>
                Confirm New Password <sup>*</sup>
              </p>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="confirm Password"
                required
                className='bg-richblack-800 w-full mt-2 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]'
              />
              <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                {
                   showConfirmPassword ? <FaEye className='text-richblack-200'/> : <FaEyeSlash className='text-richblack-200'/>
                }
              </span>
            </label>


              <button type="submit">Reset Password</button>
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
  );
}

export default UpdatePassword;

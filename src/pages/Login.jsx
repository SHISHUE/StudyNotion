import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginImage from '../assest/images/image (4).svg';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';

import {login} from "../services/operations/authAPI";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showText, setShowText] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password, navigate))
    setEmail('')
    setPassword('')
  }

  const clickHandler = () => {
      setShowText(!showText)
      setShowPassword(!showText)
  }

  return (
    <div className='text-white flex w-11/12 mx-auto justify-between items-center'>

     <div className='flex flex-col gap-4 w-[50%]'>
      <div className='flex flex-col gap-2'>
          <h1 className='text-richblack-5 text-[30px]'>Welcome Back</h1>
          <p className='text-richblack-200 text-[18px]'>Build skills for today, tomorrow, and beyond. 
            <span className='text-[#47A5C5] text-[16px] font-edu-sa'>Education <br />to future-proof your career.</span>
          </p>
        </div>

       
        
        <div className='flex flex-col mt-3'>
          <form action="" onSubmit={submitHandler} className='flex flex-col gap-3 relative w-[70%]'>
            <label htmlFor="email" className='text-[14px] text-richblack-5'>Email Address <sup className='text-[14px] text-[#EF476F] '>*</sup></label>
            <input type="email" id='email' value={email} name='email' placeholder='Enter email address' onChange={(e) => setEmail(e.target.value)} className='bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]' />

            <label htmlFor="password" className='text-[14px] text-richblack-5'>Password <sup className='text-[14px] text-[#EF476F] '>*</sup></label>
            <input type={showText ? 'text' : 'password'} id='password' placeholder='Enter Password' value={password} name='password' onChange={(e) => setPassword(e.target.value)} className='bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]' />
            {/* eye wala icon aanega ider */}
             <i className='absolute bottom-[94px] right-4 text-[20px] cursor-pointer' onClick={clickHandler}>
             {
              showPassword ? <FaEye className='text-richblack-200'/> : <FaEyeSlash className='text-richblack-200'/>
             }
             </i>
            <Link to={'/forget-password'} className='text-[12px] text-[#47A5C5] ml-auto select-none'>Forget Password ?</Link>

            <input type="submit" value={'Sign in'} className='bg-[#FFD60A] rounded-md text-richblack-900 py-2 px-2'/>
          </form>
        </div>
     </div>

     <div className='flex flex-col items-center justify-center'>
      <img src={LoginImage} alt="login-image" className='w-[585px] h-[531px] mt-9'/>
     </div>
      
    </div>
  )
}

export default Login
import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import IconBtn from '../../../common/IconBtn';
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI';
import {useNavigate} from 'react-router-dom'

function RenderTotalAmount() {

    const {total, cart} = useSelector((state) => state.cart);
    const token = JSON.parse(localStorage.getItem("token"));
    const {user} = useSelector((state) => state.profile)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        // console.log("COURSES ID....", user);
        //TODO: API INTEGRATE ---> Payment gateway
        buyCourse(token, courses, user, navigate, dispatch)
    }

  return (
    <div className='flex flex-col gap-y-3 h-[25vh] bg-richblack-800 border-[1px] border-richblack-700 w-[20vw] px-3 mx-3 py-3 rounded-xl'>
       <div className='flex flex-col gap-y-3'>
       <p className='text-[14px] leading-[22px] font-semibold text-[#999DAA]'>
            Total:
        </p>
        <p className='text-[24px] leading-[24px] font-semibold text-[#FFD60A]'>Rs {total}</p>
       </div>

        <IconBtn 
        text="Buy Now"
        onClick={handleBuyCourse}
        customClasses={"w-full justify-center"}/>
    </div>
  )
}

export default RenderTotalAmount
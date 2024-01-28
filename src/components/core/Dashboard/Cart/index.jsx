import React from "react";
import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <div className="text-richblack-5 w-full  ">
      <p className="text-richblack-200 leading-[28px] font-medium">Home / Dashboard / <span className="text-[#FFD60A]">Cart</span></p>
      <h1 className="text-[30px] leading-[38px] text-richblack-5 font-medium ">My Cart</h1>
      <p className="mt-[3vw] text-[16px] leading-[24px] text-[#6E727F] font-semibold border-b-[1px] pb-3">{totalItems} Courses in Cart</p>

      {total > 0 ? (
        <div className="flex justify-between mt-3">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <div className="flex justify-center items-center mt-[20%]">
          <p className="text-[30px] leading-[38px] font-semibold text-[#6E727F]">Your Cart is Empty</p>
        </div>
      )}
    </div>
  );
}

export default Cart;

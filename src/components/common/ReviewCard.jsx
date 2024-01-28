import React from 'react'
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa6";

function ReviewCard({review}) {

  return (
    <div className="flex flex-col gap-2 h-[250px] w-[340px] p-3 rounded-md text-richblack-5 bg-richblack-800">
              <div className="flex gap-x-3 items-center">
              <img
                src={
                  review?.user?.image
                    ? review?.user?.image
                    : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                }
                alt="profile-pic"
                className="h-9 w-9 object-cover rounded-full aspect-square"
              />
             <div className="flex flex-col  ">
             <span className="flex items-center gap-x-2"><p>{review?.user?.firstName}</p> {review?.user?.lastName}</span>
              <span className="text-[16px] w-max leading-[24px] text-richblack-500"><p>{review?.course?.courseTitle}</p></span>
             </div>
              </div>
            <div className="w-full">
            <p className="text-[17px] leading-[22px]  text-richblack-5 font-semibold mb-auto">
                {
                    review?.review && review?.review.split(' ').length > 20
                    ? <>{review.review.split(' ').slice(0, 20).join(' ')} ...</>
                    : review?.review
                }
              </p>
            </div>
              <div className="flex items-center gap-x-2 star">
              <p className="text-[14px] leading-[20px] text-[#ffd60a]">{review?.rating.toFixed(1)}</p>
              <ReactStars count={5} value={review?.rating} classNames={"star"} size={20} edit={false} activeColor={"#FFD60A"} emptyIcon={<FaStar />} filledIcon={<FaStar />}/>
              </div>
              </div>
  )
}

export default ReviewCard
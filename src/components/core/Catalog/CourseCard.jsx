import React, { useEffect, useState } from "react";
import RatingStars from '../../common/RatingStars';
import { Link } from "react-router-dom";
import GetAvgRating from "../../../utils/avgRating";


function Course_Card({course, Height}) {

    const [avgReview, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReview);
        setAvgReviewCount(count);
    },[course])

  return (
    <div className="text-richblack-5">
      <Link to={`/courses/${course._id}`}>
        <div className="flex flex-col justify-center gap-2">
            <div>
                <img src={course?.thumbnail} alt="course-thubmnail"  className={`${Height} w-full rounded-xl object-cover`}/>
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-[16px] leading-[24px] font-medium">{course?.courseTitle}</p>
                <p className="text-[16px] leading-[24px] text-[#838894]"><span>Created By : </span> {" "}{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                <div className="flex gap-x-3">
                    <span className="text-[16px] font-semibold text-[#E7C009]">{avgReview || 0}</span>
                    <RatingStars Review_Count={avgReview} />
                    <span className="text-[16px] leading-[24px] text-[#6E727F]">{course?.ratingAndReview.length} (Review count)</span>
                </div>
                <p className="text-[20px] leading-[28px] font-semibold">Rs. {course?.price}</p>
            </div>
        </div>
      
        </Link>
    </div>
  );
}

export default Course_Card;

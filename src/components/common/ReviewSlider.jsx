import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { ratingsEndpoints } from "../../services/apis";
import { apiConnector } from "../../services/apiconnector";
import ReviewCard from "./ReviewCard";


function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  

  useEffect(() => {
    const fetchAllReviews = async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      );

      // console.log("reviews", data);
      if (data?.success) {
        setReviews(data?.data);
      }
      // console.log("Pringting review", reviews);
    };
    fetchAllReviews();
  }, []);

  return (
    <div className="w-full">
      <div >
        <Swiper
          slidesPerView={1}
          loop={true}
          pagination={{ dynamicBullets: true }}
          modules={[Pagination]}
          className="mySwiper"
          breakpoints={{1024:{slidesPerView: 3,}}}
          spaceBetween={10}
          autoplay={true}
          
        >
          {reviews?.map((review, index) => (
            <SwiperSlide key={index} >
              <ReviewCard review={review}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;

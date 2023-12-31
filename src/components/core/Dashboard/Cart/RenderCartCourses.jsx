import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { GoStarFill } from "react-icons/go";
import ReactStars from "react-rating-stars-component";
import { RiDeleteBin5Line } from "react-icons/ri";
import { setRemoveCart } from '../../../../slices/cartSlice';

function RenderCartCourses() {

    const {cart} = useSelector((state) => state.cart)
    const dispatch = useDispatch();


  return (
    <div>
        {
            cart.map((course, index) => (
                <div>
                    <div>
                        <img src={course.thumbnail} alt="course-image" />
                        <div>
                            <p>{course.courseName}</p>
                            <p>{course?.category?.name}</p>
                            <div>
                                <span>4.8</span>
                                {/* TODO: GEt Average rate  */}
                                <ReactStars 
                                    count={5}
                                    size={20}
                                    edit={false}
                                    activeColor='#ffd700'
                                    emptyIcon={<GoStarFill />}
                                    fullIcon={<GoStarFill />}

                                />

                                    <span>{course?.ratingAndReviews?.length} Ratings</span>

                            </div>
                        </div>
                    </div>


                    <div>
                        <button
                        onClick={() => dispatch(setRemoveCart(course._id))}>
                            <RiDeleteBin5Line />
                            <span>Remove</span>
                        </button>

                        <p>Rs {course?.price} </p>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default RenderCartCourses
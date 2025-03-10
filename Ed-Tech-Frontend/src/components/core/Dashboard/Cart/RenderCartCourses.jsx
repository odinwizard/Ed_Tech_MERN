import React from 'react';
import { IoMdStarOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../../../slices/cartSlice';

export const RenderCartCourses = () => {

    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();


  return (
    <div>
        {
            cart.map((course, index) => (
                <div key={index}>
                    <div>
                        <img src={course.thumbnail} alt="thumbnail" />
                        <div>
                            <p>{course?.courseName}</p>
                            <p>{course?.category?.name}</p>
                            <div>
                                <span>4.8</span>
                                <ReactStars
                                    count={5}
                                    size={20}
                                    edit={false}
                                    activeColor="#ffd700"
                                    emptyIcon={<IoMdStarOutline />} 
                                    fullIcon={<IoMdStarOutline />}     
                                    />
                                    <span>{course?.ratingAndReviews?.length} Ratings</span>
                            </div>
                        </div>
                    </div>
                   <div>
                    <button
                    onClick={() => dispatch(removeFromCart(course._id))}>
                     <RiDeleteBin6Line />
                     <span>Remove</span>
                    </button>
                    <p>RS {course?.price}</p>
                   </div>
                </div>
            ))
        }
    </div>
  )
}

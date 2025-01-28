import React, { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles

import '@smastrom/react-rating/style.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';

// import { Rating } from "@mui/material";
// import Rating from 'react-rating';

const Reviews = () => {
    const [reviews, setReviews] = useState([])
    const [rating, setRating] = useState(0) // Initial value
    useEffect(() => {
        fetch('Reviews.json')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    return (
        <section className='my-20 '>


            <Swiper

                navigation={true}
                modules={[Navigation]}
                className="mySwiper m-24"
            >
                <div>

                {
                    reviews.map(review => <SwiperSlide key={review._id}>
                        < div className=' m-24 flex flex-col  items-center  border-yellow-700 border-2'>
                            <div className='flex justify-center'>
                            <Rating
                                style={{ maxWidth: 200 }}
                                readOnly
                                value={review.rating}
                                 
                               
                            />
                            </div>
                            <p>{review.details}</p>
                            <p className='text-2xl text-center text-yellow-500'>{review.name}</p>
                        </div>
                    </SwiperSlide>)
                }
                </div>
            </Swiper>

        </section>
    );
};

export default Reviews;
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import "swiper/css/bundle";

import "../assets/css/swiperStyles.css";
import { categoryList } from "../utils/supports";

const CreatePost = () => {
  return (
    <div className="w-full flex items-center justify-center ">
      {/* input field */}
      <input
        className="border border-gray-300 w-full py-2 rounded-md text-primary outline-none"
        placeholder="    Your post title here"
      />
      {/*  categoty list section*/}
      <div>
        <Swiper
          grabCursor={true}
          spaceBetween={10}
          centeredSlides={false}
          className="mySwiper"
          slidesPerView={5}
        >
          {categoryList &&
            categoryList.map((catData) => (
              <SwiperSlide key={catData.id}>
                <div>
                  {/* Use console.log outside of JSX */}
                  {console.log(catData.name)}
                  <p>{catData.name}</p>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CreatePost;

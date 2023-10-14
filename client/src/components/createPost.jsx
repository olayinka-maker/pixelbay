import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import "../assets/css/swiperStyles.css";
import { categoriesList } from "../utils/supports";
import { useState } from "react";

const CreatePost = () => {
  const [category, setCategory] = useState("");

  return (
    <div className="w-full  flex items-center flex-col justify-center">
      {/* input field */}
      <input
        className=" w-full px-4 py-3 rounded-md border border-gray-200 shadow-inner text-lg text-primary font-semibold"
        placeholder="Your post title here"
      />
      {/* category list section */}
      <div className="w-full max-w-screen-lg">
        <Swiper
          grabCursor={true}
          spaceBetween={30}
          centeredSlides={false}
          className="mySwiper"
          slidesPerView={10}
        >
          {categoriesList &&
            categoriesList.map((value) => (
              <SwiperSlide key={value.id} className="py-4">
                <div
                  className={`px-2 py-1 flex items-center justify-center rounded-md border border-gray-200 hover:shadow-md shadow-inner ${
                    category === value.name && "bg-gray-200"
                  }`}
                  onClick={() => setCategory(value.name)}
                >
                  <p className="text-base text-primary cursor-pointer">
                    {value.name}
                  </p>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CreatePost;

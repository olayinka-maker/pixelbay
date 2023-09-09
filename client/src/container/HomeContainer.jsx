import React from "react";
import { BannerImage } from "../assets";

const HomeContainer = () => {
  return (
    <div className="w-full h-[5000px]">
      <div className=" w-screen flex  justify-center h-420 item-center relative">
        <img src={BannerImage} className="w-full h-full object-cover" alt="" />
      </div>
    </div>
  );
};

export default HomeContainer;

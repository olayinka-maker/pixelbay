import React from "react";
import { Loader } from "./assets/index";

const LoaderComp = () => {
  return (
    <div className="flex w-screen justify-center items-center">
      <img src={Loader} alt="loading Animation " />
    </div>
  );
};

export default LoaderComp;

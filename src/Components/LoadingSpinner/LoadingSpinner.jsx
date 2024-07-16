import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const LoadingSpinner = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center h-sreen ">
      <DotLottieReact
        src="https://lottie.host/0c74ec7b-ea70-4935-8035-7f69d0230e21/rg5OngySzv.lottie"
        loop
        autoplay
        className="w-2/5 "
      />
      <h1> {message}</h1>
    </div>
  );
};

export default LoadingSpinner;

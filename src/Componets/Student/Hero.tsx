import React from "react";
import Heroimg from "../../Data/Hero.png";
import Button from "../ReuseCompo/Button";
import "../../index.css";
function Hero() {
  return (
    <div
      className={`flex flex-col md:flex-row h-auto md:h-120 lg:h-130
  items-center mx-auto
  px-3  md:px-2 lg:px-4
  gap-10 md:gap-0`}
    >
      <div
  className="flex flex-col justify-center gap-6
  mt-6 sm:mt-8
  px-4 sm:px-8 md:px-12
  text-center md:text-left
  max-w-xl md:max-w-2xl"
>
  <div className="mb-5">

    <h1
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl
      font-bold leading-snug tracking-tight mb-4"
    >
      Empower Your Learning Journey
    </h1>

    <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-md">
      Explore high-quality courses and advance your skills
    </p>

  </div>

  <div
    className="flex flex-col sm:flex-row items-center
    gap-4 mt-3 sm:mt-5
    justify-center md:justify-start"
  >
    <Button
      title="Explore Courses"
      classname="bg-green-500 font-semibold text-base sm:text-lg w-40 sm:w-44 md:w-48 font-sans text-white"
    />

    <Button
      title="Get Started"
      classname="bg-blue-800 font-semibold w-40 sm:w-44 md:w-48 font-sans text-white"
    />
  </div>
</div>

      <div className={`flex justify-center w-full md:w-auto`}>
        <img
          src={Heroimg}
          alt="Hero"
          className={`object-contain
      h-100 sm:h-80 md:h-104 lg:h-130
      w-auto`}
        />
      </div>
    </div>
  );
}

export default Hero;

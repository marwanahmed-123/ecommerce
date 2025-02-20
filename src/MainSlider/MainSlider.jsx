import { useEffect, useState } from "react";
import Style from "./MainSlider.module.css";
import slider1 from "../assets/slider-image-1.jpeg";
import slider2 from "../assets/slider-image-2.jpeg";
import fixed2 from "../assets/slider-image-3.jpeg";
import fixed1 from "../assets/slider-2.jpeg";
import Slider from "react-slick";
export default function MainSlider() {
  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <>
      <div className="grid grid-cols-6 mb-4 mx-auto w-fit">
        <Slider {...settings} className="col-span-6 lg:col-span-4">
          <img className="w-full h-[300px] object-cover" src={slider1} alt="" />
          <img className="w-full h-[300px] object-cover" src={slider2} alt="" />
        </Slider>
        <div className="col-span-6 flex lg:col-span-2 lg:block">
          <img
            src={fixed1}
            alt=""
            className="w-1/2 h-[150px] object-cover lg:w-full"
          />
          <img
            src={fixed2}
            alt=""
            className="w-1/2 h-[150px] object-cover lg:w-full"
          />
        </div>
      </div>
    </>
  );
}

import React from "react";
import Slider from "react-slick";

const SliderHome = () => {
  const slides = [
    {
      src: "/img/slide1.png"
    },
    {
      src: "/img/slide2.png"
    },
    {
      src: "/img/slide3.png"
    }
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true
  };

  const generateSlides = slides =>
    slides
      ? slides.map((item, i) => (
          <div key={i}>
            <img src={item.src} alt="" />
          </div>
        ))
      : null;

  return <Slider {...settings}> {generateSlides(slides)} </Slider>;
};

export default SliderHome;

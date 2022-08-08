import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import reactLogo from '../images/logo512.png'
import carouselimg from '../images/image1.jpg'

const CarouselComponent = () => {

    let settings = {
        infinite: true,
        arrows:true,
        autoplay:true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

  return (
    <div>
        <div className='sliderComponent'>
            <Slider {...settings}>
            <div className='singleCarousel'>
                <img src={carouselimg} alt="" />
                <div className='carouselContent'>
                <h2>Author of book</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores commodi sequi soluta cupiditate, maxime tenetur eius perspiciatis vero ratione quos.</p>
                </div>
            </div>
            <div className='singleCarousel'>
                <img src={reactLogo} alt="" />
                <div className='carouselContent'>
                <h2>Author of book</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores commodi sequi soluta cupiditate, maxime tenetur eius perspiciatis vero ratione quos.</p>
                </div>
            </div>
            <div className='singleCarousel'>
            <img src={reactLogo} alt="" />
                <div className='carouselContent'>
                <h2>Author of book</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores commodi sequi soluta cupiditate, maxime tenetur eius perspiciatis vero ratione quos.</p>
                </div>
            </div>
            </Slider>
        </div>
    </div>
  )
}

export default CarouselComponent
'use client'
import Slider from 'react-slick'
import { banners } from '../../utils/constants'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const BannerSlider = () => {
  const settings = {
    centerMode: true,
    centerPadding: "400px", // ocupa casi toda la pantalla en desktop
    slidesToShow: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1536, // xl (pantallas grandes)
        settings: {
          centerPadding: "250px",
        },
      },
      {
        breakpoint: 1280, // lg
        settings: {
          centerPadding: "200px",
        },
      },
      {
        breakpoint: 1024, // md
        settings: {
          centerPadding: "100px",
          arrows: false,
        },
      },
      {
        breakpoint: 768, // sm/tablet
        settings: {
          centerPadding: "40px",
          arrows: false,
        },
      },
      {
        breakpoint: 640, // mobile
        settings: {
          centerMode: false,
          centerPadding: "0px",
          arrows: false,
          dots: true,
        },
      },
    ],
  }

  return (
    <div className="w-full bg-black py-6">
      <div className="w-full">
        <Slider {...settings}>
          {banners.map((banner, i) => (
            <div key={i} className="px-2">
              <img
                src={banner}
                alt={`banner-${i}`}
                className="
                  w-full 
                  h-[300px] 
                  sm:h-[380px] 
                  md:h-[420px] 
                  lg:h-[480px] 
                  xl:h-[400px] 
                  object-cover 
                  rounded-xl 
                  shadow-md
                "
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default BannerSlider

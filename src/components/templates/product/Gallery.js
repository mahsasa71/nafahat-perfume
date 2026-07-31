
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";


const Gallery = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);


  const allImages = images?.length > 0 
    ? images 
    : ["https://set-coffee.com/wp-content/uploads/2021/10/041-430x430.png"];

  return (
    <section style={{ width: "100%" }}>
 
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 gallery-slider"
      >
        {allImages.map((src, index) => (
          <SwiperSlide key={index}>
            <img 
              src={src} 
              alt={`product-${index}`} 
              style={{ width: "100%", borderRadius: "10px" }} 
            />
          </SwiperSlide>
        ))}
      </Swiper>

  
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="gallery-slider-2"
        style={{ marginTop: "10px" }}
      >
        {allImages.map((src, index) => (
          <SwiperSlide key={index}>
            <img 
              src={src} 
              alt={`thumbnail-${index}`} 
              style={{ cursor: "pointer", borderRadius: "5px" }} 
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Gallery;

"use client";
import Product from "@/components/module/product/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const MoreProducts = ({ relatedProducts }) => {
  

  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <div data-aos="fade-right" className="w-full pb-10">
      <section className="mb-8">
        <h2 className="text-xl font-DanaMedium">محصولات مرتبط</h2>
        <div className="h-[2px] w-[70px] bg-zinc-800 dark:bg-white mt-2"></div>
      </section>

      <Swiper
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 7 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
        }}
        dir="rtl"
        rewind={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper !pb-10"
      >
        {relatedProducts.map((product) => (
          <SwiperSlide key={product._id} className="h-full">
            <div className="pb-2">
           
              <Product {...JSON.parse(JSON.stringify(product))} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MoreProducts;
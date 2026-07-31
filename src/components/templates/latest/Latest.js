
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Product from "@/components/module/product/Product";
import ProductSkeleton from "@/components/module/product/ProductSkeleton";
import { FaChevronLeft } from "react-icons/fa6";

const Latest = ({ products }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (products && products.length > 0) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [products]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 my-12 font-Dana">
   
      <section className="flex items-center justify-between mb-8">
                <div className="text-right">
          <p className="text-xl md:text-2xl font-DanaDemiBold text-zinc-700 dark:text-white">
            آخرین محصولات
          </p>
          <span className="text-zinc-400 text-xs md:text-sm block mt-1 tracking-widest uppercase">
            Latest products
          </span>
        </div>
        <Link 
          href="/category/all" 
          className="flex items-center gap-x-1 text-orange-400 hover:text-orange-500 transition-colors text-sm md:text-base font-DanaMedium"
        >
          مشاهده همه 
                    <FaChevronLeft className="w-3 h-3 md:w-4 h-4" />

        </Link>


      </section>

     
      <main 
        data-aos="fade-up" 
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
      >
        {isLoading ? (
         
          Array.from({ length: 4 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : (
         
          products?.slice(0, 4).map((product) => (
            <Product key={product._id} {...product} />
          ))
        )}
      </main>
    </div>
  );
};

export default Latest;
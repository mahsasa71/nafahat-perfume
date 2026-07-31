
import React from "react";

export default function CategoryBanner() {
  return (
    <section className="category-banner mt-8 mb-10 md:my-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-white">

          <a
            href="#"
            className="category-banner_item1 flex flex-col justify-center pr-7 md:pr-12 rounded-2xl h-[242px] md:h-[400px] bg-fixed bg- md:bg-cover  bg-center transition-all hover:brightness-110"
          >
            <h5 className="font-Dana font-semibold text-xl/6 md:text-3xl/6 mb-6 md:mb-7 drop-shadow-lg">
              دنیای عطرهای مردانه
            </h5>
            <span className="font-Dana font-medium text-sm md:text-xl/6 max-w-[250px] md:max-w-none drop-shadow-md">
             مجموعه‌ای از رایحه‌های تلخ، خنک و چوبی برای آقایان شیک‌پوش.
            </span>
          </a>

      
          <a
            href="#"
            className="category-banner_item2 flex flex-col justify-center pr-7 md:pr-12 rounded-2xl h-[242px] md:h-[400px] bg-fixed bg-cover bg-center transition-all hover:brightness-110"
          >
            <h5 className="font-Dana font-semibold text-2xl/6 md:text-4xl/6 mb-6 md:mb-7 drop-shadow-lg">
            ظرافت عطرهای زنانه
            </h5>
            <span className="font-Dana font-medium text-sm md:text-xl/6 max-w-[250px] md:max-w-none drop-shadow-md">
              تجربه‌ای از بوهای گلی، شیرین و ملایم؛ مخصوص خانم‌های خاص‌پسند.
            </span>
          </a>

        </div>
      </div>
    </section>
  );
}

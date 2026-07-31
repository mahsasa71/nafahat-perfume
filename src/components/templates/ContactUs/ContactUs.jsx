
import React from "react";

export default function ContactUs() {
  return (
    <section className="contact-us mb-16 md:mb-28">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-y-8 lg:gap-x-10">

         
          <img
            className="shrink-0 w-[296px] md:w-[400px] object-contain"
            src="imges/collect.jpg" 
            alt="مشاوره تخصصی عطر"
          />

          <div className="text-zinc-800 dark:text-white text-right">
            <h3 className="font-Morabba font-medium text-2xl md:text-5xl mb-2 md:mb-4">
              رایحه امضای خود را پیدا کنید!
            </h3>
            <span className="font-Morabba font-light text-lg md:text-3xl text-orange-400">
              مشاوره تخصصی انتخاب عطر و ادکلن
            </span>

           
            <div className="flex gap-x-2.5 my-5 md:my-8">
              <span className="inline-block w-1.5 h-1.5 bg-orange-300 rounded-full"></span>
              <span className="inline-block w-1.5 h-1.5 bg-orange-300/60 rounded-full"></span>
              <span className="inline-block w-1.5 h-1.5 bg-orange-300/30 rounded-full"></span>
            </div>

            <p className="font-Dana text-lg md:text-2xl leading-relaxed md:leading-[42px] max-w-[700px]">
              انتخاب عطر فراتر از یک خرید ساده است؛ این انتخاب بخشی از شخصیت شماست. کارشناسان ما آماده‌اند تا با توجه به سلیقه، فصل و موقعیت مورد نظر شما، بهترین و ماندگارترین رایحه‌ها را پیشنهاد دهند. با یک تماس، دنیای جدیدی از عطرها را کشف کنید.
            </p>

           
            <a
              href="tel:+989011289066" 
              className="inline-flex items-center justify-center gap-x-3 h-[50px] md:h-[64px] border-2 border-orange-300 text-orange-400 hover:bg-orange-300 hover:text-white transition-all duration-300 text-lg md:text-xl font-DanaMedium px-8 mt-6 md:mt-10 rounded-full shadow-lg shadow-orange-300/10"
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>دریافت مشاوره و ثبت سفارش</span>
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}
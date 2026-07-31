"use client";

import React from "react";
import dynamic from "next/dynamic";

const Typewriter = dynamic(() => import("typewriter-effect"), {
  ssr: false,
});

export default function HomeBackGround() {
  return (
    <section
      className="
        home
        relative
        min-h-[250px]
        md:min-h-screen
        overflow-hidden
        md:pl-20
        
      "
    >
      <video
        className="absolute inset-0 w-full h-full object-cover -z-10"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/imges/woman.mp4" type="video/mp4" />
      </video>


      <div className="container h-full min-h-[420px] md:min-h-screen flex justify-end items-center">
        <div className="text-white text-right max-w-[220px] md:max-w-none">
          <h2 className="font-Morabba font-bold text-2xl lg:text-6xl/[62px] mb-2 min-h-[70px] md:min-h-[1.2em]">
            <Typewriter
              options={{
                strings: [
                  "سفری به دنیای رایحه‌های اصیل",
                  "تجربه عطر‌های اورجینال و خاص",
                  "امضای شخصی شما اینجاست",
                ],
                autoStart: true,
                loop: true,
                pauseFor: 3000,
                delay: 75,
                deleteSpeed: 50,
              }}
            />
          </h2>

          <span className="font-Morabba font-light text-xl lg:text-5xl/[64px]">
            جادوی ماندگاری
          </span>

          <span className="block w-[100px] h-px md:h-0.5 bg-orange-300 my-3"></span>

          <p className="max-w-[220px] md:max-w-[460px] text-xs lg:text-2xl leading-relaxed">
            ما در مجموعه نفحات، گلچینی از برترین عطرهای جهان را
            برای شما گردآوری کرده‌ایم تا رایحه اختصاصی خود را پیدا کنید.
          </p>
        </div>
      </div>

      <svg className="hidden md:inline-block absolute bottom-0 left-0 right-0 mx-auto w-[100px] h-[22px] text-gray-100 dark:text-zinc-800">
        <use href="#curve"></use>
      </svg>

      <div className="hidden md:flex absolute bottom-0 left-0 right-0 mx-auto translate-y-2/4 items-center justify-center w-[30px] h-[30px] border-2 border-orange-300 rounded-full bg-white dark:bg-zinc-800">
        <svg className="w-4 h-4 text-zinc-700 dark:text-white -rotate-90">
          <use href="#chevron-left"></use>
        </svg>
      </div>
    </section>
  );
}

import Image from 'next/image'
export default function Footer() {
  return (
    <div dir="rtl">
    <footer className="relative bg-zinc-700 py-8 md:py-11">
      <svg className="hidden md:inline-block absolute top-0 left-0 right-0 mx-auto w-[100px] h-[22px] text-gray-100 dark:text-zinc-800">
        <use href="#curve-footer"></use>
      </svg>

      <div className="hidden md:flex absolute top-0 left-0 right-0 mx-auto -translate-y-2/4 items-center justify-center w-[30px] h-[30px] border-2 border-orange-300 rounded-full">
        <svg className="w-4 h-4 text-zinc-700 dark:text-white rotate-90">
          <use href="#chevron-down"></use>
        </svg>
      </div>

      <div className="text-gray-300 sm:w-[94%] lg:w-[90%] px-4 md:px-0 mx-auto min-h-[500px]">
        <div className="flex justify-between flex-wrap">
          <div>
<div className="flex gap-x-5 mb-6 md:mb-4 text-gray-300">
  <Image
    src="/imges/svgs/logo2.png" 
    alt="لوگوی نفحات"
    width={200}
    height={200}
    className="rounded-3xl" 
  />
</div>
            <p className="xl:max-w-[606px] text-lg md:text-xl /[48px]">

«نفحات بر آن است تا با تلفیق هنر اصیل عطرسازی و استانداردهای جهانی، تعریفی نو از ادکلن ایرانی ارائه دهد. هدف ما تنها تولید یک محصول نیست، بلکه خلق یک خاطره‌ی ماندگار و تبدیل شدن به مرجع فرهنگِ رایحه در ایران است. ما مشتاقانه می‌کوشیم تا با تکیه بر کیفیت بی‌نقص، اعتبار و شکوه کالای لوکس ایرانی را در ذهن‌ها تثبیت کنیم.»

            </p>
          </div>

          <div className="mt-10 md:mt-[26px]">
            <h4 className="font-Dana font-semibold text-2xl text-white mb-6 md:mb-7">
              دسترسی سریع
            </h4>
            <div className="grid grid-cols-2 gap-y-2.5 md:gap-y-5 gap-x-10 md:gap-x-16">
              <a
                href=""
                className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transi"
              >
                <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                حریم خصوصی
              </a>
              <a
                href=""
                className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transi"
              >
                <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                عودت کالا
              </a>
              <a
                href=""
                className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transi"
              >
                <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                ثبت سفارش
              </a>
              <a
                href=""
                className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transi"
              >
                <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                پرسش های متداول
              </a>
              <a
                href=""
                className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transi"
              >
                <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                شرایط استفاده
              </a>
              <a
                href=""
                className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transi"
              >
                <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                فرصت های شغلی
              </a>
              <a
                href=""
                className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transi"
              >
                <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                ضمانت نامه ها
              </a>
              <a
                href=""
                className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transi"
              >
                <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                ارتباط با ما
              </a>
            </div>
          </div>

          <div className="mt-10 md:mt-[26px]">
            <h4 className="font-Dana font-semibold text-2xl text-white mb-6 md:mb-7">
              در تماس باشیم
            </h4>

            <div>
              <div className="md:text-xl mb-6 md-mb-10">
                <span className="flex items-center gap-x-2 md:gap-x-3 mb-4 md:mb-5">
                  <svg className="w-5 h-5 md:w-6 md:h-6 shrink-0">
                    <use href="#map-pin"></use>
                  </svg>
                  بلوار میرداماد-خ البرز-کوچه ی قبادیان شرقی-پلاک 33
                </span>

                <div className="flex flex-wrap gap-x-5 gap-y-4 font-Dana font-medium">
                  <a
                    href=""
                    className="flex items-center gap-x-2 md:gap-x-3 text-orange-300"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6">
                      <use href="#envelop"></use>
                    </svg>
                    info@nafahat.com
                  </a>

                  <div className="flex items-center gap-x-2 md:gap-x-3">
                    <svg className="w-5 h-5 md:w-6 md:h-6">
                      <use href="#phone"></use>
                    </svg>
                    <span className="ltr-text">09127777777</span>
                    <span className="ltr-text">021-44444444</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-x-1.5 md:gap-x-6 ltr-text font-Dana font-medium md:text-xl">
<a
  href="https://www.instagram.com/nafahat.perfume?igsh=MWJicmppc2trYmZrdA=="
  target="_blank"
  rel="noopener noreferrer"
  className="flex flex-grow justify-center items-center gap-x-2 h-12 rounded-xl text-zinc-700 bg-gradient-to-r from-orange-200 to-orange-300"
>
  @nafahat.perfume
  <svg className="w-[26px] h-[26px] md:w-[38px] md:h-[38px]">
    <use href="#instagram"></use>
  </svg>
</a>
                <a
                  href="https://t.me/Sahraei1"
                  className="flex flex-grow justify-center items-center gap-x-2 h-12 border border-orange-200 rounded-xl"
                >
                  @nafahat-perfume
                  <svg className="w-[26px] h-[26px] md:w-[38px] md:h-[38px]">
                    <use href="#telegram"></use>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>


<div className="flex flex-col md:flex-row justify-between items-center gap-y-4 font-Dana font-medium text-lg md:text-xl border-t border-t-white/10 pt-10 md:pt-11 mt-10 md:mt-11 text-gray-400" dir="rtl">

  <div className="ltr-text text-gray-500 text-lg md:text-xl order-last md:order-first" dir="ltr">
    Built pixel by pixel by Mahsa ❤️
  </div>
  <div className="flex items-center gap-x-2.5">
   
    <div className="flex items-center justify-center shrink-0 w-[30px] h-[30px] border border-white/10 rounded-full">
      <div className="flex items-center justify-center w-5 h-5 border border-white/20 rounded-full">
        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-t from-orange-200 to-orange-300"></div>
      </div>
    </div>

    <p className="flex items-center flex-wrap">
      <span>
        ©️
        کلیه حقوق مادی و معنوی سایت برای  </span>
      <span className="text-orange-200 mx-1">نفحات</span>
      <span>محفوظ است.</span>
    </p>
  </div>



</div>
      </div>
    </footer>
    </div>

  );
}

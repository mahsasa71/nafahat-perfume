
"use client";
import { FaFacebookF, FaStar, FaTwitter, FaRegStar, FaTelegram, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { TbSwitch3 } from "react-icons/tb";
import Breadcrumb from "./Breadcrumb";
import AddToWishlist from "./AddToWishlist";
import { useState } from "react";
import { showSwal } from "@/utils/helpers";

const Details = ({ product, user }) => {
  const [count, setCount] = useState(1);

  const addToCart = () => {
   
    if (product.inventory === 0) {
      return showSwal("این محصول در حال حاضر موجود نیست", "error", "فهمیدم");
    }

    const cartKey = user ? `cart_${user._id}` : "cart_guest";
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const existingProduct = cart.find((item) => item.id === product._id);

    if (existingProduct) {
     
      if (existingProduct.count + count > product.inventory) {
        return showSwal(`حداکثر موجودی این محصول ${product.inventory} عدد است`, "warning", "اصلاح تعداد");
      }
      existingProduct.count += count;
    } else {
      cart.push({
        id: product._id,
        name: product.name,
        price: product.price,
  image: (product.images && product.images.length > 0) ? product.images[0] : product.img,

        count,
      });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdate"));
    showSwal("محصول با موفقیت به سبد خرید اضافه شد", "success", "فهمیدم");
  };

  return (
    <main className="w-full lg:w-[83%] font-Dana" dir="rtl">
      <Breadcrumb title={product.name} />
      <h2 className="text-2xl font-DanaBold mt-4 text-zinc-800 dark:text-white">{product.name}</h2>

      <div className="flex gap-[2px] mt-8">
        <div className="flex gap-[2px]">
          {new Array(product.score).fill(0).map((_, index) => (
            <FaStar key={index} className="text-orange-400 text-[1.4rem]" />
          ))}
          {new Array(5 - product.score).fill(0).map((_, index) => (
            <FaRegStar key={index} className="text-orange-400 text-[1.4rem]" />
          ))}
        </div>
        <p className="text-gray-400 text-sm">(دیدگاه {product.comments.length} کاربر)</p>
      </div>

      <p className="text-[#34180E] dark:text-orange-200 text-[1.5rem] font-DanaBold mt-6 mb-6">
        {product.price.toLocaleString("fa-IR")} تومان
      </p>

      <span className="text-[15px] block w-[93%] text-[#A09797] leading-7">
        {product.shortDescription}
      </span>

      <hr className="my-6 border-gray-100 dark:border-white/10" />

      <div className="flex items-center gap-[5px] mb-[50px]">
        <IoCheckmark className={`text-[1.5rem] ${product.inventory === 0 ? "hidden" : "text-emerald-600"}`} />
        <p className="text-zinc-700 dark:text-gray-200">
          {product.inventory === 0 ? (

            <span className="text-red-600 font-DanaBold">اتمام موجودی</span>
          ) : product.inventory === 1 ? (
            <span className="text-orange-500 font-bold">تنها یک عدد در انبار باقی مانده</span>
          ) : (
            "موجود در انبار"
          )}
        </p>
      </div>

      <div className="flex flex-row-reverse justify-end items-center gap-[10px] mb-[20px] text-center">
        <button
          onClick={addToCart}
          disabled={product.inventory === 0}
          className={`px-[1.2rem] py-[0.85rem] transition-all duration-200 border-0 font-DanaMedium outline-none ${
            product.inventory === 0 
              ? "bg-gray-400 cursor-not-allowed text-white/80" 
              : "bg-[#008979] hover:bg-[#711D1C] text-white cursor-pointer"
          }`}
        >
          {product.inventory === 0 ? "اتمام موجودی" : "افزودن به سبد خرید"}
        </button>

   
        {product.inventory > 0 && (
          <div className="w-[80px] flex items-center justify-between border border-gray-400 h-[48px]">
            <span
              onClick={() => count < product.inventory && setCount(count + 1)}
              className="w-1/3 cursor-pointer py-2 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              +
            </span>
            <span className="w-1/3 border-x border-zinc-400 py-2 text-zinc-700 dark:text-white">
              {count}
            </span>
            <span
              onClick={() => setCount((prev) => (prev > 1 ? prev - 1 : 1))}
              className="w-1/3 cursor-pointer py-2 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              -
            </span>
          </div>
        )}
      </div>

      <section className="flex gap-[20px] mb-[30px]">
        <AddToWishlist productID={product._id} user={user} />
        <div className="flex gap-[3px] items-center group cursor-pointer">
          <TbSwitch3 className="text-[1.3rem] group-hover:text-gray-500 transition-colors" />
          <a href="/" className="text-sm transition-all duration-200 group-hover:text-gray-500">
            مقایسه
          </a>
        </div>
      </section>

      <hr className="border-gray-100 dark:border-white/10" />

      <div className="flex flex-col gap-[15px] mt-[30px] text-zinc-700 dark:text-gray-300">
        <strong className="text-sm text-zinc-800 dark:text-white">شناسه محصول: {product._id}</strong>
        <p className="text-sm">
          <strong className="text-zinc-800 dark:text-white ml-1">برچسب:</strong>
          {product.tags.join(" ,")}
        </p>
      </div>

      <div className="flex items-center gap-[8px] mt-[2rem]">
        <p className="text-sm text-zinc-700 dark:text-white">به اشتراک گذاری: </p>
        <div className="flex gap-2 text-zinc-500 dark:text-gray-400 text-[1.3rem]">
          <a href="/" className="hover:text-sky-500 transition-colors"><FaTelegram /></a>
          <a href="/" className="hover:text-blue-700 transition-colors"><FaLinkedinIn /></a>
          <a href="/" className="hover:text-red-600 transition-colors"><FaPinterest /></a>
          <a href="/" className="hover:text-sky-400 transition-colors"><FaTwitter /></a>
          <a href="/" className="hover:text-blue-800 transition-colors"><FaFacebookF /></a>
        </div>
      </div>

      <hr className="my-8 border-gray-100 dark:border-white/10" />
    </main>
  );
};

export default Details;
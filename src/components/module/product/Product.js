"use client"
import Link from "next/link";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiSearch, CiHeart } from "react-icons/ci";
import { useRouter } from "next/navigation";

const Card = ({ _id, name, price, img, images }) => {
const router = useRouter();
  const mainImage = (images && images.length > 0) 
    ? images[0] 
    : (img || "https://set-coffee.com/wp-content/uploads/2021/10/041-430x430.png");

  return (
    <div onClick={() => router.push(`/product/${_id}`)} className="group relative w-full pt-5 text-black " dir="rtl ">
      
      <div className="relative overflow-hidden rounded-lg">
    
        <img
          src={mainImage}
          alt={name}
          className="w-full h-[250px] md:h-[312px] object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />

       
        <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"></div>

        
        <div className="absolute top-3 -left-10 flex flex-col gap-3 z-20 transition-all duration-300 group-hover:left-3 invisible group-hover:visible text-white text-2xl">
          
          <div className="relative flex items-center gap-x-2 group/item">
            <Link href={`/product/${_id}`} className="hover:text-orange-400">
              <CiSearch />
            </Link>
            <span className="absolute right-full mr-2 opacity-0 group-hover/item:opacity-100 bg-black text-white text-[10px] px-2 py-1 rounded whitespace-nowrap transition-opacity">
              مشاهده سریع
            </span>
          </div>

          <div className="relative flex items-center gap-x-2 group/item">
            <CiHeart className="cursor-pointer hover:text-red-500" />
            <span className="absolute right-full mr-2 opacity-0 group-hover/item:opacity-100 bg-black text-white text-[10px] px-2 py-1 rounded whitespace-nowrap transition-opacity">
              افزودن به علاقه‌مندی‌ها
            </span>
          </div>
        </div>

      
        <button className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full group-hover:bottom-1/2 group-hover:translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 bg-transparent border border-white text-white px-4 py-2 rounded text-sm whitespace-nowrap hover:bg-white hover:text-black">
         <Link href={`/product/${_id}`} className="hover:text-orange-400">
                 مشاهده محصول
         </Link>

        </button>
      </div>

      
      <div className="flex flex-col gap-y-1 pt-3 text-center items-center">
        <Link href={`/product/${_id}`} className="font-DanaMedium text-zinc-700 hover:text-orange-500 transition-colors">
          {name}
        </Link>

        
        <div className="flex flex-row-reverse justify-center gap-x-0.5 text-orange-400">
          <FaStar size={14} />
          <FaStar size={14} />
          <FaStar size={14} />
          <FaRegStar size={14} />
          <FaRegStar size={14} />
        </div>

      
        <span className="text-[#34180e] font-DanaDemiBold mt-1">
          {price?.toLocaleString("fa-IR")} تومان
        </span>
      </div>
    </div>
  );
};

export default Card;
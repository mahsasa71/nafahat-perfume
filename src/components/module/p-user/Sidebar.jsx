
"use client";
import { useState } from "react";
import { ImReply } from "react-icons/im";
import { FaComments, FaHeart, FaShoppingBag, FaUsers, FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineAttachMoney, MdSms, MdLogout } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import swal from "sweetalert";

const Sidebar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();

  // const logoutHandler = () => {
  //   swal({
  //     title: "آیا از خروج اطمینان دارید؟",
  //     icon: "warning",
  //     buttons: ["نه", "آره"],
  //   }).then(async (result) => {
  //     if (result) {
  //       const res = await fetch("/api/auth/signout", { method: "POST" });
  //       if (res.status === 200) {
  //         router.replace("/");
  //       }
  //     }
  //   });
  // };

  const isActive = (href) => path === href;

  const linkClass = (href) => `
    flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-300
    ${isActive(href) 
      ? "bg-white text-[#711d1c] shadow-lg opacity-100 font-shabnam-Bold" 
      : "text-black opacity-70 hover:bg-white/10 hover:opacity-100"}
  `;


  const logoutHandler = () => {
  swal({
    title: "آیا از خروج اطمینان دارید؟",
    icon: "warning",
    buttons: ["نه", "آره"],
  }).then(async (result) => {
    if (result) {
   
      const cartKey = user ? `cart_${user._id}` : "cart_guest";
      const discountKey = user ? `discount_${user._id}` : "discount_guest";

      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });

      if (res.status === 200) {
localStorage.removeItem("cart"); 
localStorage.removeItem("discountPercent");


window.dispatchEvent(new Event("cartUpdate"));

swal({
  title: "با موفقیت خارج شدید",
  icon: "success",
  buttons: "فهمیدم",
}).then(() => {

  window.location.href = "/"; 
});
      }
    }
  });
};

  return (
    <>
    
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed top-4 right-4 z-[60] p-3 bg-orange-300 text-black rounded-full shadow-2xl border border-white/20"
        >
          <FaBars size={20} />
        </button>
      )}

    
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

   
      <aside className={`
        fixed lg:sticky top-0 right-0 h-screen bg-orange-300 text-black z-[80]
        transition-all duration-300 ease-in-out shadow-2xl lg:shadow-none
        w-[280px] md:w-[320px] lg:w-[300px] xl:w-[350px]
        ${isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
      `}>

      
        <button 
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-5 left-5 text-white/80 hover:text-white"
        >
          <FaTimes size={24} />
        </button>

        <div className="flex flex-col h-full p-6 font-shabnam">
         
          <div className="text-center mt-4 pb-8 border-b border-white/10">
            <div className="w-16 h-16 bg-white/10 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold">
              {user?.name?.charAt(0) || "U"}
            </div>
            <p className="text-lg">خوش اومدی <span className="font-shabnam-Bold text-black">{user?.name || "عزیز"}</span></p>
            <p className=" text-black mt-1 bg-amber-50 rounded-lg">{path.includes("/p-admin") ? "پنل مدیریت" : "پنل کاربری"}</p>
          </div>

          
          <ul className="flex flex-col gap-2 py-8 overflow-y-auto flex-1 no-scrollbar">
            {path.includes("/p-user") ? (
              <>
                <Link onClick={() => setIsOpen(false)} href="/p-user" className={linkClass("/p-user")}><ImReply size={20}/> پیشخوان</Link>

                <Link onClick={() => setIsOpen(false)} href="/p-user/orders" className={linkClass("/p-user/orders")}><FaShoppingBag size={18}/> سفارش‌ها</Link>
                <Link onClick={() => setIsOpen(false)} href="/p-user/tickets" className={linkClass("/p-user/tickets") }><MdSms size={20}/> تیکت‌های پشتیبانی</Link>
                {/* <Link onClick={() => setIsOpen(false)} href="/p-user/comments" className={linkClass("/p-user/comments")}><FaComments size={20}/> کامنت‌ها</Link> */}
                <Link onClick={() => setIsOpen(false)} href="/p-user/wishlist" className={linkClass("/p-user/wishlist")}><FaHeart size={18}/> علاقه‌مندی</Link>
                <Link onClick={() => setIsOpen(false)} href="/p-user/account-details" className={linkClass("/p-user/account-details")}><TbListDetails size={20}/> جزئیات اکانت</Link>
              </>
            ) : (
              <>
                <Link onClick={() => setIsOpen(false)} href="/p-admin" className={linkClass("/p-admin")}><ImReply size={20}/> پیشخوان</Link>
                <Link onClick={() => setIsOpen(false)} href="/p-admin/products" className={linkClass("/p-admin/products")}><FaShoppingBag size={18}/> محصولات</Link>
                <Link onClick={() => setIsOpen(false)} href="/p-admin/users" className={linkClass("/p-admin/users")}><FaUsers size={20}/> کاربران</Link>
                {/* <Link onClick={() => setIsOpen(false)} href="/p-admin/comments" className={linkClass("/p-admin/comments")}><FaComments size={20}/> کامنت‌ها</Link> */}
                <Link onClick={() => setIsOpen(false)} href="/p-admin/tickets" className={linkClass("/p-admin/tickets")}><MdSms size={20}/> تیکت‌ها</Link>
                <Link onClick={() => setIsOpen(false)} href="/p-admin/discount" className={linkClass("/p-admin/discount")}><MdOutlineAttachMoney size={20}/> تخفیفات</Link>
              </>
            )}
          </ul>

       
          <div 
            onClick={logoutHandler}
            className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between flex-row-reverse cursor-pointer group hover:text-orange-200 transition-all"
          >
            <MdLogout size={26} className="group-hover:translate-x-1 transition-transform" />
            <span className="text-xl font-shabnam-Bold">خروج</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
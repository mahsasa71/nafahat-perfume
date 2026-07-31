"use client";

import React, { useState, useContext } from "react";
import Link from "next/link";
import swal from "sweetalert";
import { usePathname, useRouter } from "next/navigation";



export default function SideBar() {
  const [open, setOpen] = useState(false);
    const path = usePathname();
  const router = useRouter();

  // const logoutHandler = () => {
  //   swal({
  //     title: "آیا از خروج اطمینان دارید؟",
  //     icon: "warning",
  //     buttons: ["نه", "آره"],
  //   }).then(async (result) => {
  //     if (result) {
  //       const res = await fetch("/api/auth/signout", {
  //         method: "POST",
  //       });

  //       if (res.status === 200) {
  //         swal({
  //           title: "با موفقیت از اکانت خارج شدین",
  //           icon: "success",
  //           buttons: "فهمیدم",
  //         }).then((result) => {
  //           router.replace("/");
  //         });
  //       }
  //     }
  //   });
  // };
  // const { user } = useContext(AuthContext);


const logoutHandler = () => {
  swal({
    title: "آیا از خروج اطمینان دارید؟",
    icon: "warning",
    buttons: ["نه", "آره"],
  }).then(async (result) => {
    if (result) {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });

      if (res.status === 200) {
        // ۱. پاک کردن سبد خرید و کد تخفیف از حافظه مرورگر
        localStorage.removeItem("cart");
        localStorage.removeItem("discountPercent");

        window.dispatchEvent(new Event("cartUpdate"));

        swal({
          title: "با موفقیت از اکانت خارج شدین",
          icon: "success",
          buttons: "فهمیدم",
        }).then(() => {
         
          router.replace("/");
          router.refresh(); 
        });
      }
    }
  });
};

  return (
    <>
      
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 right-4 z-50 bg-gray-800 text-white p-2 rounded-lg shadow-lg"
      >
        <div className="flex flex-col gap-1">
          <span className="block w-5 h-0.5 bg-white"></span>
          <span className="block w-5 h-0.5 bg-white"></span>
          <span className="block w-5 h-0.5 bg-white"></span>
        </div>
      </button>

      
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setOpen(false)}
      />

      
      <aside
        className={`
          fixed top-0 right-0 bottom-0 w-64 bg-gray-800 shadow-lg z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
          md:static md:translate-x-0 md:w-1/6 text-white
          md:flex md:flex-col md:min-h-screen
        `}
      >
        <div className="flex flex-col h-full">
          
          <div className="flex items-center justify-between md:hidden p-4 border-b border-gray-700">
            <span className="font-bold text-white">منو</span>
            <button
              onClick={() => setOpen(false)}
              className="text-white text-xl font-bold"
            >
              ✕
            </button>
          </div>

         
          {/* {user && user.isLoggedIn && ( */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-700">
              {/* <img
                src={user.avatar || "https://cdn.vectorstock.com/i/1000v/23/81/profile-icon-grey-placeholder-vector-18942381.jpg"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-green-500"
              /> */}
              {/* <div>
                <p className="text-white font-semibold">{user.name || user.firstName}</p>
                <p className="text-green-400 text-sm">مدیر</p>
              </div> */}
            </div>
          {/* )} */}

         
          <nav className="flex-1 overflow-auto p-4 flex flex-col gap-2">
            <Link
              href="/p-admin/mainPage"
              className="hover:bg-gray-700 hover:text-white p-2 rounded-md transition"
              onClick={() => setOpen(false)}
            >
              🏠 صفحه اصلی
            </Link>

            <Link
              href="/p-admin/products"
              className="hover:bg-gray-700 hover:text-white p-2 rounded-md transition"
              onClick={() => setOpen(false)}
            >
              📦 محصولات
            </Link>

            <Link
              href="/p-admin/orders"
              className="hover:bg-gray-700 hover:text-white p-2 rounded-md transition"
              onClick={() => setOpen(false)}
            >
              🧾 سفارشات
            </Link> 


            <Link
              href="/p-admin/tickets"
              className="hover:bg-gray-700 hover:text-white p-2 rounded-md transition"
              onClick={() => setOpen(false)}
            >
              تیکت‌ها
            </Link>

            <Link
              href="/p-admin/users"
              className="hover:bg-gray-700 hover:text-white p-2 rounded-md transition"
              onClick={() => setOpen(false)}
            >
              👤 کاربران
            </Link>


                        <Link
             href="/p-admin/comments"
              className="hover:bg-gray-700 hover:text-white p-2 rounded-md transition"
              onClick={() => setOpen(false)}
            >
              💭 کامنت محصولات
            </Link>



{/* 
                        <Link
              href="/p-admin/articleComments"
              className="hover:bg-gray-700 hover:text-white p-2 rounded-md transition"
              onClick={() => setOpen(false)}
            >
              💭 کامنت مقالات
            </Link> */}

            
                        <Link
              href="/p-admin/discounts"
              className="hover:bg-gray-700 hover:text-white p-2 rounded-md transition"
              onClick={() => setOpen(false)}
            >
            🎁 کد تخفیفات 
            </Link>

                                    {/* <Link
              href="/p-admin/adminArticle"
              className="hover:bg-gray-700 hover:text-white p-2 rounded-md transition"
              onClick={() => setOpen(false)}
            >
            ✍ مقالات 
            </Link>
 */}



          </nav>
        </div>
              <div  onClick={logoutHandler}>
        {/* <MdLogout /> */}
        خروج
      </div>
      </aside>
    </>
  );
}

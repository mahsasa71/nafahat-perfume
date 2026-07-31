"use client";
import React from "react";
import Link from "next/link";
import Ticket from "./Ticket";
import { FaPlus, FaFilter } from "react-icons/fa";

function Tickets({ tickets }) {
  return (
    <main className="px-4 md:px-8 font-shabnam pb-10">

      <div className="relative mt-8 mb-10 flex items-center justify-between">
        <h1 className="relative z-10 bg-white pr-4 pl-10 text-2xl md:text-3xl font-medium text-black">
          <span>همه تیکت‌ها</span>
        </h1>

        <Link 
          href="/p-user/tickets/sendTicket" 
          className="relative z-10 flex items-center gap-2 bg-white text-[#711d1c] border border-[#711d1c] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#711d1c] hover:text-white transition-all shadow-sm"
        >
          <FaPlus size={12} />
          ارسال تیکت جدید
        </Link>

      
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#711d1c] shadow-[0_1px_0_0_#711d1c] z-0 w-full"></div>
      </div>

    
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
  
        <div className="bg-white p-4 rounded-xl shadow-sm border-b-4 border-[#711d1c] text-center">
          <p className="text-gray-500 text-sm">پاسخ داده شده</p>
          <span className="text-xl font-bold text-[#711d1c]">۰</span>
        </div> 
       
      </div>

     
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-end gap-6 mb-10 bg-gray-50 p-6 rounded-2xl border border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400 mr-2">نوع تیکت</label>
            <select className="bg-white px-4 py-3 border-b-2 border-[#711d1c] outline-none rounded-t-lg text-sm focus:bg-white transition-colors">
              <option>همه</option>
              <option>فرستاده شده</option>
              <option>دریافتی</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400 mr-2">وضعیت</label>
            <select className="bg-white px-4 py-3 border-b-2 border-[#711d1c] outline-none rounded-t-lg text-sm focus:bg-white transition-colors">
              <option>همه</option>
              <option>باز</option>
              <option>بسته</option>
              <option>پاسخ داده شده</option>
              <option>پایان یافته</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400 mr-2">مرتب‌سازی</label>
            <select className="bg-white px-4 py-3 border-b-2 border-[#711d1c] outline-none rounded-t-lg text-sm focus:bg-white transition-colors">
              <option>تاریخ پاسخ</option>
              <option>تاریخ ایجاد</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          className="bg-[#711d1c] text-white px-10 py-3 rounded-xl hover:bg-[#5a1716] transition-all shadow-md flex items-center justify-center gap-2"
        >
          <FaFilter size={14} />
          اعمال فیلتر

        </button>
      </div>

      
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <Ticket key={ticket._id} {...ticket} />
        ))}
      </div>

      
      {tickets.length === 0 && (
        <div className="w-full py-12 rounded-2xl bg-[#711d1c]/10 border border-[#711d1c]/20 text-center mt-10">
          <p className="text-[#711d1c] text-lg font-medium">تیکتی وجود ندارد ✉️</p>
          <Link href="/p-user/tickets/sendTicket" className="text-sm underline mt-2 block opacity-70">اولین تیکت خود را ثبت کنید</Link>
        </div>
      )}
    </main>
  );
}

export default Tickets;

"use client";
import React, { useState } from "react";
import { showSwal } from "@/utils/helpers";
import { FaEye, FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";

export default function DataTable({ orders, title }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("all");


  const getStatusText = (status) => {
    switch (status) {
      case "pending": return "در انتظار";
      case "deposit": return "پرداخت شده";
      case "done": return "تکمیل شده";
      default: return "نامشخص";
    }
  };


  const getStatusStyle = (status) => {
    switch (status) {
      case "pending": return "bg-red-100 text-red-600 border-red-200";
      case "deposit": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "done": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };


  const processedOrders = orders
    .filter((order) => {
      const nameMatch = order.username?.toLowerCase().includes(searchTerm.toLowerCase());
      const idMatch = order.orderID?.toString().includes(searchTerm);
      const statusMatch = statusFilter === "all" || order.status === statusFilter;
      return (nameMatch || idMatch) && statusMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest": return b._id.toString().localeCompare(a._id.toString());
        case "oldest": return a._id.toString().localeCompare(b._id.toString());
        case "expensive": return b.totalPrice - a.totalPrice;
        case "cheapest": return a.totalPrice - b.totalPrice;
        default: return 0;
      }
    });

  const showOrderItems = (items) => {
    const text = items
      .map((item) => `${item.name} (تعداد: ${item.count})`)
      .join("\n");
    showSwal(text, undefined, "بستن");
  };

  return (
    <div className="w-full font-shabnam pb-10">
      
      <div className="relative mt-8 mb-12 flex items-center">
        <h2 className="relative z-10 bg-white pr-4 pl-10 text-2xl md:text-3xl font-medium text-black">
          <span>{title}</span>
        </h2>
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#711d1c] shadow-[0_1px_0_0_#711d1c] z-0 w-[95%] mx-auto"></div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 px-4">
        <div className="relative">
          <FaFilter className="absolute right-3 top-3.5 text-gray-400 text-xs" />
          <select 
            className="w-full pr-9 pl-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#711d1c] shadow-sm text-sm cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">همه وضعیت‌ها</option>
            <option value="pending">در انتظار</option>
            <option value="deposit">پرداخت شده</option>
            <option value="done">تکمیل شده</option>
          </select>
        </div>

        <div className="relative">
          <FaSortAmountDown className="absolute right-3 top-3.5 text-gray-400 text-xs" />
          <select 

            className="w-full pr-9 pl-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#711d1c] shadow-sm text-sm cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">جدیدترین</option>
            <option value="oldest">قدیمی‌ترین</option>
            <option value="expensive">گران‌ترین</option>
            <option value="cheapest">ارزان‌ترین</option>
          </select>
        </div>

        <div className="relative">
          <FaSearch className="absolute right-3 top-3.5 text-gray-400 text-xs" />
          <input
            type="text"
            placeholder="جستجوی نام یا شناسه..."
            className="w-full pr-9 pl-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#711d1c] shadow-sm text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

   
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden mx-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-[#f2f7fd]">
              <tr className="text-black">
                <th className="px-6 py-4 text-center text-sm font-bold whitespace-nowrap">ردیف</th>
                <th className="px-6 py-4 text-center text-sm font-bold whitespace-nowrap">شناسه</th>
                <th className="px-6 py-4 text-center text-sm font-bold whitespace-nowrap">مشتری</th>
                <th className="px-6 py-4 text-center text-sm font-bold whitespace-nowrap">شماره تماس</th>
                <th className="px-6 py-4 text-center text-sm font-bold whitespace-nowrap">مبلغ کل</th>
                <th className="px-6 py-4 text-center text-sm font-bold whitespace-nowrap">وضعیت</th>
                <th className="px-6 py-4 text-center text-sm font-bold whitespace-nowrap">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {processedOrders.length > 0 ? (
                processedOrders.map((order, index) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-center text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 text-center text-sm font-mono text-gray-600">{order.orderID}</td>
                    <td className="px-6 py-4 text-center text-sm font-shabnam-Bold">{order.username}</td>
                    <td className="px-6 py-4 text-center text-sm dir-ltr">{order.phone}</td>
                    <td className="px-6 py-4 text-center text-sm font-shabnam-Bold text-[#711d1c]">
                      {new Intl.NumberFormat("fa-IR").format(order.totalPrice)} <span className="text-[10px]">تومان</span>
                    </td>
                    <td className="px-6 py-4 text-center text-nowrap">
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${getStatusStyle(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => showOrderItems(order.items)}
                        className="bg-black text-white text-xs px-4 py-2 rounded-md hover:bg-[#711d1c] transition-all active:scale-95 whitespace-nowrap"
                      >
                        مشاهده سبد
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-20 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">

                      <span className="text-3xl">🔍</span>
                      <p>هیچ سفارشی پیدا نشد</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
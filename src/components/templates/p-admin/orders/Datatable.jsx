
"use client";
import React, { useState } from "react";
import styles from "@/styles/p-user/dataTable.module.css";
import { showSwal } from "@/utils/helpers";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import moment from "moment-jalaali";

export default function DataTable({ orders, title }) {
  const router = useRouter();

 
  const todayDate = moment().format("jYYYY/jMM/jDD");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all"); 

  const processedOrders = orders
    .filter((order) => {
      const nameMatch = order.username?.toLowerCase().includes(searchTerm.toLowerCase());
      const idMatch = order.orderID?.toString().includes(searchTerm);
      const statusMatch = statusFilter === "all" || order.status === statusFilter;

      let dateMatch = true;
      const orderDate = order.createdAt?.split(" - ")[0];

      if (dateFilter === "today") {
        dateMatch = orderDate === todayDate;
      } else if (dateFilter === "past") {
        dateMatch = orderDate !== todayDate;
      }

      return (nameMatch || idMatch) && statusMatch && dateMatch;
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

  const getStatusText = (status) => {
    switch (status) {
      case "pending": return "در انتظار";
      case "deposit": return "پرداخت شده";
      case "done": return "تکمیل شده";
      case "denied": return "مردود"; // وضعیت جدید
      default: return "نامشخص";
    }
  };

  const handleChangeStatus = async (orderId, currentStatus) => {
    const { value: newStatus } = await Swal.fire({
      title: "تغییر وضعیت سفارش",
      input: "radio",
      inputOptions: {
        pending: "در انتظار",
        deposit: "پرداخت شده",
        done: "تکمیل شده",
        denied: "مردود",
      },
      inputValue: currentStatus,
      confirmButtonText: "به‌روزرسانی",
      cancelButtonText: "انصراف",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return "باید یک وضعیت را انتخاب کنید!";
      },
    });

    if (newStatus && newStatus !== currentStatus) {
      try {
        const res = await fetch("/api/orders", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: orderId, status: newStatus }),
        });

        if (res.ok) {
          Swal.fire("موفقیت", "وضعیت به‌روزرسانی شد", "success").then(() => {
            router.refresh();
          });
        }
      } catch (err) {
        Swal.fire("خطا", "مشکلی در اتصال به سرور پیش آمد", "error");
      }
    }
  };

  return (

    <div className="font-Dana">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className={styles.title}><span>{title}</span></h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 px-4">
          <input
            type="text"
            placeholder="جستجوی نام یا شماره..."
            className="p-2 border border-gray-300 rounded-lg outline-none focus:border-brown-500 shadow-sm text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select 
            className="p-2 border border-gray-300 rounded-lg outline-none bg-white cursor-pointer focus:border-brown-500 shadow-sm text-sm font-Dana"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="all">همه تاریخ‌ها</option>
            <option value="today">فقط سفارشات امروز</option>
            <option value="past">سفارشات روزهای قبل</option>
          </select>

          <select 
            className="p-2 border border-gray-300 rounded-lg outline-none bg-white cursor-pointer focus:border-brown-500 shadow-sm text-sm font-Dana"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">همه وضعیت‌ها</option>
            <option value="pending">در انتظار</option>
            <option value="deposit">پرداخت شده</option>
            <option value="done">تکمیل شده</option>
            <option value="denied">مردود شده</option>
          </select>

          <select 
            className="p-2 border border-gray-300 rounded-lg outline-none bg-white cursor-pointer focus:border-brown-500 shadow-sm text-sm font-Dana"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">جدیدترین</option>
            <option value="oldest">قدیمی‌ترین</option>
            <option value="expensive">گران‌ترین</option>
            <option value="cheapest">ارزان‌ترین</option>
          </select>

          <div className="flex items-center justify-center bg-gray-100 rounded-lg text-xs text-gray-500 font-bold font-sans">
             امروز: {todayDate}
          </div>
        </div>
      </div>

      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ردیف</th>
              <th>شناسه</th>
              <th>مشتری</th>
              <th>شماره تماس</th>
              <th>تاریخ</th>
              <th>مبلغ</th>
              <th>وضعیت</th>
              <th>جزئیات</th>
            </tr>
          </thead>
          <tbody>
            {processedOrders.length > 0 ? (
              processedOrders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.orderID}</td>
                  <td className="font-bold">{order.username}</td>
                  <td className="ltr text-left font-sans">{order.phone}</td>
                  <td className="text-xs">{order.createdAt}</td>
                  <td className="font-bold">
                    {new Intl.NumberFormat("fa-IR").format(order.totalPrice)} 
                    <span className="text-[10px] font-normal mr-1">تومان</span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleChangeStatus(order._id, order.status)}
                      className={`
                        px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 cursor-pointer hover:shadow-md min-w-[95px]
                        ${order.status === "pending" ? "bg-red-500 text-white hover:bg-red-600" : ""}
                        ${order.status === "deposit" ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-500" : ""}

                        ${order.status === "done" ? "bg-green-500 text-white hover:bg-green-600" : ""}
                        ${order.status === "denied" ? "bg-black text-white hover:bg-gray-800" : ""}
                      `}
                    >
                      {getStatusText(order.status)}
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => showOrderItems(order.items)} className={styles.btn}>
                      مشاهده سبد
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-20 text-gray-500 bg-gray-50">
                   هیچ سفارشی یافت نشد 🔍
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
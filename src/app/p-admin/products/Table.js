"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { HiOutlinePencilAlt, HiOutlineTrash, HiSearch } from "react-icons/hi";

export default function DataTable({ products, title, onEdit }) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  const deleteHandler = async (id) => {
    swal({
      title: "آیا از حذف محصول اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "بله"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
        if (res.status === 200) {
          swal("محصول با موفقیت حذف شد", { icon: "success" });
          router.refresh();
        }
      }
    });
  };


  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      let matchesStock = true;
      if (stockFilter === "available") matchesStock = product.inventory > 0;
      if (stockFilter === "unavailable") matchesStock = product.inventory <= 0;
      return matchesSearch && matchesStock;
    })
    .sort((a, b) => {
      if (sortOrder === "expensive") return b.price - a.price;
      if (sortOrder === "cheapest") return a.price - b.price;
      return 0;
    });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 border-r-4 border-brown-600 pr-3">
          {title}
        </h1>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative">
            <HiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="جستجوی نام..."
              className="pr-10 pl-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown-500/20 focus:border-brown-500 transition-all w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="bg-gray-50 border border-gray-200 text-gray-600 py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown-500/20"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
          >
            <option value="all">همه موجودی‌ها</option>
            <option value="available">فقط موجود</option>
            <option value="unavailable">ناموجودها</option>
          </select>

          <select
            className="bg-gray-50 border border-gray-200 text-gray-600 py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown-500/20"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">مرتب‌سازی قیمت</option>
            <option value="expensive">گران‌ترین</option>
            <option value="cheapest">ارزان‌ترین</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm uppercase">
              <th className="p-4 font-semibold">#</th>
              <th className="p-4 font-semibold">نام محصول</th>
              <th className="p-4 font-semibold">قیمت (تومان)</th>
              <th className="p-4 font-semibold">وضعیت انبار</th>
              <th className="p-4 font-semibold text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="p-4 text-gray-400 font-medium">{index + 1}</td>
                  <td className="p-4 font-semibold text-gray-700">
                    {product.name}
                  </td>
                  <td className="p-4 text-gray-600 tabular-nums">
                    {product.price?.toLocaleString("fa-IR")}
                  </td>
                  <td className="p-4">
                    {product.inventory > 0 ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                        {product.inventory} عدد
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">
                        ناموجود
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onEdit(product)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-sm"
                      >
                        <HiOutlinePencilAlt /> ویرایش
                      </button>
                      <button
                        onClick={() => deleteHandler(product._id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all text-sm"
                      >
                        <HiOutlineTrash /> حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="p-10 text-center text-gray-400 italic"
                >
                  هیچ محصولی با این مشخصات پیدا نشد...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

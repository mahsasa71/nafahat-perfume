
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import swal from "sweetalert";

export default function DataTable({ users, title }) {
  const router = useRouter();


  const editUser = async (user) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div class="flex flex-col gap-4 text-right font-Dana" style="direction: rtl;">
        <div class="flex flex-col gap-1">
          <label class="text-[10px] text-gray-400">نام و نام خانوادگی</label>
          <input id="swal-name" class="p-2 border rounded-md text-sm outline-none focus:border-orange-400 w-full" value="${user.name}">
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-[10px] text-gray-400">ایمیل</label>
          <input id="swal-email" class="p-2 border rounded-md text-sm outline-none focus:border-orange-400 w-full" value="${user.email || ''}">
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-[10px] text-gray-400">شماره تماس</label>
          <input id="swal-phone" class="p-2 border rounded-md text-sm outline-none focus:border-orange-400 w-full" value="${user.phone || ''}">
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-[10px] text-gray-400 text-rose-500">تغییر رمز عبور (در صورت نیاز)</label>
          <input id="swal-password" type="text" class="p-2 border rounded-md text-sm outline-none focus:border-rose-400 w-full" placeholder="رمز جدید را وارد کنید">
        </div>
      </div>
    `;

    swal({
      title: "ویرایش اطلاعات کاربر",
      content: wrapper,
      buttons: ["انصراف", "ذخیره تغییرات"],
    }).then(async (willSave) => {
      if (willSave) {
        const name = document.getElementById('swal-name').value;
        const email = document.getElementById('swal-email').value;
        const phone = document.getElementById('swal-phone').value;
        const password = document.getElementById('swal-password').value;

        const res = await fetch("/api/user", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: user._id, name, email, phone, password }),
        });

        if (res.status === 200) {
          swal("اطلاعات با موفقیت آپدیت شد", { icon: "success" });
          router.refresh();
        }
      }
    });
  };

 
  const changeRole = async (userID) => {
    const res = await fetch("/api/user/role", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userID }),
    });
    if (res.status === 200) {
      swal("نقش کاربر تغییر یافت", { icon: "success" }).then(() => router.refresh());
    }
  };


  const removeUser = async (userID) => {
    swal({
      title: "آیا از حذف مطمئن هستید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
      dangerMode: true,
    }).then(async (result) => {
      if (result) {
        const res = await fetch("/api/user", {
          method: "DELETE",

          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: userID }),
        });
        if (res.status === 200) {
          swal("کاربر حذف شد", { icon: "success" }).then(() => router.refresh());
        }
      }
    });
  };


  const banUser = async (email, phone) => {
    swal({
      title: "آیا از بن کردن مطمئن هستید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
      dangerMode: true,
    }).then(async (result) => {
      if (result) {
        const res = await fetch("/api/user/ban", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, phone }),
        });
        if (res.status === 200) {
          swal("کاربر بن شد", { icon: "success" }).then(() => router.refresh());
        }
      }
    });
  };

  return (
    <div className="mt-8 font-Dana">
      <div className="mb-6 border-r-4 border-orange-400 pr-4">
        <h1 className="text-xl font-DanaMedium text-zinc-700">{title}</h1>
      </div>

      <div className="overflow-x-auto bg-white shadow-sm rounded-xl border border-gray-100">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-gray-50 text-zinc-600 text-sm h-14 border-b">
              <th className="p-3">شناسه</th>
              <th className="p-3 text-right pr-6">نام</th>
              <th className="p-3">نقش</th>
              <th className="p-3">عملیات</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {users.map((user, index) => (
              <tr key={user._id} className="h-16 hover:bg-gray-50 border-b last:border-0 transition-colors">
                <td className="p-3 text-gray-400">{index + 1}</td>
                <td className="p-3 text-right pr-6 font-DanaMedium text-zinc-700">{user.name}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-md text-[10px] ${user.role === 'ADMIN' ? 'bg-amber-100 text-amber-600' : 'bg-sky-100 text-sky-600'}`}>
                    {user.role === 'ADMIN' ? 'مدیر' : 'کاربر'}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center justify-center gap-x-2">

                 
                    <button 
                      onClick={() => editUser(user)} 
                      className="text-amber-600 hover:bg-amber-50 px-2 py-1 rounded transition-colors text-xs"
                    >
                      ویرایش
                    </button>

                    <button 
                      onClick={() => changeRole(user._id)} 
                      className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-[11px] hover:bg-indigo-600 hover:text-white transition-all"
                    >
                      تغییر نقش
                    </button>

                    <button 
                      onClick={() => removeUser(user._id)} 
                      className="bg-rose-50 text-rose-600 px-3 py-1.5 rounded-lg text-[11px] hover:bg-rose-600 hover:text-white transition-all"
                    >
                      حذف
                    </button>

                    <button 
                      onClick={() => banUser(user.email, user.phone)} 
                      className="bg-zinc-800 text-white px-3 py-1.5 rounded-lg text-[11px] hover:bg-black transition-all"
                    >
                      بن
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import { FaUserEdit, FaCloudUploadAlt, FaKey, FaSave } from "react-icons/fa";
import swal from "sweetalert";

function AccountDetails({ user }) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [password, setPassword] = useState("");

  const updateUser = async () => {
    
    if (!name.trim() || !email.trim() || !phone.trim()) {
      return swal({
        title: "لطفا تمام فیلدها را پر کنید",
        icon: "error",
        button: "تلاش مجدد",
      });
    }

  
    const userNewInfos = { 
      name, 
      email, 
      phone,
   
      ...(password.trim() && { password }) 
    };

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userNewInfos),
      });

      if (res.status === 200) {
        swal({
          title: "اطلاعات با موفقیت آپدیت شد",
          text: "به دلیل تغییر اطلاعات امنیتی، لطفا دوباره وارد شوید",
          icon: "success",
          buttons: "فهمیدم",
        }).then(async () => {
      
          await fetch("/api/auth/signout", { method: "POST" });
          location.replace("/login-register");
        });
      } else {
        const errorData = await res.json();
        swal({
          title: errorData.message || "خطایی رخ داد",
          icon: "error",
        });
      }
    } catch (err) {
      console.error("Update Error:", err);
      swal({
        title: "اتصال به سرور برقرار نشد",
        icon: "error",
      });
    }
  };
  return (
    <main className="px-4 md:px-10 font-shabnam pb-20">
     
      <div className="relative mt-8 mb-12 flex items-center justify-between">
        <h1 className="relative z-10 bg-white pr-4 pl-10 text-2xl md:text-3xl font-medium text-black flex items-center gap-3">
          <FaUserEdit className="text-[#711d1c]" />
          <span>جزئیات حساب کاربری</span>
        </h1>
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#711d1c] shadow-[0_1px_0_0_#711d1c] z-0 w-full"></div>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        
        <section className="relative flex flex-col md:flex-row items-center gap-10 bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="relative group">
           
            <img 
              src="/images/shahin.jpg" 
              alt="Profile" 
              className="w-48 h-48 rounded-full object-cover border-4 border-[#711d1c] shadow-xl transition-transform group-hover:scale-105"
            />
        
            <div className="absolute -left-4 top-4 w-10 h-[2px] bg-[#711d1c] rotate-[327deg] hidden md:block"></div>
            <div className="absolute -left-6 top-8 w-16 h-[2px] bg-[#711d1c] rotate-[327deg] hidden md:block"></div>
          </div>

          <div className="flex-1 w-full space-y-4">
            <label className="text-lg font-bold text-gray-700">تصویر پروفایل</label>
            <div className="relative w-full">
              <button className="w-full md:w-max flex flex-row-reverse items-center justify-center gap-3 bg-[#711d1c] text-white px-8 py-3 rounded-xl hover:bg-[#5a1716] transition-all shadow-lg">
                <FaCloudUploadAlt size={20} />
                تغییر عکس پروفایل
              </button>
            
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <p className="text-xs text-gray-400">فرمت‌های مجاز: JPG, PNG (حداکثر ۲ مگابایت)</p>
          </div>
        </section>

      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <section className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-600 mr-2">نام و نام خانوادگی:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}

                className="w-full p-3 bg-white border-[3px] border-[#711d1c] rounded-xl outline-none focus:shadow-[0_0_10px_rgba(113,29,28,0.2)] transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-600 mr-2">شماره تماس:</label>

<input
  type="text"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 bg-white border-[3px] border-[#711d1c] rounded-xl outline-none focus:shadow-[0_0_10px_rgba(113,29,28,0.2)] transition-all"

  placeholder="شماره تماس"
/>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-600 mr-2">آدرس ایمیل:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-white border-[3px] border-[#711d1c] rounded-xl outline-none focus:shadow-[0_0_10px_rgba(113,29,28,0.2)] transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-600 mr-2">تغییر رمز عبور:</label>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="رمز عبور جدید..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 bg-white border-[3px] border-[#711d1c] rounded-xl outline-none focus:shadow-[0_0_10px_rgba(113,29,28,0.2)] transition-all"
                />
                <button 
                  type="button"
                  onClick={() => {
                    if(password.length < 8) return swal("رمز عبور کوتاه است");
                    swal("تغییرات ثبت شد");
                  }}
                  className="bg-[#711d1c] text-white px-4 rounded-xl hover:bg-[#5a1716] transition-all flex items-center justify-center shrink-0"
                >
                  <FaKey />
                </button>
              </div>
            </div>
          </section>
        </div>

        
        <div className="flex justify-center md:justify-start pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={updateUser}
            className="flex flex-row-reverse items-center gap-3 bg-[#711d1c] text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-[#5a1716] transform hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#711d1c]/20"
          >
            <FaSave size={20} />
            ثبت تمامی تغییرات
          </button>
        </div>
      </div>
    </main>
  );
}

export default AccountDetails;
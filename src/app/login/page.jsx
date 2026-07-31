"use client";
import React, { useState, useEffect } from "react";

import Link from "next/link";
import Sms from "@/components/templates/sms/Sms";
import { showSwal } from "@/utils/helpers";
import { valiadteEmail, valiadtePassword,  valiadtePhone, } from "@/utils/auth";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter();
  const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);
  const [password, setPassword] = useState("");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // const [bgVideo, setBgVideo] = useState("");

  // const videos = [
  //   "/videos/istockphoto-1456403364-640_adpp_is.mp4",
  //   "/videos/istockphoto-2127141846-640_adpp_is.mp4",
  //   "/videos/istockphoto-2166047393-640_adpp_is.mp4",
  //   "/videos/istockphoto-2225123086-640_adpp_is.mp4",
  //   "/videos/istockphoto-2235456018-640_adpp_is.mp4",
  //   "/videos/istockphoto-474755905-640_adpp_is.mp4",
  //   "/videos/istockphoto-483458564-640_adpp_is.mp4",
  //   "/videos/istockphoto-931483672-640_adpp_is.mp4",
  //   "/videos/istockphoto-1131356109-640_adpp_is.mp4",
  //   "/videos/istockphoto-1174203292-640_adpp_is.mp4",
  //   "/videos/istockphoto-1191381422-640_adpp_is.mp4",
  //   "/videos/istockphoto-1220457062-640_adpp_is.mp4",
  //   "/videos/istockphoto-1289025969-640_adpp_is.mp4",
  //   "/videos/istockphoto-1304265771-640_adpp_is.mp4",
  //   "/videos/istockphoto-1363097178-640_adpp_is.mp4",
  //   "/videos/istockphoto-1426726401-640_adpp_is.mp4",
  //   "/videos/istockphoto-1472056813-640_adpp_is.mp4",
  //   "/videos/istockphoto-1749437522-640_adpp_is.mp4",
  //   "/videos/istockphoto-1966354548-640_adpp_is.mp4",
  //   "/videos/istockphoto-2148698786-640_adpp_is.mp4",
  //   "/videos/istockphoto-2197803084-640_adpp_is.mp4",
  //   "/videos/istockphoto-2225123086-640_adpp_is.mp4",
  //   "/videos/istockphoto-2180388788-640_adpp_is.mp4",
  //   "/videos/istockphoto-2180388788-640_adpp_is.mp4",
  //   "/videos/istockphoto-2180388788-640_adpp_is.mp4",
  //   "/videos/istockphoto-1426625999-640_adpp_is.mp4",
  //   "/videos/istockphoto-496962216-640_adpp_is.mp4",
  //   "/videos/istockphoto-637744234-640_adpp_is.mp4",
  // ];

  // useEffect(() => {
  //   const randomVideo = videos[Math.floor(Math.random() * videos.length)];
  //   setBgVideo(randomVideo);
  // }, []);

  const hideOtpForm = () => setIsLoginWithOtp(false);

  const loginWithPassword = async () => {
    if (!phoneOrEmail) {
      return showSwal("لطفا شماره تماس یا ایمیل را وارد کنید", "error", "چشم");
    }

    const isValidEmail = valiadteEmail(phoneOrEmail);
    if (!isValidEmail) {
      return showSwal("ایمیل وارد شده صحیح نیست", "error", "تلاش مجدد");
    }

    if (!password) {
      return showSwal("پسورد را وارد کنید", "error", "تلاش مجدد");
    }

    const isValidPassword = valiadtePassword(password);
    if (!isValidPassword) {
      return showSwal("پسورد به اندازه کافی قوی نیست", "error", "تلاش مجدد");
    }

    const user = { email: phoneOrEmail, password };

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await res.json();

    if (res.status === 200) {
      swal({
        title: "با موفقیت لاگین شدین",
        icon: "success",
        buttons: "ورود به پنل کاربری",
      }).then(() => {
        router.replace("/");
      });
    } else if (res.status === 422 || res.status === 401) {
      showSwal("کاربری با این اطلاعات یافت نشد", "error", "تلاش مجدد");
    } else if (res.status === 419) {
      showSwal("ایمیل یا پسورد صحیح نیست", "error", "تلاش مجدد");
    }
  };

  const sendOtp = async () => {
  const isValidPhone = valiadtePhone(phoneOrEmail);

  if (!isValidPhone) {
    return showSwal(
      "شماره تماس وارد شده معتبر نیست",
      "error",
      "تلاش مجدد"
    );
  }

  const res = await fetch("/api/auth/sms/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
body: JSON.stringify({
  phone: phoneOrEmail,
  type: "login",
}),
  });

  if (res.status === 201) {
    swal({
      title: "کد ورود با موفقیت ارسال شد",
      icon: "success",
      buttons: "رفتن به صفحه اصلی",
    }).then(() => {
      setIsLoginWithOtp(true);
    });
  } else if (res.status === 422) {
    showSwal(
      "کاربری با این شماره یافت نشد",
      "error",
      "تلاش مجدد"
    );
  }
};
  return (
    <>
      {!isLoginWithOtp ? (
        <div className="relative w-full h-screen overflow-hidden">
          
            <video
              src="/imges/spray4.mp4"
              autoPlay
              loop
              muted
              className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />
      
          {/* <img src="/imges/spray.jpg" className="absolute top-0 left-0 w-full h-full object-cover z-0" alt="" /> */}

          <div
            className="relative z-10 flex items-center justify-center min-h-screen"
            dir="rtl"
          >
            <div
              className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-6 space-y-4 relative z-10"
              autoComplete="off"
            >
              <h2 className="text-2xl font-bold text-center text-white">
                ورود به حساب
              </h2>
              <input
                type="text"
                value={phoneOrEmail}
                onChange={(event) => setPhoneOrEmail(event.target.value)}
                className="w-full px-4 py-2 border border-orange-300 rounded-lg text-left placeholder:text-white focus:ring-2 focus:ring-orange-300 focus:outline-none bg-transparent text-white"
                placeholder="ایمیل/شماره موبایل"
              />
              <div className="relative">
                <input
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="رمز عبور"
                  name="password"
                  required
                  className="w-full px-4 py-2 border border-orange-300 rounded-lg text-left placeholder:text-white focus:ring-2 focus:ring-orange-300 focus:outline-none bg-transparent text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-white hover:text-orange-200"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <button
                type="submit"
  className="w-full py-2 bg-orange-300 text-center  font-semibold rounded-lg hover:bg-orange-400 transition text-black/70"
                onClick={loginWithPassword}
              >
                ورود
              </button>
              <div className="flex items-center gap-2">
                  <hr className="flex-grow border-orange-300" />
              <span className="text-white font-bold ">یا</span>
              <hr className="flex-grow border-orange-300 " />
              </div>
<button
  className="w-full py-2 bg-orange-300 text-center font-semibold rounded-lg hover:bg-orange-400 transition text-black/70"
  onClick={sendOtp}
>
  ورود با کد یکبار مصرف
</button>
              <p                 className="w-full t py-2 bg-orange-300 text-black/70 text-center text-now font-semibold rounded-lg hover:bg-orange-400 transition"
>
                            در صورت فراموشی رمز عبور به شماره ی 09011289066 پیام دهید...
          
</p>
  
              <div className="flex items-center gap-2">
                  <hr className="flex-grow border-orange-300" />
              <span className="text-white font-bold ">یا</span>
              <hr className="flex-grow border-orange-300 " />
              </div>
            <p className=" text-white">اکانت ندارید؟
<Link href={"/register"} className="mr-0.5 hover:bg-amber-50 hover:text-black py-3 px-1 rounded-lg">ثبت نام کنید</Link></p>
            </div>
          </div>
        </div>
      ) : (
<Sms
  hideOtpForm={hideOtpForm}
  phone={phoneOrEmail}
  type="login"
/>
      )}
    </>
  );
}

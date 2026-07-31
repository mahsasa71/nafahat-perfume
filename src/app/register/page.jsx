"use client"
import React, { useState, useEffect } from "react";
import Sms from "@/components/templates/sms/Sms";
import Link from "next/link";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { showSwal } from "@/utils/helpers";
import { valiadteEmail, valiadtePassword, valiadtePhone } from "@/utils/auth";
export default function Register() {
    const router = useRouter();
  const [isRegisterWithPass, setIsRegisterWithPass] = useState(true);
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hideOtpForm = () => setIsRegisterWithOtp(false);

  const signUp = async () => {
    if (!name.trim()) {
      return showSwal("نام را وارد بکنید", "error", "تلاش مجدد");
    }

    const isValidPhone = valiadtePhone(phone);
    if (!isValidPhone) {
      return showSwal("شماره تماس وارد شده معتبر نیست", "error", "تلاش مجدد ");
    }

    if (email) {
      const isValidEmail = valiadteEmail(email);
      if (!isValidEmail) {
        return showSwal("ایمیل وارد شده معتبر نیست", "error", "تلاش مجدد ");
      }
    }

    const isValidPassword = valiadtePassword(password);
    if (!isValidPassword) {
      return showSwal("پسورد وارد شده قابل حدس هست", "error", "تلاش مجدد ");
    }

    const user = { name, phone, email, password };

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

  if (res.status === 201) {
  swal({
    title: "ثبت نام با موفقیت انجام شد",
    icon: "success",
    buttons: "ورود به صفحه اصلی",
  }).then(() => {
    router.replace("/");
  });
} else if (res.status === 422) {
      showSwal("کاربری با این اطلاعات از قبل وجود دارد", "error", "تلاش مجدد");
    }
  };

  const sendOtp = async () => {
    const isValidPhone = valiadtePhone(phone);
    if (!isValidPhone) {
      return showSwal("شماره تماس وارد شده معتبر نیست", "error", "تلاش مجدد ");
    }

    const res = await fetch("/api/auth/sms/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
body: JSON.stringify({
  phone,
  type: "register",
}),
    });

    if (res.status === 201) {
      swal({
        title: "کد ورود با موفقیت Sms شد",
        icon: "success",
        buttons: "رفتن به صفحه",
      }).then(() => {
        setIsRegisterWithOtp(true);
      });
    } else if (res.status === 422) {
      swal({
        title: "این شماره تماس قبلا ثبت نام شده",
        icon: "error",
        buttons: "لاگین می‌کنم",
      }).then(() => {
        // showloginForm();
      });
    }
  };

  const [bgVideo, setBgVideo] = useState("");


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
//   "/videos/istockphoto-637744234-640_adpp_is.mp4"
// ];


  // useEffect(() => {
  //   const randomVideo = videos[Math.floor(Math.random() * videos.length)];
  //   setBgVideo(randomVideo);
  // }, []);



  
  return (
    <>
    
        <div className="relative w-full h-screen overflow-hidden">
    

        <video
          src="/imges/woman2.mp4"
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
  

    {/* <img src="/imges/spray.jpg" className="absolute top-0 left-0 w-full h-full object-cover z-0" alt="" /> */}
       {!isRegisterWithOtp ? (
      <div className="relative z-10 flex items-center justify-center min-h-screen " dir="rtl">
        
          <div
            className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-6 space-y-4 relative z-10"

autoComplete="off"
          >
            <h2 className="text-2xl font-bold text-center">
              ثبت‌ نام
            </h2>



            <input
              className="w-full px-4 font-bold  text-black py-2 border border-orange-300 rounded-lg  focus:ring-2 focus:ring-orange-300 focus:outline-none"
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              placeholder="نام"
            />



                        <input
              className="w-full px-4 font-bold  text-black py-2 border border-orange-300 rounded-lg  focus:ring-2 focus:ring-orange-300 focus:outline-none"
              type="text"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="شماره موبایل  "
            />
 

                        <input
              className="w-full px-4 font-bold  text-black py-2 border border-orange-300 rounded-lg  focus:ring-2 focus:ring-orange-300 focus:outline-none"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="ایمیل (دلخواه)"
            />


                        {isRegisterWithPass && (
              <input
              className="w-full px-4 font-bold  text-black py-2 border border-orange-300 rounded-lg  focus:ring-2 focus:ring-orange-300 focus:outline-none"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="رمز عبور"
              />
            )}

<p
  style={{ marginTop: "1rem", cursor: "pointer" }}
  className="w-full py-2 bg-orange-300 text-center  font-semibold rounded-lg hover:bg-orange-400 transition text-black/70"
  onClick={sendOtp} 
>
  ثبت نام با کد تایید
</p>
            <button
              style={{ marginTop: ".7rem" }}
                                        className="w-full py-2 bg-orange-300 text-black/70 font-semibold rounded-lg hover:bg-orange-400 transition"

              onClick={() => {
                if (isRegisterWithPass) {
                  signUp();
                } else {
                  setIsRegisterWithPass(true);
                }
              }}
            
            >
              ثبت نام با رمزعبور
            </button>
                         <div className="flex items-center gap-2">
                  <hr className="flex-grow border-orange-300" />
              <span className="text-black/70 font-bold ">یا</span>
              <hr className="flex-grow border-orange-300 " />
            </div>
            <p className="font-bold text-black/70">قبلا ثبت نام کرده اید ؟ 
<Link href={"/login"} className="mr-0.5 hover:bg-amber-50 py-3 px-1 rounded-lg">وارد شوید</Link></p>

          </div>

        
      </div>
            ) : (
   <Sms
  hideOtpForm={hideOtpForm}
  phone={phone}
  type="register"
/>
      )}
    </div>
      
    </>

  );
}

"use client";
import { useState } from "react";
import { showSwal } from "@/utils/helpers";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import styles from "./sms.module.css";

const Sms = ({ hideOtpForm, phone, type }) => {
  const router = useRouter();
  const [code, setCode] = useState("");

  const verifyCode = async (e) => {
    e.preventDefault();

    const body = {
      phone,
      code,
      type,
    };

    const res = await fetch("/api/auth/sms/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.status === 409) {
      return showSwal("کد وارد شده معتبر نیست", "error", "تلاش مجدد");
    }

    if (res.status === 410) {
      return showSwal("کد وارد شده منقضی شده", "error", "تلاش مجدد");
    }

    if (res.status === 200) {
      swal({
        title:
          type === "login"
            ? `خوش آمدید ${data.user.name}`
            : "ثبت نام شما با موفقیت انجام شد",
        icon: "success",
     
      }).then(() => {
        router.replace("/");
      });
    }
  };

  return (
    <>
      <video
        src="/imges/spray4.mp4"
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      <div
        className="relative z-10 flex items-center justify-center min-h-screen"
        dir="rtl"
      >
        <form
          onSubmit={verifyCode}
          className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-6 space-y-4 relative z-10"
          autoComplete="off"
        >
          <h2 className="text-2xl font-bold text-center text-white">
            کد تایید
          </h2>

          <span className="text-2xl text-center text-white">
            لطفاً کد تأیید ارسال شده را تایپ کنید
          </span>

          <span className={styles.number}>{phone}</span>

          <input
            className="w-full px-4 py-2 border border-orange-300 rounded-lg text-left placeholder:text-white focus:ring-2 focus:ring-orange-300 focus:outline-none bg-transparent text-white"
            type="text"
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />

          <button
            type="submit"
            className="w-full py-2 bg-orange-300 text-black font-semibold rounded-lg hover:bg-orange-400 transition"
          >
            ثبت کد تایید
          </button>

          <p className="text-white">ارسال مجدد کد یکبار مصرف</p>

          <p
            onClick={hideOtpForm}
            className="text-white text-center cursor-pointer"
          >
            لغو
          </p>
        </form>
      </div>
    </>
  );
};

export default Sms;
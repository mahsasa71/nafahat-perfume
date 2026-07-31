"use client";
import { IoMdStar } from "react-icons/io";
import { useEffect, useState } from "react";
import { showSwal } from "@/utils/helpers";

const CommentForm = ({ productID }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [score, setScore] = useState(5);
  const [isSaveUserInfo, setIsSaveUserInfo] = useState(false);

  const setCommentScore = (newScore) => {
    setScore(newScore);
    showSwal("امتیاز شما با موفقیت ثبت شد", "success", "ادامه ثبت کامنت");
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setUsername(userInfo.username || "");
      setEmail(userInfo.email || "");
    }
  }, []);

  const submitComment = async () => {
    if (!username || !email || !body) {
      return showSwal("لطفاً تمام فیلدهای ستاره‌دار را پر کنید", "error", "تلاش مجدد");
    }

    if (isSaveUserInfo) {
      localStorage.setItem("userInfo", JSON.stringify({ username, email }));
    }

    const comment = { username, email, body, score, productID };

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    });

    if (res.status === 201) {
      showSwal("کامنت مورد نظر با موفقیت ثبت شد", "success", "فهمیدم");
      setBody(""); 
    }
  };

  return (
    <div className="w-full font-Dana text-zinc-700 dark:text-zinc-200">
      <h3 className="text-lg font-DanaMedium mb-2">دیدگاه خود را بنویسید</h3>
      <p className="text-sm opacity-70 mb-6">
        نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
        <span className="text-red-500">*</span>
      </p>

  
      <div className="flex items-center gap-4 mb-8">
        <p className="text-sm md:text-base">امتیاز شما :</p>
        <div className="flex flex-row-reverse gap-1 text-xl group">
          {[5, 4, 3, 2, 1].map((num) => (
            <IoMdStar
              key={num}
              onClick={() => setCommentScore(num)}
              className={`cursor-pointer transition-colors duration-200 
                ${score >= num ? "text-orange-400" : "text-gray-300"} 
                hover:text-orange-400 peer peer-hover:text-orange-400`}
            />
          ))}
        </div>
      </div>


      <div className="flex flex-col gap-2 mb-6">
        <label className="text-sm md:text-base">
          دیدگاه شما <span className="text-red-500"></span>
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="6"
          className="w-full p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 outline-none focus:border-zinc-500 transition-all"
          placeholder="نظرتان را اینجا بنویسید..."
        ></textarea>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm md:text-base">
            نام <span className="text-red-500"></span>
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"

            className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 outline-none focus:border-zinc-500 transition-all"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm md:text-base">
            ایمیل <span className="text-red-500">*</span>
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 outline-none focus:border-zinc-500 transition-all"
          />
        </div>
      </div>

     
      <div className="flex items-start gap-3 mb-8">
        <input
          type="checkbox"
          id="save-info"
          checked={isSaveUserInfo}
          onChange={() => setIsSaveUserInfo(!isSaveUserInfo)}
          className="mt-1.5 w-4 h-4 cursor-pointer accent-zinc-800"
        />
        <label htmlFor="save-info" className="text-xs md:text-sm leading-6 opacity-80 cursor-pointer">
          ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی می‌نویسم.
        </label>
      </div>

  
      <button
        onClick={submitComment}
        className="w-full md:w-40 py-3 bg-zinc-800 dark:bg-orange-400 text-white dark:text-zinc-900 rounded-full font-DanaMedium hover:bg-zinc-700 dark:hover:bg-orange-300 transition-all shadow-lg"
      >
        ثبت دیدگاه
      </button>
    </div>
  );
};

export default CommentForm;
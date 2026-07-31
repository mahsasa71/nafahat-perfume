
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { showSwal } from "@/utils/helpers";
import swal from "sweetalert";

export default function DataTable({ comments, title }) {
  const router = useRouter();

  const showCommentBody = (body) => {
    showSwal(body, undefined, "خوندم");
  };

  const acceptComment = async (commentID) => {
    const res = await fetch("/api/comments/accept", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: commentID }),
    });

    if (res.status === 200) {
      swal({
        title: "کامنت مورد نظر با موفقیت تایید شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => router.refresh());
    }
  };

  const rejectComment = async (commentID) => {
    const res = await fetch("/api/comments/reject", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: commentID }),
    });

    if (res.status === 200) {
      swal({
        title: "کامنت مورد نظر با موفقیت رد شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => router.refresh());
    }
  };

  const removeComment = async (id) => {
    swal({
      title: "آیا از حذف اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await fetch("/api/comments", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        if (res.status === 200) {
          swal("کامنت با موفقیت حذف شد", { icon: "success" });
          router.refresh();
        }
      }
    });
  };

  const answerToComment = async (id, currentAnswer) => {
    swal({
      title: "پاسخ خود را بنویسید:",
      content: {
        element: "input",
        attributes: {
          placeholder: "متن پاسخ...",
          value: currentAnswer || "", // نمایش پاسخ قبلی در صورت وجود
        },
      },
      buttons: "ثبت پاسخ",
    }).then(async (answerText) => {
      // اگر کاربر کنسل نکرد (مقدار null نبود)
      if (answerText !== null) {
        const res = await fetch("/api/comments", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, answer: answerText }),
        });

        if (res.status === 200) {
          swal("پاسخ با موفقیت ثبت/ویرایش شد", { icon: "success" });
          router.refresh();
        }
      }
    });
  };

  return (
    <div className="mt-8 font-Dana">
      <div className="mb-6 border-r-4 border-orange-400 pr-4">
        <h1 className="text-xl font-bold text-zinc-700">{title}</h1>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-100">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-gray-50 text-zinc-600 text-sm h-14 border-b">
              <th className="p-2">شناسه</th>
              <th className="p-2">کاربر</th>
              <th className="p-2">ایمیل</th>
              <th className="p-2">امتیاز</th>
              <th className="p-2">محصول</th>
              <th className="p-2">تاریخ</th>
              <th className="p-2">مشاهده</th>

              <th className="p-2">حذف</th>
              <th className="p-2">تایید/رد</th>
              <th className="p-2">پاسخ</th>
              <th className="p-2">بن</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {comments.map((comment, index) => (
              <tr key={comment._id} className="h-16 hover:bg-gray-50 border-b last:border-0 transition-colors">
                <td className="p-2">
                  <span className={`inline-block w-7 h-7 leading-7 rounded-full text-white text-[10px] ${comment.isAccept ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                    {index + 1}
                  </span>
                </td>
                <td className="p-2 font-medium">{comment.username}</td>
                <td className="p-2 text-gray-400 text-xs">{comment.email}</td>
                <td className="p-2 text-orange-400 font-bold">{comment.score}</td>
                <td className="p-2 text-zinc-600 text-xs">{comment.productID?.name}</td>
                <td className="p-2 text-gray-400 text-[10px]">{new Date(comment.date).toLocaleDateString("fa-IR")}</td>

                <td>
                  <button onClick={() => showCommentBody(comment.body)} className="bg-sky-100 text-sky-600 px-3 py-1 rounded-md hover:bg-sky-600 hover:text-white transition-all text-xs">
                    مشاهده
                  </button>
                </td>

                <td>
                  <button onClick={() => removeComment(comment._id)} className="bg-rose-100 text-rose-600 px-3 py-1 rounded-md hover:bg-rose-600 hover:text-white transition-all text-xs">
                    حذف
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => comment.isAccept ? rejectComment(comment._id) : acceptComment(comment._id)}
                    className={`px-3 py-1 rounded-md text-xs transition-all ${comment.isAccept ? 'text-orange-600 bg-orange-100 hover:bg-orange-600 hover:text-white' : 'text-emerald-600 bg-emerald-100 hover:bg-emerald-600 hover:text-white'}`}
                  >
                    {comment.isAccept ? "رد" : "تایید"}
                  </button>
                </td>

                <td>
                  <button 
                    onClick={() => answerToComment(comment._id, comment.answer)}
                    className="bg-teal-100 text-teal-600 px-3 py-1 rounded-md hover:bg-teal-600 hover:text-white transition-all text-xs"
                  >
                    {comment.answer ? "ویرایش" : "پاسخ"}
                  </button>
                </td>

                <td>
                  <button className="bg-zinc-800 text-white px-3 py-1 rounded-md hover:bg-black transition-all text-xs">
                    بن
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
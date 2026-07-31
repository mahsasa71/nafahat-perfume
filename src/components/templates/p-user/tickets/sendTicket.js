
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoIosSend } from "react-icons/io";
import { FaTicketAlt, FaPaperclip } from "react-icons/fa";
import swal from "sweetalert";

function SentTicket() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [departments, setDepartments] = useState([]);
  const [subDepartments, setSubDepartments] = useState([]);
  const [departmentID, setDepartmentID] = useState(-1);
  const [subDepartmentID, setSubDepartmentID] = useState(-1);
  const [priority, setPriority] = useState(1);

  useEffect(() => {
    const getDepartments = async () => {
      const res = await fetch("/api/departments");
      const data = await res.json();
      setDepartments([...data]);
    };
    getDepartments();
  }, []);

  useEffect(() => {
    const getSubDepartments = async () => {
      if (departmentID && departmentID !== "-1" && departmentID !== -1) {
        const res = await fetch(`/api/departments/sub/${departmentID}`);
        const data = await res.json();
        if (res.ok) setSubDepartments(data);
      } else {
        setSubDepartments([]);
      }
    };
    getSubDepartments();
  }, [departmentID]);

  const sendTicket = async () => {
    if (departmentID === -1 || subDepartmentID === -1 || !title || !body) {
      return swal({ title: "لطفاً تمامی فیلدها را پر کنید", icon: "error" });
    }

    const ticket = { title, body, department: departmentID, subDepartment: subDepartmentID, priority };

    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    });

    if (res.status === 201) {
      swal({
        title: "تیکت شما با موفقیت ثبت شد",
        icon: "success",
        buttons: "مشاهده تیکت‌ها",
      }).then(() => location.replace("/p-user/tickets"));
    }
  };

  return (
    <main className="px-4 md:px-8 font-shabnam pb-10">

      <div className="relative mt-8 mb-10 flex items-center justify-between">
        <h1 className="relative z-10 bg-white pr-2 pl-8 text-2xl md:text-3xl font-medium text-black flex items-center gap-2">
          <span>ارسال تیکت جدید</span>
        </h1>
        <Link 
          href="/p-user/tickets" 
          className="relative z-10 bg-white text-[#711d1c] border border-[#711d1c] px-4 py-1.5 rounded-full text-sm hover:bg-[#711d1c] hover:text-white transition-all"
        >
          همه تیکت‌ها
        </Link>
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#711d1c] shadow-[0_1px_0_0_#711d1c] z-0 w-full"></div>
      </div>

      <div className="space-y-6">
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium mr-1">دپارتمان را انتخاب کنید:</label>
            <select 
              className="w-full p-3 bg-white border-[3px] border-[#711d1c] rounded-lg outline-none text-sm shadow-sm"
              onChange={(e) => setDepartmentID(e.target.value)}
            >
              <option value={-1}>لطفا دپارتمان را انتخاب نمایید</option>
              {departments.map((dept) => <option key={dept._id} value={dept._id}>{dept.title}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium mr-1">نوع تیکت را انتخاب کنید:</label>

            <select 
              className="w-full p-3 bg-white border-[3px] border-[#711d1c] rounded-lg outline-none text-sm shadow-sm"
              onChange={(e) => setSubDepartmentID(e.target.value)}
            >
              <option value={-1}>لطفا یک مورد را انتخاب نمایید</option>
              {subDepartments.map((sub) => <option key={sub._id} value={sub._id}>{sub.title}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium mr-1">عنوان تیکت را وارد کنید:</label>
            <input
              type="text"
              placeholder="عنوان.."
              className="w-full p-3 bg-white border-[3px] border-[#711d1c] rounded-lg outline-none text-sm shadow-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium mr-1">سطح اولویت تیکت را انتخاب کنید:</label>
            <select 
              className="w-full p-3 bg-white border-[3px] border-[#711d1c] rounded-lg outline-none text-sm shadow-sm"
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value={-1}>لطفا یک مورد را انتخاب نمایید</option>
              <option value={1}>کم</option>
              <option value={2}>متوسط</option>
              <option value={3}>بالا</option>
            </select>
          </div>
        </div>

     
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium mr-1">محتوای تیکت را وارد نمایید:</label>
          <textarea
            className="w-full p-4 bg-white border-[3px] border-[#711d1c] rounded-xl outline-none text-sm shadow-sm resize-none"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
          ></textarea>
        </div>

       
        <div className="w-full bg-[#711d1c21] rounded-lg py-6 px-4 flex flex-col items-center gap-2 border-2 border-dashed border-[#711d1c]/30 text-[#711d1c]">
          <FaPaperclip className="text-xl mb-1" />
          <div className="flex flex-col md:flex-row gap-2 md:gap-8 text-xs font-medium">
            <span>حداکثر اندازه: ۶ مگابایت</span>
            <span>فرمت‌های مجاز: jpg, png, jpeg, rar, zip</span>
          </div>
          <input 
            type="file" 
            className="mt-4 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#711d1c] file:text-white hover:file:bg-[#5a1716] cursor-pointer"
          />
        </div>


        <button 
          onClick={sendTicket}
          className="flex items-center gap-2 bg-[#711d1c] text-white px-6 py-2.5 rounded-md hover:bg-[#5a1716] transition-all active:scale-95 shadow-md shadow-[#711d1c]/20 mb-10"
        >
          <IoIosSend className="text-xl" />
          <span>ارسال تیکت</span>
        </button>
      </div>
    </main>
  );
}

export default SentTicket;
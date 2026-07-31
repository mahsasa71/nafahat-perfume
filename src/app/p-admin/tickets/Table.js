
"use client";
import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import { showSwal } from "@/utils/helpers";
import swal from "sweetalert";

export default function DataTable({ tickets, title }) {
  const router = useRouter();

  const showTicketBody = (body) => {
    showSwal(body, undefined, "بستن");
  };

  const answerToTicket = async (ticket) => {
    let mainAnswerText = "";


    if (ticket.hasAnswer) {
      try {
        const res = await fetch(`/api/tickets/answer/${ticket._id}`);
        if (res.ok) {
          const answerData = await res.json();
          mainAnswerText = answerData.body; // متن قبلی استخراج شد
        }
      } catch (err) {
        console.error("Error fetching answer:", err);
      }
    }

  
    swal({
      title: ticket.hasAnswer ? "ویرایش پاسخ" : "ثبت پاسخ جدید",
      content: {
        element: "input",
        attributes: {
          defaultValue: mainAnswerText, 
          placeholder: "متن پاسخ خود را اینجا بنویسید...",
        },
      },
      buttons: ["لغو", "ثبت"],
    }).then(async (newAnswerValue) => {

      if (newAnswerValue !== null && newAnswerValue !== "") {
        const res = await fetch("/api/tickets/answer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: ticket.title,
            body: newAnswerValue,
            department: ticket.department._id || ticket.department,
            subDepartment: ticket.subDepartment._id || ticket.subDepartment,
            priority: ticket.priority,
            ticketID: ticket._id,
          }),
        });

        if (res.ok) {
          const result = await res.json();
          swal({ 
            title: result.message || "عملیات با موفقیت انجام شد", 
            icon: "success" 
          }).then(() => {
     
            router.refresh();
 
          });
        } else {
          swal({ title: "خطایی رخ داد!", icon: "error" });
        }
      }
    });
  };

  return (
    <div>
      <h1 className={styles.title}><span>{title}</span></h1>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کاربر</th>
              <th>عنوان</th>
              <th>دپارتمان</th>
              <th>وضعیت</th>
              <th>مشاهده</th>
              <th>پاسخ</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id}>
                <td>{index + 1}</td>
                <td>{ticket.user?.name || "نامشخص"}</td>
                <td>{ticket.title}</td>

                <td>{ticket.department?.title || "بدون دپارتمان"}</td>
                <td>
                  <span style={{ color: ticket.hasAnswer ? "green" : "red" }}>
                    {ticket.hasAnswer ? "پاسخ داده شده" : "بدون پاسخ"}
                  </span>
                </td>
                <td>
                  <button type="button" className={styles.edit_btn} onClick={() => showTicketBody(ticket.body)}>مشاهده</button>
                </td>
                <td>
                  <button 
                    type="button" 
                    className={ticket.hasAnswer ? styles.edit_btn : styles.delete_btn} 
                    onClick={() => answerToTicket(ticket)}
                  >
                    {ticket.hasAnswer ? "ویرایش" : "پاسخ"}
                  </button>
                </td>
                <td><button type="button" className={styles.delete_btn}>بن</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
import { authUser } from "@/utils/serverHelpers";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await connectToDB();
    const reqBody = await req.json();
    
    const { title, body, department, subDepartment, priority, ticketID } = reqBody;
    
    const user = await authUser();

    // ۱. بررسی دسترسی ادمین
    if (!user || user.role !== "ADMIN") {
      return Response.json({ message: "دسترسی غیرمجاز" }, { status: 401 });
    }

    // ۲. بررسی وجود پاسخ قبلی برای این تیکت خاص
    const alreadyAnswered = await TicketModel.findOne({ 
        mainTicket: new mongoose.Types.ObjectId(ticketID), 
        isAnswer: true 
    });

    if (alreadyAnswered) {
      // ✅ حالت ویرایش: آپدیت متن پاسخ قبلی
      alreadyAnswered.body = body;
      await alreadyAnswered.save();
      return Response.json({ message: "پاسخ با موفقیت ویرایش شد" }, { status: 200 });
    } else {
      // ✅ حالت ثبت جدید:
      
      // الف) آپدیت وضعیت تیکت اصلی
      await TicketModel.findOneAndUpdate(
        { _id: ticketID },
        { $set: { hasAnswer: true } }
      );

      // ب) ایجاد سند پاسخ جدید
      await TicketModel.create({
        title,
        body,
        department,
        subDepartment,
        priority,
        user: user._id,
        hasAnswer: false,
        isAnswer: true,
        mainTicket: new mongoose.Types.ObjectId(ticketID), // تبدیل قطعی به ObjectId
      });

      return Response.json({ message: "پاسخ با موفقیت ثبت شد" }, { status: 201 });
    }
  } catch (err) {
    console.error("خطا در سیستم پاسخدهی:", err);
    return Response.json({ message: err.message }, { status: 500 });
  }
}

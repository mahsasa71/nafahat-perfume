export const revalidate = 0; // این خط باعث می‌شود ککش کلاً غیرفعال شود

import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  try {
    await connectToDB();
    const ticketID = params.id;

    // جستجو بر اساس آیدی تیکت اصلی در فیلد mainTicket
    const answer = await TicketModel.findOne({ 
        mainTicket: new mongoose.Types.ObjectId(ticketID), 
        isAnswer: true 
    });

    if (!answer) {
      return Response.json({ message: "پاسخی یافت نشد" }, { status: 404 });
    }

    return Response.json(answer, { status: 200 });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
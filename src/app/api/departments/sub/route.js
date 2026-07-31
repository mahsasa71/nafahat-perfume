
import connectToDB from "@/configs/db";
import SubDepartmentModel from "@/models/SubDepartment";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await connectToDB(); // حتما await بگذار
    const body = await req.json();
    const { title, department } = body;

    // تبدیل رشته آی‌دی به فرمت استاندارد ObjectId مونگوس
    const subDepartment = await SubDepartmentModel.create({ 
       title, 
       department: new mongoose.Types.ObjectId(department) 
    });

    return Response.json(
      { message: "SubDepartment created successfully :))", data: subDepartment },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
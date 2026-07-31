
import connectToDB from "@/configs/db";
import { isValidObjectId } from "mongoose";
import SubDepartmentModel from "@/models/SubDepartment";

export async function GET(req, { params }) {
  try {
    await connectToDB();
    
    // نکته طلایی: پارامز را await کنید
    const { id } = await params; 

    console.log("ID received:", id); // چک کن در کنسول VSCode چی چاپ میشه

    if (!isValidObjectId(id)) {
      return Response.json({ message: `ID ${id} is not valid !!` }, { status: 422 });
    }

    const subDepartments = await SubDepartmentModel.find({ department: id });

    return Response.json(subDepartments, { status: 200 });
  } catch (err) {
    return Response.json({ message: "Error", error: err.message }, { status: 500 });
  }
}

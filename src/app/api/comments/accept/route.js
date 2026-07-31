
import connectToDB from "@/configs/db";
import CommentModel from "@/models/Comment";
import { authAdmin } from "@/utils/serverHelpers";

export async function PUT(req) {
  try {
    await connectToDB(); // ۱. حتما await اضافه شد

    // ۲. چک کردن ادمین با مدیریت خطای بهتر
    // const isAdmin = await authAdmin();
    // if (!isAdmin) {
    //   return Response.json(
    //     { message: "شما سطح دسترسی لازم را ندارید یا لاگین نیستید" },
    //     { status: 401 }
    //   );
    // }

    const body = await req.json();
    const { id } = body;

    // ۳. آپدیت کردن وضعیت
    const updatedComment = await CommentModel.findOneAndUpdate(
      { _id: id },
      { $set: { isAccept: true } }
    );

    if (!updatedComment) {
        return Response.json({ message: "کامنت یافت نشد" }, { status: 404 });
    }

    return Response.json({ message: "Comment accepted successfully :))" }, { status: 200 });
  } catch (err) {
    console.error("خطای سرور:", err.message); // این را در ترمینال VSCode چک کن
    return Response.json({ message: err.message }, { status: 500 });
  }
}
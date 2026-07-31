
import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { authUser } from "@/utils/serverHelpers";
import { hashPassword } from "@/utils/auth"; // اضافه شد

export async function POST(req) {
  try {
    await connectToDB();
    const user = await authUser();
    const body = await req.json();
    const { name, email, phone, password } = body;

    const updateData = { name, email, phone };

    // هش کردن رمز جدید اگر وارد شده باشد
    if (password && password.trim() !== "") {
      updateData.password = await hashPassword(password);
    }

    await UserModel.findOneAndUpdate(
      { _id: user._id },
      { $set: updateData }
    );

    return Response.json({ message: "User updated successfully :))" }, { status: 200 });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { id, name, email, phone, password } = body;

    const updateData = { name, email, phone };

    if (password && password.trim() !== "") {
      updateData.password = await hashPassword(password);
    }

    await UserModel.findOneAndUpdate({ _id: id }, { $set: updateData });


    return Response.json({ message: "Updated by Admin" }, { status: 200 });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { id } = body;
    await UserModel.findOneAndDelete({ _id: id });
    return Response.json({ message: "User removed" });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
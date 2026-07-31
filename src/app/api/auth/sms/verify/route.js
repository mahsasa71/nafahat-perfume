import connectToDB from "@/configs/db";
import OtpModel from "@/models/Otp";
import UserModel from "@/models/User";
import { generateAccessToken } from "@/utils/auth";
import { roles } from "@/utils/constants";

export async function POST(req) {
  await connectToDB();

  const body = await req.json();
  const { phone, code, type } = body;

  const email = `${phone}@gmail.com`;

  const otp = await OtpModel.findOne({ phone, code });

  if (!otp) {
    return Response.json(
      { message: "Code is not correct !!" },
      { status: 409 }
    );
  }

  const now = Date.now();

  if (otp.expTime <= now) {
    return Response.json(
      { message: "Code is expired :))" },
      { status: 410 }
    );
  }

  let user = await UserModel.findOne({ phone });

  // ثبت نام
  if (type === "register") {
    const users = await UserModel.find({});

    user = await UserModel.create({
      email,
      phone,
      role: users.length > 0 ? roles.USER : roles.ADMIN,
    });
  }

  // ورود
  if (type === "login" && !user) {
    return Response.json(
      { message: "User not found" },
      { status: 404 }
    );
  }

  const accessToken = generateAccessToken({
    email: user.email,
  });

  return Response.json(
    {
      message: "Success",
      user,
    },
    {
      status: 200,
      headers: {
        "Set-Cookie": `token=${accessToken};path=/;httpOnly=true`,
      },
    }
  );
}
import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { generateAccessToken, hashPassword } from "@/utils/auth";
import { roles } from "@/utils/constants";

export async function POST(req) {
  await connectToDB();

  const body = await req.json();
  const { name, phone, email, password } = body;

  const isUserExist = await UserModel.findOne({
    $or: [{ email }, { phone }],
  });

  if (isUserExist) {
    return Response.json(
      {
        message: "User already exists",
      },
      {
        status: 422,
      }
    );
  }

  const hashedPassword = await hashPassword(password);

  const users = await UserModel.find();

  // ساخت کاربر
  const newUser = await UserModel.create({
    name,
    email,
    phone,
    password: hashedPassword,
    role: users.length > 0 ? roles.USER : roles.ADMIN,
  });

  // ساخت توکن با اطلاعات کاربر
  const accessToken = generateAccessToken({
    id: newUser._id.toString(),
    name: newUser.name,
    email: newUser.email,
    phone: newUser.phone,
    role: newUser.role,
  });

  return Response.json(
    {
      message: "User signed up successfully",
    },
    {
      status: 201,
      headers: {
        "Set-Cookie": `token=${accessToken}; Path=/; HttpOnly; SameSite=Lax`,
      },
    }
  );
}
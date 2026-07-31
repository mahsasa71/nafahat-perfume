
import {
  generateAccessToken,
  generateRefreshToken,
  valiadteEmail,
  valiadtePassword,
  verifyPassword,
} from "@/utils/auth";
import UserModel from "@/models/User";
import connectToDB from "@/configs/db";

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { email, password } = body;

    // ۱. اعتبار سنجی ورودی‌ها
    const isValidEmail = valiadteEmail(email);
    const isValidPassword = valiadtePassword(password);

    if (!isValidEmail || !isValidPassword) {
      return Response.json(
        { message: "ایمیل یا رمز عبور نامعتبر است" },
        { status: 419 }
      );
    }

    // ۲. پیدا کردن کاربر در دیتابیس
    const user = await UserModel.findOne({ email });

    if (!user) {
      return Response.json({ message: "کاربر یافت نشد" }, { status: 422 });
    }

    // ۳. بررسی درست بودن پسورد (با await)
    const isCorrectPasswordWithHash = await verifyPassword(password, user.password);

    if (!isCorrectPasswordWithHash) {
      return Response.json(
        { message: "ایمیل یا رمز عبور اشتباه است" },
        { status: 401 }
      );
    }

    // ۴. تولید توکن‌ها
    const accessToken = generateAccessToken({ email });
    const refreshToken = generateRefreshToken({ email });

    // ۵. آپدیت کردن رفرش توکن در دیتابیس
    await UserModel.findOneAndUpdate(
      { email },
      { $set: { refreshToken } }
    );

    // ۶. تنظیم هدرها و کوکی‌ها با زمان انقضای طولانی (۳۰ روز)
    const maxAge = 60 * 60 * 24 * 30; // ۳۰ روز به ثانیه
    const headers = new Headers();

    // اضافه کردن Max-Age باعث می‌شود با بستن مرورگر لاگ‌اوت نشوی
    headers.append(
      "Set-Cookie", 
      `token=${accessToken}; Path=/; HttpOnly; Max-Age=${maxAge}; SameSite=Lax`
    );
    headers.append(
      "Set-Cookie", 
      `refresh-token=${refreshToken}; Path=/; HttpOnly; Max-Age=${maxAge}; SameSite=Lax`
    );

    return Response.json(
      { message: "User logged in successfully :))" },
      { status: 200, headers }
    );

  } catch (err) {
    console.error("Login Error:", err);
    return Response.json({ message: err.message }, { status: 500 });
  }
}

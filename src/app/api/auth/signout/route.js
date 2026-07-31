import { cookies } from "next/headers";


export async function POST() {
  try {
    const headers = new Headers();
    
    // تنظیم تاریخ انقضا به زمان گذشته (Max-Age=0) برای حذف قطعی
    headers.append(
      "Set-Cookie",
      "token=; Path=/; HttpOnly=true; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT;"
    );
    headers.append(
      "Set-Cookie",
      "refresh-token=; Path=/; HttpOnly=true; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT;"
    );

    return Response.json(
      { message: "Logout successfully :))" },
      {
        status: 200,
        headers,
      }
    );
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
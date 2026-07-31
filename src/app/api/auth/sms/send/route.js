import connectToDB from "@/configs/db";
import OtpModel from "@/models/Otp";
import UserModel from "@/models/User";

export async function POST(req) {
  try {
    await connectToDB();

    const body = await req.json();
    const { phone, type } = body;

    if (!phone) {
      return Response.json(
        { message: "Phone is required" },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ phone });

    // ثبت نام
    if (type === "register") {
      if (user) {
        return Response.json(
          {
            message: "This phone number is already registered.",
          },
          {
            status: 422,
          }
        );
      }
    }

    // ورود
    if (type === "login") {
      if (!user) {
        return Response.json(
          {
            message: "User not found.",
          },
          {
            status: 422,
          }
        );
      }
    }

    const code = Math.floor(100000 + Math.random() * 900000);

    const expTime = Date.now() + 300000;

    const smsResponse = await fetch(
      "https://api.iranpayamak.com/ws/v1/sms/pattern",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Api-Key": process.env.FARAZSMS_API_KEY,
        },
        body: JSON.stringify({
          code: process.env.FARAZSMS_PATTERN_CODE,
          recipient: phone,
          line_number: process.env.FARAZSMS_LINE_NUMBER,
          number_format: "english",
          attributes: {
            verificationcode: code.toString(),
          },
        }),
      }
    );

    const smsResult = await smsResponse.json();

    console.log("FarazSMS Response:", smsResult);

    if (!smsResponse.ok) {
      return Response.json(
        {
          message: "SMS sending failed",
          error: smsResult,
        },
        {
          status: 500,
        }
      );
    }

    await OtpModel.deleteMany({ phone });

    await OtpModel.create({
      phone,
      code,
      expTime,
    });

    return Response.json(
      {
        message: "Code sent successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("SMS Error:", error);

    return Response.json(
      {
        message: "Internal Server Error",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
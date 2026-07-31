
import connectToDB from "@/configs/db";
import OrderModel from "@/models/Order";
import ProductModel from "@/models/Product"; 
import { authUser } from "@/utils/serverHelpers";
import { NextResponse } from "next/server";
import moment from "moment-jalaali";

// ۱. متد ثبت سفارش و کسر نهایی از انبار
export async function POST(req) {
    try {
        await connectToDB();
        const user = await authUser();

        if (!user) {
            return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { items, totalPrice } = body;

        // چک کردن مجدد موجودی قبل از کسر
        for (const item of items) {
            const product = await ProductModel.findById(item.id || item._id);
            if (!product || product.inventory < item.count) {
                return NextResponse.json({ 
                    message: `موجودی "${item.name}" کافی نیست.` 
                }, { status: 400 });
            }
        }

        // کسر از انبار
        for (const item of items) {
            await ProductModel.findByIdAndUpdate(item.id || item._id, {
                $inc: { inventory: -item.count }
            });
        }

        const randomOrderID = Math.floor(1000 + Math.random() * 9000);
        const persianDate = moment().format("jYYYY/jMM/jDD - HH:mm");

        const newOrder = await OrderModel.create({
            orderID: randomOrderID,
            username: user.username || user.name, 
            phone: user.phone,
            items,
            totalPrice,
            createdAt: persianDate,
            status: "pending"
        });

        return NextResponse.json({ message: "سفارش ثبت شد", orderID: randomOrderID }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}

// ۲. متد جدید: فقط برای چک کردن موجودی
export async function PATCH(req) {
    try {
        await connectToDB();
        const { items } = await req.json();

        for (const item of items) {
            const product = await ProductModel.findById(item.id || item._id);
            if (!product) {
                return NextResponse.json({ message: `محصول "${item.name}" یافت نشد.` }, { status: 404 });
            }
            if (product.inventory < item.count) {
                return NextResponse.json({ 
                    message: `موجودی "${product.name}" کافی نیست. موجودی فعلی: ${product.inventory} عدد.` 
                }, { status: 400 });
            }
        }

        return NextResponse.json({ message: "موجودی اوکی است" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}

// ۳. متد آپدیت وضعیت سفارش (با قابلیت مدیریت انبار)
export async function PUT(req) {
    try {
        await connectToDB();
        const body = await req.json();
        const { id, status } = body;

        // پیدا کردن سفارش فعلی برای مقایسه وضعیت قبلی
        const order = await OrderModel.findById(id);

        if (!order) {

            return NextResponse.json({ message: "سفارش پیدا نشد" }, { status: 404 });
        }

        // الف) اگر ادمین وضعیت را به "مردود" تغییر داد (و قبلاً مردود نبوده)
        if (status === "denied" && order.status !== "denied") {
            for (const item of order.items) {
                await ProductModel.findByIdAndUpdate(item.id || item._id, {
                    $inc: { inventory: item.count } // موجودی به انبار برگردد
                });
            }
        }

        // ب) اگر ادمین پشیمان شد و وضعیت را از "مردود" به وضعیت دیگری تغییر داد
        else if (status !== "denied" && order.status === "denied") {
            // چک کردن موجودی انبار قبل از برگشت
            for (const item of order.items) {
                const product = await ProductModel.findById(item.id || item._id);
                if (!product || product.inventory < item.count) {
                    return NextResponse.json({ 
                        message: `موجودی "${item.name}" در انبار کافی نیست.` 
                    }, { status: 400 });
                }
            }
            // کسر مجدد از انبار
            for (const item of order.items) {
                await ProductModel.findByIdAndUpdate(item.id || item._id, {
                    $inc: { inventory: -item.count }
                });
            }
        }

        // آپدیت نهایی وضعیت در دیتابیس
        order.status = status;
        await order.save();

        return NextResponse.json({ message: "وضعیت با موفقیت تغییر کرد و موجودی انبار اصلاح شد" }, { status: 200 });
    } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}
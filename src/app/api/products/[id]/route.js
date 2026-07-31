import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import { writeFile } from "fs/promises";
import path from "path";

export async function PUT(req, { params }) {
  try {
    await connectToDB();

    // --- اصلاح مهم برای Next.js جدید ---
    const { id } = await params;

    const formData = await req.formData();

    // ۱. دریافت اطلاعات متنی
    const name = formData.get("name");
    const price = formData.get("price");
    const inventory = formData.get("inventory");
    const shortDescription = formData.get("shortDescription");
    const longDescription = formData.get("longDescription");
    const weight = formData.get("weight");
    const suitableFor = formData.get("suitableFor");
    const smell = formData.get("smell");
    const tagsRaw = formData.get("tags");

    // ۲. بررسی عکس‌های جدید
    const newImages = formData.getAll("images");
    let imagesUrls = [];

    if (newImages && newImages.length > 0 && newImages[0].size > 0) {
      for (const img of newImages) {
        if (img instanceof File) {
          const buffer = Buffer.from(await img.arrayBuffer());
          const filename = Date.now() + "-" + img.name;
          const imgPath = path.join(
            process.cwd(),
            "public/uploads/" + filename,
          );
          await writeFile(imgPath, buffer);
          imagesUrls.push(`/uploads/${filename}`);
        }
      }
    }

    // ۳. آماده‌سازی آبجکت آپدیت
    const updateData = {
      name,
      price,
      inventory,
      shortDescription,
      longDescription,
      weight,
      suitableFor,
      smell,
      tags: tagsRaw ? tagsRaw.split(",") : [],
    };

    if (imagesUrls.length > 0) {
      updateData.images = imagesUrls;
    }

    // ۴. آپدیت محصول (با روش جدید مانگوس)
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: id },
      updateData,
      { returnDocument: "after" }, // به جای new: true
    );

    if (!updatedProduct) {
      return Response.json({ message: "محصول پیدا نشد" }, { status: 404 });
    }

    return Response.json(
      { message: "محصول با موفقیت ویرایش شد" },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return Response.json({ message: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectToDB();

    // --- اینجا هم باید await شود ---
    const { id } = await params;

    const deletedProduct = await ProductModel.findOneAndDelete({ _id: id });

    if (!deletedProduct) {
      return Response.json({ message: "محصول پیدا نشد" }, { status: 404 });
    }

    return Response.json({ message: "محصول حذف شد" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json({ message: err.message }, { status: 500 });
  }
}

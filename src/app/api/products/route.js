import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    await connectToDB();
    const formData = await req.formData();

    // دریافت فیلدها از FormData
    const name = formData.get("name");
    const price = formData.get("price");
    const inventory = formData.get("inventory");
    const shortDescription = formData.get("shortDescription");
    const longDescription = formData.get("longDescription");
    const weight = formData.get("weight");
    const suitableFor = formData.get("suitableFor");
    const smell = formData.get("smell");
    const tagsRaw = formData.get("tags");
    const tags = tagsRaw ? tagsRaw.split(",") : [];

    // دریافت تمام عکس‌ها
    const images = formData.getAll("images");
    const imagesUrls = [];

    // آپلود تک تک عکس‌ها
    for (const img of images) {
      if (img && img.size > 0) {
        const buffer = Buffer.from(await img.arrayBuffer());
        const filename = Date.now() + "-" + img.name;
        const imgPath = path.join(process.cwd(), "public/uploads/" + filename);

        await writeFile(imgPath, buffer);
        imagesUrls.push(`/uploads/${filename}`);
      }
    }

    const product = await ProductModel.create({
      name,
      price,
      inventory,
      shortDescription,
      longDescription,
      weight,
      suitableFor,
      smell,
      tags,
      images: imagesUrls,
    });

    return Response.json(
      { message: "Product created successfully :)", data: product },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return Response.json({ message: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const products = await ProductModel.find({}, "-__v").populate("comments");
    return Response.json(products);
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}

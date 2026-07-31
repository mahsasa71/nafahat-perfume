
const mongoose = require("mongoose");
require("./Comment");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // اضافه شدن فیلد موجودی (Inventory)
  inventory: {
    type: Number,
    default: 0, // یا هر عددی که مد نظرت هست
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  suitableFor: {
    type: String,
    required: true,
  },
  smell: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 5,
  },
  tags: {
    type: [String],
    required: true,
  },
  // تغییر عکس تکی به آرایه‌ای از عکس‌ها برای گالری
  images: {
    type: [String], // آرایه‌ای از آدرس تصاویر
    required: true,
    // مثلاً ایندکس 0 می‌تواند عکس اصلی محصول باشد
  },
  comments: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
}, { timestamps: true }); // اضافه کردن زمان ساخت و ویرایش هم همیشه مفیده

const model = mongoose.models.Product || mongoose.model("Product", schema);

export default model;
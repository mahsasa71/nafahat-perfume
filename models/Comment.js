
const mongoose = require("mongoose");
// اطمینان از لود شدن مدل محصول برای ارتباط ref
require("./Product"); 

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 5,
    min: 1,
    max: 5,
  },
  isAccept: {
    type: Boolean,
    default: false,
  },
  answer: {
    type: String, // فیلد جدید برای ذخیره پاسخ مدیر
    required: false,
  },
  date: {
    type: Date,
    default: () => Date.now(),
    immutable: false,
  },
  productID: {
    type: mongoose.Types.ObjectId,
    ref: "Product", // ارجاع به مدل محصول
    required: true,
  },
}, {
  timestamps: false, // چون خودت فیلد date داری، نیازی به timestamps خودکار نیست
});

// جلوگیری از ارور Overwrite Model در Next.js
const model = mongoose.models.Comment || mongoose.model("Comment", schema);

export default model;
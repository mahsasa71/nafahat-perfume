import mongoose from "mongoose";

const schema = new mongoose.Schema({
    orderID: { // فیلد شناسه ۴ رقمی
        type: Number,
        required: true,
    },
    username: { type: String, required: true },
    phone: { type: String, required: true },
    items: [
        {
            id: { type: String, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            count: { type: Number, required: true }
        }
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "pending" },
    createdAt: { type: String, immutable: true }
}, { versionKey: false });

const OrderModel = mongoose.models.Order || mongoose.model("Order", schema);
export default OrderModel;
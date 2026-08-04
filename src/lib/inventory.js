import ProductModel from "@/models/Product";
import { sendTelegramMessage } from "./telegram";

export async function checkInventory(productId) {

    const product = await ProductModel.findById(productId);

    if (!product) return;


    if (product.inventory === 0) {

        await sendTelegramMessage(`
🚨 <b>اتمام موجودی</b>

📦 محصول:
${product.name}

❌ موجودی این محصول به پایان رسید.

لطفاً موجودی را شارژ کنید.
        `);

    }

}
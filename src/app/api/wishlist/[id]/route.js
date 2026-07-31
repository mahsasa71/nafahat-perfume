
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/serverHelpers";
import WishlistModel from "@/models/Wishlist";

export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const user = await authUser();

    if (!user) {
      return Response.json(
        { message: "Please login first !!" },
        { status: 401 }
      );
    }

    // ✅ در نسخه های جدید نکس، باید params را await کنی
    const { id } = await params; 
    const productID = id;

    const deletedProduct = await WishlistModel.findOneAndDelete({
      user: user._id,
      product: productID,
    });

    if (!deletedProduct) {
      return Response.json(
        { message: "Product not found in your wishlist" },
        { status: 404 }
      );
    }

    return Response.json({ message: "Product removed successfully :))" });
  } catch (err) {
    return Response.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}
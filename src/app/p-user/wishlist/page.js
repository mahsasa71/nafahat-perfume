import UserPanelLayout from "@/components/layout/UserPanelLayout";
import styles from "@/styles/p-user/wishlist.module.css";
import Product from "@/components/templates/p-user/wishlist/Product";
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/serverHelpers";
import WishlistModel from "@/models/Wishlist";
import { redirect } from "next/navigation";


const page = async () => {
  await connectToDB();
  const user = await authUser();

  if (!user) {
    redirect("/login");
  }

  const wishlist = await WishlistModel.find({ user: user._id })
    .populate("product")
    .lean();

  return (
    <UserPanelLayout>
      <main>
        <h1 className={styles.title}>
          <span>علاقه مندی ها</span>
        </h1>
        <div className={styles.container}>
          {wishlist.length > 0 ? (
            wishlist.map((wish) => (
              <Product
                key={wish._id}
                productID={wish.product ? String(wish.product._id) : ""}
                name={wish.product?.name || "محصول ناموجود"}
               
                price={wish.product ? wish.product.price.toLocaleString("fa-IR") : "0"} 
                score={wish.product?.score || 0}
                img={wish.product?.img || "/images/default-coffee.png"}
              />
            ))
          ) : (
            <p className={styles.empty}>محصولی وجود ندارد</p>
          )}
        </div>
      </main>
    </UserPanelLayout>
  );
};
export default page;
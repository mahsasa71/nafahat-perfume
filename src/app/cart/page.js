
import Footer from "@/components/module/footer/Footer";
import Navbar from "@/components/module/navbar/Navbar";
import Stepper from "@/components/module/stepper/Stepper";
import Table from "@/components/templates/cart/Table";
import styles from "@/styles/cart.module.css";
import { authUser } from "@/utils/serverHelpers";

export default async function Page() {
  const user = await authUser();

  const safeUser = user ? JSON.parse(JSON.stringify(user)) : null;

  return (
    <>
  <div dir="rtl">
    <Navbar user={safeUser} isLogin={!!user} />
  </div>
  
      <Stepper step="cart" />

      <main className={styles.cart} data-aos="fade-up">
        <Table user={safeUser} />
      </main>

      <Footer />
    </>
  );
}
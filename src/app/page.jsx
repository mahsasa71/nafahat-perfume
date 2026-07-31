import Footer from "@/components/module/footer/Footer";
import Navbar from "@/components/module/navbar/Navbar";
import Services from "@/components/templates/Services/Services";
import CategoryBanner from "@/components/templates/CategoryBanner/CategoryBanner";
import ContactUs from "@/components/templates/ContactUs/ContactUs";
import HomeBackGround from "@/components/templates/HomeBackGround/HomeBackGround";

import Latest from "@/components/templates/latest/Latest";

import { authUser } from "@/utils/serverHelpers";
import ProductModel from "@/models/Product";

export default async function Home() {
  const user = await authUser();

  const latestProducts = await ProductModel.find({}).sort({ _id: -1 }).limit(8);

  return (
    <>
      <div className="font-Dana " dir="rtl">
        <Navbar   user={user ? JSON.parse(JSON.stringify(user)) : null} 
  isLogin={!!user} />
        <HomeBackGround className='mb-5' />

      </div>
<div className="md:px-20" dir="rtl">
        <Latest products={JSON.parse(JSON.stringify(latestProducts))} />
      <CategoryBanner />

      <ContactUs />
<Services/>
</div>

      <Footer />
    </>
  );
}

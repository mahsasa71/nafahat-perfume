
import Gallery from "@/components/templates/product/Gallery";
import Details from "@/components/templates/product/Details";
import Tabs from "@/components/templates/product/Tabs";
import MoreProducts from "@/components/templates/product/MoreProducts";
import Footer from "@/components/module/footer/Footer";
import Navbar from "@/components/module/navbar/Navbar";
import { authUser } from "@/utils/serverHelpers";
import ProductModel from "@/models/Product";
import connectToDB from "@/configs/db";

const product = async ({ params }) => {
  const user = await authUser();
  await connectToDB();

  const { id } = await params;

  const productData = await ProductModel.findOne({ _id: id })
    .populate("comments")
    .lean();

  if (!productData) {
    return (
      <div className="flex items-center justify-center min-h-screen font-DanaMedium text-xl text-zinc-700">
        محصولی یافت نشد!
      </div>
    );
  }

  const relatedProducts = await ProductModel.find({
    smell: productData.smell,
    suitableFor:productData.suitableFor,
    _id: { $ne: productData._id },
  })
    .limit(4)
    .lean();

  return (
    <div className="bg-white dark:bg-zinc-900 min-h-screen" dir="rtl">
      <Navbar
        user={user ? JSON.parse(JSON.stringify(user)) : null}
        isLogin={!!user}
      />

      <div
        data-aos="fade-up"
        className="max-w-[1200px] mx-auto mt-24 lg:mt-40 mb-10 px-4 lg:px-0 flex flex-col gap-10"
      >


<div className="flex flex-col md:flex-row-reverse items-start justify-between gap-8">

 
<div className="w-full md:w-[36%] md:sticky md:top-36">
  <Gallery images={JSON.parse(JSON.stringify(productData.images || [productData.img]))} />
</div>

  <div className="w-full md:w-[63%]">
    <Details
      product={JSON.parse(JSON.stringify(productData))}
      user={user ? JSON.parse(JSON.stringify(user)) : null}
    />
  </div>

</div>


        <div className="w-full">
          <MoreProducts
            relatedProducts={JSON.parse(JSON.stringify(relatedProducts))}
          />
        </div>

        <div className="w-full  px-3">
          <Tabs product={JSON.parse(JSON.stringify(productData))} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default product;

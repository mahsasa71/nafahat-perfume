
import React from 'react';
import ProductModel from "@/models/Product";
import Latest2 from "@/components/templates/latest/Latest2";
import connectToDB from "@/configs/db";
import SortFilter from "@/components/templates/SortFilter";
import Pagination from "@/components/templates/latest/pagination"; // این را خواهیم ساخت
import Navbar from "@/components/module/navbar/Navbar";
import { authUser } from "@/utils/serverHelpers";
import Footer from "@/components/module/footer/Footer";
export default async function page({ searchParams }) {
      const user = await authUser();
  await connectToDB();

  const params = await searchParams;
  const { suitableFor, type, sort, page = 1 } = params; // مقدار پیش‌فرض صفحه ۱
  
  const limit = 4; // تعداد نمایش در هر صفحه
  const skip = (Number(page) - 1) * limit;

  let query = {};
  if (suitableFor) query.suitableFor = suitableFor;
  if (type) query.smell = type;

  // منطق سورت (همان که قبلاً اصلاح کردیم)
  let sortQuery = { _id: -1 };
  if (sort === "newest") sortQuery = { createdAt: -1 };
  if (sort === "oldest") sortQuery = { createdAt: 1 };
  if (sort === "cheapest") sortQuery = { price: 1 };
  if (sort === "expensive") sortQuery = { price: -1 };

  // ۱. گرفتن تعداد کل محصولات برای محاسبه تعداد صفحات
  const totalProducts = await ProductModel.countDocuments(query);
  const totalPages = Math.ceil(totalProducts / limit);

  // ۲. گرفتن محصولات همان صفحه خاص
  const filteredProducts = await ProductModel.find(query)
    .sort(sortQuery)
    .skip(skip)
    .limit(limit)
    .lean();

  return (
    <>
    <div dir='rtl'>
                  <Navbar  user={user ? JSON.parse(JSON.stringify(user)) : null} 
      isLogin={!!user}  />
    </div>

        <div className="container mx-auto md:pt-[135px] px-4">
       <SortFilter />
       
       <Latest2 products={JSON.parse(JSON.stringify(filteredProducts))} />
       
       {/* کامپوننت پیجینیشن */}
       <Pagination totalPages={totalPages} currentPage={Number(page)} />
    </div>
     <Footer />
    </>

  );
}

import React from "react";
import Layout from "@/components/layout/AdminPanelLayout";
import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import ProductManager from "@/components/templates/p-admin/products/ProductManager";


const Page = async () => {
  await connectToDB();

  const products = JSON.parse(
    JSON.stringify(await ProductModel.find({}).sort({ _id: -1 })),
  );

  return (
    <Layout>
      <main>
   
          <ProductManager products={products} />

      </main>
    </Layout>
  );
};

export default Page;

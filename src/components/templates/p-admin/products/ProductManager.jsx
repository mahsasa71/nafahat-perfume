"use client";
import React, { useState } from "react";
import AddProduct from "@/components/templates/p-admin/products/AddProduct";
import DataTable from "@/app/p-admin/products/Table"; 

export default function ProductManager({ products }) {
  const [productToEdit, setProductToEdit] = useState(null);

  return (
    <>
      <AddProduct
        editProduct={productToEdit}
        onCancel={() => setProductToEdit(null)}
      />

      <DataTable
        products={products}
        title="لیست محصولات"
        onEdit={(product) => setProductToEdit(product)}
      />
    </>
  );
}



import DataTable from "@/components/templates/p-admin/orders/Datatable";
import Layout from "@/components/layout/AdminPanelLayout";
import React from "react";
import connectToDB from "@/configs/db";
import OrderModel from "@/models/Order";
import { authUser } from "@/utils/serverHelpers";

const page = async () => {
  await connectToDB();
  const user = await authUser();
  const orders = await OrderModel.find({}).sort({ _id: -1 }).lean();

const safeOrders = orders.map(order => ({
  _id: order._id.toString(),
  orderID: order.orderID,
  username: order.username, 
  phone: order.phone,      
  createdAt: order.createdAt,
  totalPrice: order.totalPrice,
  status: order.status,
  items: order.items.map(item => ({
    name: item.name,
    count: item.count
  }))
}));

  return (
    <Layout>
      <main>
        {safeOrders.length > 0 ? (
          <DataTable
            orders={safeOrders}
            title="لیست کل سفارشات"
          />
        ) : (
          <p style={{ textAlign: "center", marginTop: "50px", fontSize: "20px" }}>
            هیچ سفارشی در سیستم ثبت نشده است.
          </p>
        )}
      </main>
    </Layout>
  );
};

export default page;
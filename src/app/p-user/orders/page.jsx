
import DataTable from "@/components/templates/p-user/orders/DataTable"; 
import Layout from "@/components/layout/UserPanelLayout";
import React from "react";
import connectToDB from "@/configs/db";
import OrderModel from "@/models/Order"; 
import { authUser } from "@/utils/serverHelpers";

const page = async () => {
  await connectToDB();
  const user = await authUser();


const orders = await OrderModel.find({ 
  $or: [
    { user: user._id }, 
    { phone: user.phone }
  ] 
}).lean();
  return (
    <Layout>
      <main>
        {orders.length > 0 ? (
          <DataTable
            orders={JSON.parse(JSON.stringify(orders))}
            title="لیست سفارشات"
          />
        ) : (
          <p style={{ textAlign: "center", marginTop: "50px", fontSize: "20px" }}>
            هنوز سفارشی ثبت نکرده‌اید.
          </p>
        )}
      </main>
    </Layout>
  );
};

export default page;
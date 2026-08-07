import React from "react";
import Layout from "@/components/layout/AdminPanelLayout";

import Table from "@/app/p-admin/users/Table";
import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
export const dynamic = "force-dynamic";
const page = async () => {
  await connectToDB();
  const users = await UserModel.find({}).lean();

  return (
    <Layout>
      <main>
        {users.length === 0 ? (
          <p >کاربری وجود ندارد</p>
        ) : (
          <Table
            users={JSON.parse(JSON.stringify(users))}
            title="لیست کاربران"
          />
        )}
      </main>
    </Layout>
  );
};

export default page;

import React from "react";
import Layout from "@/components/layout/AdminPanelLayout";

import styles from "@/app/p-admin/tickets/table.module.css";
import Table from "@/app/p-admin/tickets/Table";
import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
export const dynamic = "force-dynamic";
const page = async () => {
  await connectToDB();
  const tickets = await TicketModel.find({ isAnswer: false })
    .sort({ _id: -1 })
    .populate("user")
    .populate("department")
    .lean();

  return (
    <Layout>
      <main>
        {tickets.length === 0 ? (
          <p className={styles.empty}>تیکتی وجود ندارد</p>
        ) : (
          <Table
            tickets={JSON.parse(JSON.stringify(tickets))}
            title="لیست تیکت‌ها"
          />
        )}
      </main>
    </Layout>
  );
};

export default page;

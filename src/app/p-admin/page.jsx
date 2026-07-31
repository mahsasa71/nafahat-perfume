
import React from "react";
import Statics from "@/components/templates/p-admin/static/Statics";
import AdminPanelLayout from '@/components/layout/AdminPanelLayout'
import TicketModel from "@/models/Ticket";
import CommentModel from "@/models/Comment";
import UserModel from "@/models/User";
import ProductModel from "@/models/Product";
import styles from '@/app/p-admin/index.module.css'
import connectToDB from "@/configs/db";
import SaleChart from "@/components/templates/p-admin/index/SaleChart";
import GrowthChart from "@/components/templates/p-admin/index/GrowthChart";
export default async function MainPage() {
      connectToDB();
  const tickets = await TicketModel.find({}).lean();
  const users = await UserModel.find({}).lean();
  const products = await ProductModel.find({}).lean();

//   const [totalUsers, setTotalUsers] = useState(0);
//   const [onlineUsers, setOnlineUsers] = useState(0);
//   const [totalOrders, setTotalOrders] = useState(0);
//     const { user } = useContext(AuthContext);
//   const [bestProduct, setBestProduct] = useState(null);




  return (
    <>
    <AdminPanelLayout>
      <div className="flex flex-wrap mt-8">
      {/* <UserName name={user.name || user.firstName} /> */}


        
      </div>

      <div className="flex flex-wrap mt-5">
      
        <Statics
          title="تعداد اعضا"
          number={users.length}
          fromColor="#4f46e5"
          toColor="#3b82f6"
        />

{/*        
        <Statics
          title="تکمیل سفارشات"
          number={totalOrders}
          fromColor="#16a34a"
          toColor="#22c55e"
        /> */}

{/*         
        <Statics
          title="کاربران آنلاین"
          number={onlineUsers}
          fromColor="#f59e0b"
          toColor="#fbbf24"
        /> */}

       
        {/* <Statics
          title="پرفروش‌ترین محصول:"
          number={bestProduct ? bestProduct.count : 0}
          productName={bestProduct?.name}
          productImage={bestProduct?.photo}
          fromColor="#dc2626"
          toColor="#ef4444"
        /> */}
       {/* <div className={styles.dashboard_charts}>
          <section>
            <p>آمار فروش</p>
            <SaleChart />
          </section>
          <section>
            <p>نرخ رشد</p>
            <GrowthChart />
          </section>
        </div> */}
        <div className="w-full mt-6">
          {/* <LastUsers /> */}
        </div>
      </div>
    </AdminPanelLayout>

    </>
  );
}

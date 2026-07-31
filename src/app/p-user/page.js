
import Layout from "@/components/layout/UserPanelLayout";
import Statics from "@/components/templates/p-admin/static/Statics";
import Tickets from "@/components/templates/p-user/index/Tickets";
import Orders from "@/components/templates/p-user/index/Orders";
import { authUser } from "@/utils/serverHelpers";
import TicketModel from "@/models/Ticket";
import CommentModel from "@/models/Comment";
import WishlistModel from "@/models/Wishlist";

const page = async () => {
  const user = await authUser();
  const tickets = await TicketModel.find({ user: user._id })
    .limit(3)
    .populate("department", "title")
    .sort({ _id: -1 })
    .lean();

  const allTickets = await TicketModel.find({ user: user._id });
  const comments = await CommentModel.find({ user: String(user._id) });
  const wishes = await WishlistModel.find({ user: user._id });

  return (
    <Layout>
      <main className="w-full pb-10">

        {/* <section className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-12 px-4 md:px-10">
          <Statics title="مجموع تیکت ها" value={allTickets.length} />
          <Statics title="مجموع کامنت ها" value={comments.length} />
          <Statics title="مجموع سفارشات" value="2" />
          <Statics title="مجموع علاقه مندی ها" value={wishes.length} />
        </section> */}

 
     
          <div className="w-full ">
            <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
          </div>
        
      </main>
    </Layout>
  );
};

export default page;
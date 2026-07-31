
import Layout from "@/components/layout/UserPanelLayout";
import Link from "next/link";
import Answer from "@/components/templates/p-user/tickets/Answer";
import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
import { authUser } from "@/utils/serverHelpers";
import { redirect } from "next/navigation";
import { FaPlus, FaTicketAlt } from "react-icons/fa";

const page = async ({ params }) => {
  const { id } = await params;
  await connectToDB();

  const user = await authUser();
  if (!user) {
    return redirect("/login-register");
  }

  const ticket = await TicketModel.findOne({ _id: id })
    .populate("user", "name")
    .lean();


  if (!ticket || ticket.user._id.toString() !== user._id.toString()) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[400px] px-6">
          <div className="w-full max-w-2xl py-12 rounded-2xl bg-red-50 border border-red-100 text-center shadow-sm">
            <p className="text-red-600 font-shabnam-Bold text-lg">
              تیکت مورد نظر یافت نشد یا شما اجازه دسترسی ندارید.
            </p>
            <Link href="/p-user/tickets" className="text-sm text-red-400 underline mt-4 block">
              بازگشت به لیست تیکت‌ها
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const answerTicket = await TicketModel.findOne({
    mainTicket: ticket._id,
  })
    .populate("user", "name")
    .lean();

  return (
    <Layout>
      <main className="px-4 md:px-10 font-shabnam pb-10">
        
        <div className="relative mt-8 mb-12 flex items-center justify-between">
          <h1 className="relative z-10 bg-white pr-4 pl-10 text-2xl md:text-3xl font-medium text-black flex items-center gap-3">
            <FaTicketAlt className="text-[#711d1c] text-xl md:text-2xl" />
            <span>جزئیات تیکت</span>
          </h1>

          <Link 
            href="/p-user/tickets/sendTicket" 
            className="relative z-10 flex items-center gap-2 bg-white text-[#711d1c] border border-[#711d1c] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#711d1c] hover:text-white transition-all shadow-sm"
          >
            <FaPlus size={12} />
            ارسال تیکت جدید
          </Link>

 
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#711d1c] shadow-[0_1px_0_0_#711d1c] z-0 w-full"></div>
        </div>

       
        <div className="max-w-5xl mx-auto space-y-8">

        
          <div className="transform transition-all hover:scale-[1.01]">
            <Answer type="user" {...ticket} />
          </div>

      
          {answerTicket ? (
            <div className="transform transition-all hover:scale-[1.01]">
              <Answer type="admin" {...answerTicket} />
            </div>
          ) : (
            <div className="w-full py-10 rounded-2xl bg-[#711d1c]/5 border border-dashed border-[#711d1c]/30 text-center animate-pulse">
              <p className="text-[#711d1c] font-medium opacity-80">
                در حال حاضر این تیکت در صف بررسی قرار دارد و هنوز پاسخی دریافت نکرده است.
              </p>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default page;


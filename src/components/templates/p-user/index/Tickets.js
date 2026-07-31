
import Ticket from "./Ticket";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const Tickets = ({ tickets }) => {
  return (
    <div className="w-full rounded-[5px] bg-[#711d1c0f] px-[15px] text-black">
      <div className="flex items-center justify-between border-b border-[#711d1c] p-[15px]">
        <p>تیکت های اخیر</p>

        <Link href="/p-user/tickets" className="flex items-center gap-[9px]">
          همه تیکت ها
          <FaArrowLeft className="text-[#711d1c]" />
        </Link>
      </div>

      {tickets.map((ticket) => (
        <Ticket key={ticket._id} {...ticket} />
      ))}

      {/* <p className="w-full py-[9rem] pb-[12.5rem] text-center text-[2rem]">تیکتی ثبت نشده</p> */}
    </div>
  );
};

export default Tickets;
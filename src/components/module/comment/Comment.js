
import { FaRegStar, FaStar } from "react-icons/fa";
import { HiOutlineReply } from "react-icons/hi";

const Comment = ({ username, body, score, date, answer }) => {
  return (
    <div className="flex flex-col mb-10 font-Dana">
     
      <section className="flex gap-x-4">
     
        <div className="flex-shrink-0">
          <img 
            src="/images/shahin.jpg" 
            className="w-14 h-14 rounded-full object-cover border border-gray-100" 
            alt="user-avatar" 
          />
        </div>

     
        <div className="flex-1 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-y-2">
            <div className="flex flex-col">
              <strong className="text-zinc-700 text-sm">{username}</strong>
              <span className="text-gray-400 text-[11px] mt-1">
                {new Date(date).toLocaleDateString("fa-IR")}
              </span>
            </div>

           
            <div className="flex text-orange-400 text-sm gap-x-0.5">
              {new Array(5 - score).fill(0).map((_, index) => (
                <FaRegStar key={`empty-${index}`} />
              ))}
              {new Array(score).fill(0).map((_, index) => (
                <FaStar key={`filled-${index}`} />
              ))}
            </div>
          </div>

        
          <p className="text-zinc-600 leading-relaxed text-sm text-justify">
            {body}
          </p>
        </div>
      </section>


      {answer && (
        <div className="mr-12 mt-4 relative">
       
          <div className="bg-gray-50 border-r-4 border-teal-600 p-4 rounded-l-xl rounded-r-sm shadow-sm">
            <div className="flex items-center gap-x-2 text-teal-700 mb-2">
              <HiOutlineReply className="rotate-180 text-lg" />
              <span className="font-DanaMedium text-xs">پاسخ مدیریت:</span>
            </div>
            <p className="text-zinc-600 text-sm leading-relaxed">
              {answer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
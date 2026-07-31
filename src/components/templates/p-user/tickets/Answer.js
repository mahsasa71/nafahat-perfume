
import React from "react";

const Answer = ({ type, title, body, createdAt, user }) => {
  const isUser = type === "user";

  return (
    <section
      className={`w-full md:w-3/4 lg:w-1/2 p-4 rounded-2xl mb-6 shadow-sm transition-all ${
        isUser 
          ? "bg-[#711d1c] text-white ml-auto"
          : "bg-gray-50 text-black mr-auto border-2 border-[#711d1c]" 
      }`}
    >
   
      <div className="flex flex-row-reverse items-center justify-between pb-3 border-b border-white/10">
        <div className="flex flex-row-reverse items-center gap-3">
          
          <div className="relative">
            <img 
              src="/images/shahin.jpg" 
              alt={user.name} 
              className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-white/20 shadow-md"
            />
            <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${isUser ? 'bg-green-500' : 'bg-blue-500'}`}></span>
          </div>

        
          <div className="flex flex-col items-end gap-0">
            <p className={`font-shabnam-Bold text-sm md:text-base ${!isUser && "text-[#711d1c]"}`}>
              {user.name}
            </p>
            <span className={`text-[10px] md:text-xs px-2 py-0.5 rounded-full ${
              isUser ? "bg-white/20 text-white" : "bg-[#711d1c]/10 text-gray-500"
            }`}>
              {isUser ? "کاربر" : "پشتیبان"}
            </span>
          </div>
        </div>

      
        <p className={`text-[10px] md:text-xs opacity-70 font-mono`}>
          {new Date(createdAt).toLocaleDateString("fa-IR")}
        </p>
      </div>

     
      <div className={`mt-4 p-4 rounded-xl text-sm md:text-base leading-7 shadow-inner ${
        isUser 
          ? "bg-white text-black" 
          : "bg-[#711d1c] text-white"
      }`}>
        <p className="whitespace-pre-line">{body}</p>
      </div>
    </section>
  );
};

export default Answer;
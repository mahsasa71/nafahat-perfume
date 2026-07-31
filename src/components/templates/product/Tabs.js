"use client";
import React, { useState } from "react";
import Description from "./Description";
import MoreInfoes from "./MoreInfoes";
import Comments from "./Comments";

const Tabs = ({ product }) => {
  const [tab, setTab] = useState("description");

  if (!product) return null;

  const acceptedCommentsCount =
    product.comments?.filter((comment) => comment.isAccept).length || 0;

  return (
    <div className="relative w-full overflow-x-hidden font-Dana">
      <ul className="flex w-full max-w-full overflow-x-hidden flex-wrap items-end justify-between list-none">
        <li className="flex-1 min-w-0 px-2.5 text-center">
          <button
            onClick={() => setTab("description")}
            className={`relative w-full py-5 text-base border-0 outline-none cursor-pointer transition-all duration-300 font-DanaMedium
              ${tab === "description" ? "text-zinc-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}
            `}
          >
            توضیحات
            <span
              className={`absolute top-0 right-0 h-[3px] bg-gradient-to-l from-zinc-800 to-zinc-500 rounded-full transition-all duration-300 ${
                tab === "description" ? "w-full" : "w-0"
              }`}
            ></span>
          </button>
        </li>

        <li className="flex-1 min-w-0 px-2.5 text-center">
          <button
            onClick={() => setTab("moreInfoes")}
            className={`relative w-full text-nowrap py-5 text-base border-0 outline-none cursor-pointer transition-all duration-300 font-DanaMedium
              ${tab === "moreInfoes" ? "text-zinc-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}
            `}
          >
            اطلاعات بیشتر
            <span
              className={`absolute top-0 right-0 h-[3px] bg-gradient-to-l from-zinc-800 to-zinc-500 rounded-full transition-all duration-300 ${
                tab === "moreInfoes" ? "w-full" : "w-0"
              }`}
            ></span>
          </button>
        </li>

        <li className="flex-1 min-w-0 px-2.5 text-center">
          <button
            onClick={() => setTab("comments")}
            className={`relative w-full py-5 text-base border-0 outline-none cursor-pointer transition-all duration-300 font-DanaMedium
              ${tab === "comments" ? "text-zinc-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}
            `}
          >
            نظرات ({acceptedCommentsCount})
            <span
              className={`absolute top-0 right-0 h-[3px] bg-gradient-to-l from-zinc-800 to-zinc-500 rounded-full transition-all duration-300 ${
                tab === "comments" ? "w-full" : "w-0"
              }`}
            ></span>
          </button>
        </li>
      </ul>

      <div className="mt-8">
        <section className="animate-fadeInUp overflow-x-hidden">
       {tab === "description" && (
      <Description data={product.longDescription} />
    )}
          {tab === "moreInfoes" && (
            <MoreInfoes product={JSON.parse(JSON.stringify(product))} />
          )}
          {tab === "comments" && (
            <Comments
              productID={product._id}
              comments={JSON.parse(JSON.stringify(product.comments))}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default Tabs;

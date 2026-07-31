
import React from "react";
import Link from "next/link";

const Breadcrumb = ({ title }) => {
  return (
    <section className="flex items-center gap-2 text-zinc-400 dark:text-gray-500 text-sm mb-4 font-Dana">
      <Link 
        href="/" 
        className="hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
      >
        خانه
      </Link>
      
      <span className="opacity-50">/</span>
      
      <Link 
        href="/shop" 
        className="hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
      >
        همه موارد
      </Link>
      
      <span className="opacity-50">/</span>
      
      <p className="text-zinc-800 dark:text-zinc-300 font-DanaMedium truncate max-w-[150px] md:max-w-none">
        {title}
      </p>
    </section>
  );
};

export default Breadcrumb;
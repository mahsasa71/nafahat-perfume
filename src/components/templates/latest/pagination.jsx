
"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const Pagination = ({ totalPages, currentPage }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const changePage = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null; 

  return (
    <div className="flex justify-center items-center gap-4 my-10">
      <button
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
        className="px-4 py-2 bg-orange-300 disabled:bg-gray-300 rounded-lg"
      >
        قبلی
      </button>

      <div className="flex gap-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => changePage(index + 1)}
            className={`w-10 h-10 rounded-full ${
              currentPage === index + 1 ? "bg-orange-500 text-white" : "bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => changePage(currentPage + 1)}

        className="px-4 py-2 bg-orange-300 disabled:bg-gray-300 rounded-lg"
      >
        بعدی
      </button>
    </div>
  );
};

export default Pagination;

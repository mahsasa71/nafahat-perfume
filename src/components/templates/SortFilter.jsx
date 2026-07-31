
"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const SortFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const changeSortHandler = (sortValue) => {
    const params = new URLSearchParams(searchParams);
    if (sortValue) {
      params.set("sort", sortValue);
    } else {
      params.delete("sort");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex justify-end p-4">
      <select
        onChange={(e) => changeSortHandler(e.target.value)}
        defaultValue={searchParams.get("sort") || ""}
        className="outline-none border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 p-2 rounded-lg text-sm"
      >
        <option value="">مرتب‌سازی بر اساس...</option>
        <option value="newest">جدیدترین</option>
        <option value="oldest">قدیمی‌ترین</option>
        <option value="cheapest">ارزان‌ترین</option>
        <option value="expensive">گران‌ترین</option>
      </select>
    </div>
  );
};

export default SortFilter;

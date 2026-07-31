
"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Product from "@/components/module/product/Product";

const AllProductsPage = () => {
  const [products, setProducts] = useState([]); // لیست محصولات
  const [page, setPage] = useState(1); // شماره صفحه
  const [loading, setLoading] = useState(false); // وضعیت لودینگ
  const [hasMore, setHasMore] = useState(true); // آیا باز هم محصول هست؟
  const loaderRef = useRef(null);

  const limit = 8; // تعداد محصول در هر درخواست

  // تابع واکشی محصولات با مدیریت جلوگیری از تکرار


const fetchProducts = useCallback(async () => {
  if (loading || !hasMore) return;

  setLoading(true);

  try {
    const res = await fetch(`/api/products?page=${page}&limit=${limit}`);
    const data = await res.json();

    // ۱. اگر بک‌اِند آرایه خالی فرستاد، یعنی واقعاً تموم شده
    if (!data || data.length === 0) {
      setHasMore(false);
      setLoading(false);
      return;
    }

    // ۲. اگر تعداد محصولات برگشتی کمتر از حد انتظار (limit) بود، یعنی این صفحه آخر است
    if (data.length < limit) {
      setHasMore(false);
    }

    // اضافه کردن محصولات به لیست با حذف تکراری‌ها
    setProducts((prev) => {
      const all = [...prev, ...data];
      return Array.from(new Map(all.map(item => [item._id, item])).values());
    });

    setPage((prev) => prev + 1);

  } catch (error) {
    console.error("Fetch error:", error);
    setHasMore(false); // در صورت بروز خطا هم لودینگ را متوقف کن
  } finally {
    // یک تاخیر کوچک برای اینکه اسپینر ناگهانی غیب نشود و پرپر نزند
    setTimeout(() => {
      setLoading(false);
    }, 500); 
  }
}, [page, loading, hasMore]);
  // تنظیم ناظر اسکرول (Intersection Observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading && hasMore) {
          fetchProducts();
        }
      },
      { 
        rootMargin: "200px", // ۲۰۰ پیکسل مانده به انتها، لود را شروع کن تا پرش ایجاد نشود
        threshold: 0.1 
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchProducts, loading, hasMore]);

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen border-t border-gray-100">
   
      <header className="flex flex-col items-center mb-10">
        <h1 className="font-DanaDemiBold text-2xl md:text-3xl text-zinc-700 dark:text-white">
          همه محصولات
        </h1>
        <div className="w-16 h-1 bg-orange-400 rounded-full mt-2"></div>
      </header>

     
      <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {products.map((product) => (
          <Product key={product._id} {...product} />
        ))}
      </main>

      
      <div 
        ref={loaderRef} 
        className="h-40 flex items-center justify-center mt-10 transition-all duration-300"
      >
        {loading ? (
          <div className="flex flex-col items-center gap-y-3">
       
            <div className="w-10 h-10 border-4 border-zinc-200 border-t-orange-400 rounded-full animate-spin"></div>
            <p className="font-Dana text-sm text-zinc-500">در حال بارگزاری محصولات جدید...</p>

          </div>
        ) : (
          !hasMore && products.length > 0 && (
            <div className="flex flex-col items-center gap-y-2 opacity-70">
              <span className="text-2xl">☕</span>
              <p className="font-Dana text-zinc-400">تمام محصولات مشاهده شد</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AllProductsPage;
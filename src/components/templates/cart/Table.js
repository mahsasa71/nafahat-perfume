
"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { showSwal } from "@/utils/helpers";
import { useRouter } from "next/navigation";

const Table = ({ user }) => {
  const [mounted, setMounted] = useState(false);
  const [cart, setCart] = useState([]);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const router = useRouter();

  const getCartKey = () => (user?._id ? `cart_${user._id}` : "cart_guest");
  const getDiscountKey = () => (user?._id ? `discount_${user._id}` : "discount_guest");

  const refreshData = () => {
    if (typeof window !== "undefined") {
      const cartKey = getCartKey();
      const discountKey = getDiscountKey();
      const savedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
      const savedDiscount = JSON.parse(localStorage.getItem(discountKey)) || 0;

      setCart(savedCart);
      setDiscountPercent(Number(savedDiscount));
    }
  };

  useEffect(() => {
    setMounted(true);
    refreshData();
    window.addEventListener("cartUpdate", refreshData);
    return () => window.removeEventListener("cartUpdate", refreshData);
  }, [user?._id]);

  const subTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.count, 0);
  }, [cart]);

  const finalPrice = useMemo(() => {
    if (subTotal === 0) return 0;
    const discountAmount = (subTotal * discountPercent) / 100;
    return (subTotal - discountAmount) + 30000;
  }, [subTotal, discountPercent]);

  
  const resetDiscount = () => {
    setDiscountPercent(0);
    setDiscountCode("");
    localStorage.setItem(getDiscountKey(), "0");
    window.dispatchEvent(new Event("cartUpdate"));
  };

  const updateCount = (id, type) => {
    const newCart = cart.map(item => {
      if (item.id === id) {
        return { ...item, count: type === "plus" ? item.count + 1 : Math.max(1, item.count - 1) };
      }
      return item;
    });
    setCart(newCart);
    localStorage.setItem(getCartKey(), JSON.stringify(newCart));
    resetDiscount();
  };

  const removeItem = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    localStorage.setItem(getCartKey(), JSON.stringify(newCart));
    resetDiscount();
  };

  const applyDiscount = async () => {
    if (!discountCode.trim()) return showSwal("لطفا کد را وارد کنید", "error", "تلاش مجدد");
    if (cart.length === 0) return showSwal("سبد خرید خالی است", "error", "فهمیدم");

    try {
      const checkRes = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });

      const checkData = await checkRes.json();

      if (!checkRes.ok) {
        resetDiscount();
        return showSwal(checkData.message, "error", "اصلاح تعداد");
      }

      const res = await fetch("/api/discounts/use", {
        method: "PUT",

        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: discountCode }),
      });

      if (res.status === 200) {
        const data = await res.json();
        setDiscountPercent(data.percent);
        localStorage.setItem(getDiscountKey(), JSON.stringify(data.percent));
        window.dispatchEvent(new Event("cartUpdate"));
        showSwal("کد تخفیف با موفقیت اعمال شد", "success", "تایید");
      } else {
        showSwal("کد نامعتبر یا منقضی شده", "error", "تلاش مجدد");
      }
    } catch (err) {
      showSwal("خطا در سیستم", "error", "تلاش مجدد");
    }
  };


  const goToPayment = async () => {
    if (cart.length === 0) return showSwal("سبد خرید شما خالی است", "error", "تلاش مجدد");

    try {
        const checkRes = await fetch("/api/orders", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: cart }),
        });

        if (!checkRes.ok) {
            const checkData = await checkRes.json();
            resetDiscount();
            return showSwal(checkData.message, "error", "اصلاح سبد");
        }

        if (!user) {
            showSwal("لطفاً ابتدا وارد شوید", "warning", "ورود");
            return router.push("/login");
        }

        const res = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: cart, totalPrice: finalPrice }),
        });

     
        const data = await res.json(); 

        if (res.ok) {
            localStorage.removeItem(getCartKey());
            localStorage.removeItem(getDiscountKey());
            window.dispatchEvent(new Event("cartUpdate"));

           
            router.push(`/tasvieh?price=${finalPrice * 10}&orderID=${data.orderID}`);
        } else {
            showSwal(data.message || "خطا در ثبت سفارش", "error", "خطا");
        }
 
    } catch (err) {
        showSwal("خطای اتصال", "error", "تلاش مجدد");
    }
  };
  if (!mounted) return null;

  return (
    <div className="container mx-auto px-4 py-10 font-Dana">
      <div className="w-full overflow-x-auto">
        <table className="w-full bg-white border-b-2 border-black/10 text-black min-w-[700px]">
          <thead>
            <tr className="align-middle">
              <th className="p-4 border-b-2 border-black/10 font-bold">جمع جزء</th>
              <th className="p-4 border-b-2 border-black/10 font-bold">تعداد</th>
              <th className="p-4 border-b-2 border-black/10 font-bold">قیمت</th>
              <th className="p-4 border-b-2 border-black/10 font-bold text-right">محصول</th>
              <th className="p-4 border-b-2 border-black/10 font-bold">حذف</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="align-middle text-center border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4">{(item.count * item.price).toLocaleString("fa-IR")} تومان</td>
                <td className="p-4">
                  <div className="flex items-center justify-between border-2 border-black/10 w-28 mx-auto rounded-sm bg-white">
                    <span onClick={() => updateCount(item.id, "minus")} className="px-3 py-1 cursor-pointer border-l-2 hover:bg-[#34180e] hover:text-white transition-all select-none">-</span>
                    <p className="font-bold">{item.count.toLocaleString("fa-IR")}</p>

                    <span onClick={() => updateCount(item.id, "plus")} className="px-3 py-1 cursor-pointer border-r-2 hover:bg-[#34180e] hover:text-white transition-all select-none">+</span >
                  </div>
                </td>
                <td className="p-4 text-gray-500">{item.price.toLocaleString("fa-IR")} تومان</td>
                <td className="p-4 flex items-center justify-end gap-x-4 text-right">
                  <Link href={`/product/${item.id}`} className="text-sm hover:text-orange-300 transition-colors">
                    {item.name}
                  </Link>
<img 
  src={item.image || item.img || "/imges/products/p1.png"} 
  className="w-20 h-20 object-cover rounded-xl shrink-0" 
  alt={item.name} 
  onError={(e) => { e.target.src = "/imges/products/p1.png"; }}
/>                </td>
                <td className="p-4">
                  <IoMdClose className="text-xl cursor-pointer text-gray-400 hover:text-red-500 mx-auto" onClick={() => removeItem(item.id)} />
                </td>
              </tr>
            ))}
            {cart.length === 0 && (
              <tr>
                <td colSpan="5" className="p-20 text-center text-gray-400">سبد خرید شما خالی است. </td>
              </tr>
            )}
          </tbody>
        </table>

        <section className="flex flex-col md:flex-row items-center justify-between mt-6 gap-y-4">
          <button onClick={refreshData} className="bg-[#f3f3f3] text-[#3e3e3e] px-6 py-3 text-xs font-bold rounded-sm">
            بروزرسانی سبد خرید
          </button>
          <div className="flex items-center gap-x-2">
            <button onClick={applyDiscount} className="bg-[#008979] text-white px-8 py-3 text-sm font-medium rounded-sm hover:bg-[#711d1c] transition-all">
              اعمال کوپن
            </button>
            <input 
              type="text" 
              placeholder="کد تخفیف" 
              value={discountCode} 
              onChange={(e) => setDiscountCode(e.target.value)} 
              className="border border-black/10 p-3 w-56 rounded-sm outline-none focus:border-teal-500 text-right text-sm bg-white" 
            />
          </div>
        </section>
      </div>

      <div className="mt-12 flex justify-end">
        <div className="w-full md:w-96 border-2 border-black/5 p-6 rounded-lg bg-gray-50/50">
          <p className="text-lg font-bold border-b pb-4 mb-4">جمع کل سبد خرید</p>
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600">جمع جزء:</span>
            <span>{subTotal.toLocaleString("fa-IR")} تومان</span>
          </div>
          <div className="flex justify-between items-center mb-3 text-sm">
            <span className="text-gray-600">پیک موتوری:</span>
            <span className="font-bold">۳۰,۰۰۰ تومان</span>
          </div>
          {discountPercent > 0 && (
            <div className="flex justify-between items-center mb-3 text-red-600">
              <span>تخفیف ({discountPercent.toLocaleString("fa-IR")}%):</span>
              <span>- {((subTotal * discountPercent) / 100).toLocaleString("fa-IR")} تومان</span>
            </div>
          )}
          <div className="flex justify-between items-center border-t pt-4 mt-4 font-bold text-xl text-teal-700">
            <span>مجموع:</span>
            <span>{finalPrice.toLocaleString("fa-IR")} تومان</span>
          </div>

          <button 
            onClick={goToPayment} 
            className="w-full bg-[#008979] text-white py-4 mt-6 rounded-md font-bold hover:bg-teal-700 transition-all active:scale-95 shadow-md"
          >
            ادامه جهت تسویه حساب
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;

"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCopy, FaWhatsapp } from "react-icons/fa";

export default function TasviehContent() {
  const searchParams = useSearchParams();
  const [amount, setAmount] = useState(0);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    
    const priceFromUrl = searchParams.get("price");
    const idFromUrl = searchParams.get("orderID"); 
    if (priceFromUrl) {
      setAmount(Number(priceFromUrl));
    }

    if (idFromUrl) {
      setOrderId(idFromUrl);
    }
  }, [searchParams]);

  const cardNumber = "6037991756884965";
  const copyToClipboard = () => {
    navigator.clipboard.writeText(cardNumber);
    alert("شماره کارت کپی شد!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-Dana" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">تکمیل پرداخت</h1>

        <div className="bg-blue-50 border-r-4 border-blue-500 p-4 mb-6">
       
          {orderId ? (
            <div className="mb-4 bg-orange-100 border border-orange-300 text-orange-900 text-center py-3 rounded-xl font-black text-xl shadow-inner">
              شماره سفارش: {orderId}
            </div>
          ) : (
            <div className="mb-4 bg-gray-100 text-gray-500 text-center py-2 rounded-lg text-sm animate-pulse border border-gray-200">
              در حال دریافت اطلاعات سفارش...
            </div>
          )}

          <p className="text-blue-700 text-sm mb-1">مبلغ قابل پرداخت:</p>
          <p className="text-2xl font-black text-blue-900">
            {(amount / 10).toLocaleString("fa-IR")} <span className="text-sm font-normal">تومان</span>
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-100 p-4 rounded-xl relative">
            <p className="text-gray-500 text-xs mb-2 text-right">شماره کارت مقصد (بانک ملی):</p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold tracking-widest text-gray-700">{cardNumber}</span>
              <button onClick={copyToClipboard} className="text-blue-600 hover:bg-blue-100 p-2 rounded-lg transition-colors">
                <FaCopy size={20} />
              </button>
            </div>
          </div>

          <p className="text-gray-600 text-center text-sm leading-relaxed">
            لطفاً مبلغ فوق را واریز نمایید و تصویر فیش را به همراه <span className="font-bold text-orange-700">شماره سفارش {orderId || ""}</span> به واتس‌اپ ارسال کنید.
          </p>

                 <p className="text-gray-600 text-center text-2xl leading-relaxed">
           لطفا توجه داشته باشید مبلغ را حداکثر<span className="font-bold text-orange-700">   یک روز</span>بعد از ثبت سفارش باید واریز نمایید در غیر این صورت سفارش شما کنسل میشود
          </p>


          <div className="text-xl font-bold text-center text-green-600 bg-green-50 py-2 rounded-lg border border-green-200">
            09011289066

          </div>

          <a 
            href={`https://wa.me/989011289066?text=سلام، فیش واریزی برای سفارش شماره ${orderId || "نامشخص"} ارسال شد.`} 
            target="_blank" 
            className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-all shadow-md"
          >
            <FaWhatsapp size={20} /> ارسال فیش در واتس‌اپ
          </a>
        </div>
      </div>
    </div>
  );
}
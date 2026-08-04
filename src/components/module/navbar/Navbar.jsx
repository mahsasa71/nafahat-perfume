"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import swal from "sweetalert";


export default function Header({ isLogin, user}) {
     const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [mobileCartOpen, setMobileCartOpen] = useState(false); 

  const [cart, setCart] = useState([]);
    const [discount, setDiscount] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [iswarmMenuOpen, setIswarmMenuOpen] = useState(false);
  const [isbitterMenuOpen, setIsbitterMenuOpen] = useState(false);
  const [issweetMenuOpen, setIssweetMenuOpen] = useState(false);
  const [iscoldMenuOpen, setIscoldMenuOpen] = useState(false);
  const [iskidsMenuOpen, setIskidsMenuOpen] = useState(false);


   const [totalPrice, setTotalPrice] = useState(0);
     useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(localCart);
  }, []);

    useEffect(calcTotalPrice, [cart, discountPercent]); 

  useEffect(() => {
  const localCart = JSON.parse(localStorage.getItem("cart")) || [];
  setCart(localCart);
  const savedDiscount = JSON.parse(localStorage.getItem("discountPercent")) || 0;
  setDiscountPercent(savedDiscount);
}, []);



function calcTotalPrice() {
  let price = 0;
  if (cart.length > 0) {
 
    const subTotal = cart.reduce((prev, current) => prev + current.price * current.count, 0);

 
    const discountAmount = (subTotal * discountPercent) / 100;

  
    price = (subTotal - discountAmount) + 30000;
  }
  setTotalPrice(price);
}

  const checkDiscount = async () => {


    const res = await fetch("api/discounts/use", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: discount }),
    });

    console.log("Response ->", res);

    if (res.status === 404) {
      return showSwal("کد تخفیف وارد شده معتبر نیست", "error", "تلاش مجدد");
    } else if (res.status === 422) {
      return showSwal("کد تخفیف وارد شده منقضی شده", "error", "تلاش مجدد");
    } else if (res.status === 200) {
  const discountCode = await res.json();
  

  setDiscountPercent(discountCode.percent);
  localStorage.setItem("discountPercent", JSON.stringify(discountCode.percent));
  
  return showSwal("کد تخفیف با موفقیت اعمال شد", "success", "فهمیدم");
}
  };



const updateCount = (e, id, type) => {
  e.preventDefault(); 
  e.stopPropagation(); 

  const cartKey = user?._id ? `cart_${user._id}` : "cart_guest";
  const newCart = cart.map((item) => {
    if (item.id === id) {
      if (type === "plus") return { ...item, count: item.count + 1 };
      if (type === "minus" && item.count > 1) return { ...item, count: item.count - 1 };
    }
    return item;
  });

  setCart(newCart);
  localStorage.setItem(cartKey, JSON.stringify(newCart));
  window.dispatchEvent(new Event("cartUpdate"));
};

const removeItem = (e, id) => {
  e.preventDefault();
  e.stopPropagation();

  const cartKey = user?._id ? `cart_${user._id}` : "cart_guest";
  const newCart = cart.filter(item => item.id !== id);
  
  setCart(newCart);
  localStorage.setItem(cartKey, JSON.stringify(newCart));
  window.dispatchEvent(new Event("cartUpdate"));
};




const goToPayment = () => {
  if (cart.length === 0) {
    return showSwal("سبد خرید شما خالی است", "error", "تلاش مجدد");
  }

  
  if (!user) {
    return router.push("/login");
  }

 
  const finalAmountRial = (totalPrice + 30000) * 10;
  router.push(`/tasvieh?price=${finalAmountRial}`);
  
};


useEffect(() => {

  if (user?._id) {
    const guestCart = JSON.parse(localStorage.getItem("cart_guest") || "[]");
    const userKey = `cart_${user._id}`;
    const userCart = JSON.parse(localStorage.getItem(userKey) || "[]");

    if (guestCart.length > 0) {
     
      const mergedCart = [...userCart];
      guestCart.forEach(guestItem => {
        const existingItem = mergedCart.find(uItem => uItem.id === guestItem.id);
        if (existingItem) {
          existingItem.count += guestItem.count;
        } else {
          mergedCart.push(guestItem); 
        }
      });

    
      localStorage.setItem(userKey, JSON.stringify(mergedCart));
      localStorage.removeItem("cart_guest");

    
      setCart(mergedCart);
      
   
      window.dispatchEvent(new Event("cartUpdate"));
    }
  }
}, [user]);



const refreshCart = () => {

  const cartKey = user ? `cart_${user._id}` : "cart_guest";
  const localCart = JSON.parse(localStorage.getItem(cartKey)) || [];
  setCart(localCart);
  

  const discountKey = user ? `discount_${user._id}` : "discount_guest";
  const savedDiscount = JSON.parse(localStorage.getItem(discountKey)) || 0;
  setDiscountPercent(savedDiscount);
};

useEffect(() => {

  refreshCart();


  window.addEventListener("cartUpdate", refreshCart);
  

  window.addEventListener("storage", refreshCart);

  return () => {
    window.removeEventListener("cartUpdate", refreshCart);
    window.removeEventListener("storage", refreshCart);
  };
}, []);


  const handleOverlayClick = () => {
    if (mobileNavOpen) setMobileNavOpen(false);
    if (mobileCartOpen) setMobileCartOpen(false);
  };

  const preventLink = (e) => e.preventDefault();


const logoutHandler = () => {
  swal({
    title: "آیا از خروج اطمینان دارید؟",
    icon: "warning",
    buttons: ["نه", "آره"],
  }).then(async (result) => {
    if (result) {
     
      const cartKey = user ? `cart_${user._id}` : "cart_guest";
      const discountKey = user ? `discount_${user._id}` : "discount_guest";

      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });

      if (res.status === 200) {
localStorage.removeItem("cart"); 
localStorage.removeItem("discountPercent");


window.dispatchEvent(new Event("cartUpdate"));

swal({
  title: "با موفقیت خارج شدید",
  icon: "success",
  buttons: "فهمیدم",
}).then(() => {
 
  window.location.href = "/"; 
});
      }
    }
  });
};

  return (
    <>
      <header className="fixed z-50 top-9 right-0 left-0 hidden md:flex items-center justify-between w-[98%] lg:w-[90%] h-16 py-3   lg:h-24 rounded-3xl mx-auto px-5 lg:px-10 bg-black/50 backdrop-blur-[6px]">
        <div className="flex justify-between w-full">
          <nav className="flex h-14 items-center gap-x-6 lg:gap-x-9">
<div className="shrink-0">
  <img 
    src="/imges/svgs/logo3.png" 
    alt="Logo" 
    className="h-12 md:h-16 w-auto object-contain rounded" 
  />
</div>
            <ul className="flex items-center h-full gap-x-3 lg:gap-x-9 text-sm xl:text-xl text-nowrap text-gray-300 tracking-tightest *:leading-[56px]">
              <li>
                {/* <a
                  href="#"
                  onClick={preventLink}
                  className="font-medium text-orange-200"
                >
                  صفحه اصلی
                </a> */}
                <Link
  href="/"
  className="font-medium text-orange-200"
>
  صفحه اصلی
</Link>
              </li>
              <li className="relative group">
                <a
                  href="#"
                  onClick={preventLink}
                  className="transition-colors group-hover:text-orange-300"
                >
                  کتگوری محصولات
                </a>
                <div className="absolute top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all delay-75 w-52 bg-white p-6 space-y-4 dark:bg-zinc-700 text-zinc-700 dark:text-white text-base rounded-2xl border-t-[3px] border-t-orange-300 shadow-normal flex flex-col">

  

<div className="relative group/submenu">
  <div className="flex items-center justify-between hover:text-orange-300 transition-colors cursor-pointer">
    <span>گرم</span>
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
    </svg>
  </div>

  <div className="absolute right-full top-0 mr-2 opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all w-40 bg-white dark:bg-zinc-700 p-4 space-y-3 rounded-xl border-r-2 border-orange-300 shadow-lg flex flex-col">


    <Link href="/category?suitableFor=women" className="hover:text-orange-300 transition-colors">
      همه
    </Link>

   
    <Link href="/category?suitableFor=women&type=گرم" className="hover:text-orange-300 transition-colors">
     زنانه
    </Link>

    <Link href="/category?suitableFor=men&type=گرم" className="hover:text-orange-300 transition-colors">
      مردانه
    </Link>
  </div>
</div>



<div className="relative group/submenu">
  <div className="flex items-center justify-between hover:text-orange-300 transition-colors cursor-pointer">
    <span>تلخ </span>
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
    </svg>
  </div>

  <div className="absolute right-full top-0 mr-2 opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all w-40 bg-white dark:bg-zinc-700 p-4 space-y-3 rounded-xl border-r-2 border-orange-300 shadow-lg flex flex-col">


    <Link href="/category?suitableFor=women" className="hover:text-orange-300 transition-colors">
      همه
    </Link>

   
    <Link href="/category?suitableFor=men&type=تلخ" className="hover:text-orange-300 transition-colors">
    مردانه
    </Link>

    <Link href="/category?suitableFor=women&type=تلخ" className="hover:text-orange-300 transition-colors">
      زنانه
    </Link>
  </div>
</div>


<div className="relative group/submenu">
  <div className="flex items-center justify-between hover:text-orange-300 transition-colors cursor-pointer">
    <span>شیرین</span>
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
    </svg>
  </div>

  <div className="absolute right-full top-0 mr-2 opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all w-40 bg-white dark:bg-zinc-700 p-4 space-y-3 rounded-xl border-r-2 border-orange-300 shadow-lg flex flex-col">


    <Link href="/category?suitableFor=men" className="hover:text-orange-300 transition-colors">
      همه
    </Link>

   
    <Link href="/category?suitableFor=men&type=شیرین" className="hover:text-orange-300 transition-colors">
     مردانه
    </Link>

    <Link href="/category?suitableFor=women&type=شیرین" className="hover:text-orange-300 transition-colors">
      زنانه
    </Link>
  </div>
</div>

<div className="relative group/submenu">
  <div className="flex items-center justify-between hover:text-orange-300 transition-colors cursor-pointer">
    <span>خنک</span>
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
    </svg>
  </div>

  <div className="absolute right-full top-0 mr-2 opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all w-40 bg-white dark:bg-zinc-700 p-4 space-y-3 rounded-xl border-r-2 border-orange-300 shadow-lg flex flex-col">


    <Link href="/category?suitableFor=men" className="hover:text-orange-300 transition-colors">
      همه
    </Link>

   
    <Link href="/category?suitableFor=men&type=خنک" className="hover:text-orange-300 transition-colors">
     مردانه
    </Link>

    <Link href="/category?suitableFor=women&type=خنک" className="hover:text-orange-300 transition-colors">
      زنانه
    </Link>
  </div>
</div>
                </div>
              </li>

              <li>
                <Link href="/p-admin" className="flex items-center gap-x-2">
                  ورود به پنل مدیریت
                </Link>
              </li>

              <li>
                <a href="#" onClick={preventLink}>
                  تماس با ما
                </a>
              </li>





<li className="relative group">

 
  <Link
    href="/cart"
    onClick={preventLink}
    className="flex items-center gap-x-2 transition-colors group-hover:text-orange-300 py-4"
  >
    <div className="relative">
      <svg className="w-8 h-8 text-white group-hover:text-orange-300 transition-colors hidden lg:block">
        <use href="#shopping-cart"></use>
      </svg>
    
      {cart.length > 0 && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-300 text-[10px] font-bold text-zinc-800 font-Dana leading-none">
          {cart.reduce((total, item) => total + item.count, 0)}
        </span>
      )}
    </div>
    <span className="text-gray-300 group-hover:text-orange-300 transition-colors">سبد خرید</span>
  </Link>

  
  
  <div className="absolute top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all delay-75 w-96 bg-white dark:bg-zinc-700 p-5 rounded-2xl border-t-[3px] border-t-orange-300 shadow-normal z-50 mt-1">

    {cart.length > 0 ? (
      <>
    
        <div className="flex items-center justify-between text-xs text-gray-400 pb-4 border-b border-b-gray-100 dark:border-b-white/10 font-Dana">
          <span>{cart.length} مورد</span>
          <Link href="/cart" className="text-orange-300 flex items-center gap-x-1 hover:text-orange-400 transition-colors">
            مشاهده سبد خرید
            <svg className="w-4 h-4"><use href="#chevron-left"></use></svg>
          </Link>
        </div>

     
        <div className="py-5 max-h-64 overflow-y-auto space-y-4 custom-scrollbar">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-x-3 pb-4 border-b border-b-gray-100 dark:border-b-white/5 last:border-0 last:pb-0">
         
              {/* <img 
                src={item.img || "/imges/products/p1.png"} 
                className="w-20 h-20 object-cover rounded-xl shrink-0" 
                alt={item.name} 
              /> */}

              <img 
  src={item.image || item.img || "/imges/products/p1.png"} 
  className="w-20 h-20 object-cover rounded-xl shrink-0" 
  alt={item.name} 
  onError={(e) => { e.target.src = "/imges/products/p1.png"; }}
/>


              <div className="flex flex-col justify-between w-full font-Dana">
             
                <h4 className="text-zinc-700 dark:text-white text-sm font-DanaMedium line-clamp-1">
                  {item.name}
                </h4>

                <div className="flex items-center justify-between mt-2">
                
                  <div className="text-zinc-700 dark:text-white font-bold text-base">
                    {(item.price * item.count).toLocaleString()} 
                    <span className="text-[10px] font-normal opacity-70 mr-1">تومان</span>
                  </div>

                 
                  <div className="flex items-center bg-gray-100 dark:bg-white/10 rounded-lg px-2 py-1 gap-x-3">

                    <button 
    onClick={(e) => removeItem(e, item.id)} 
    className="text-gray-400 hover:text-red-500 transition-colors"
  >
  حذف 
  </button>

                    <button 
                       onClick={(e) => updateCount(e, item.id, "plus")}

                      className="text-emerald-500 hover:bg-emerald-500/10 rounded w-6 h-6 flex items-center justify-center transition-all active:scale-90"
                    >
                      +
                    </button>

                    
                    <span className="text-zinc-700 dark:text-white text-sm font-DanaMedium">{item.count}</span>

                    <button 
                    onClick={(e) => updateCount(e, item.id, "minus")}

                      className="text-red-500 hover:bg-red-500/10 rounded w-6 h-6 flex items-center justify-center transition-all active:scale-90"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        
        <div className="flex items-center justify-between pt-5 border-t border-t-gray-100 dark:border-t-white/10 font-Dana">
          <div className="flex flex-col">
            <span className="text-gray-400 text-[10px]">مبلغ قابل پرداخت</span>
            <div className="text-zinc-700 dark:text-white font-bold text-lg">
              {totalPrice.toLocaleString()} 
              <span className="text-xs font-normal mr-1">تومان</span>
            </div>
          </div>
          {/* <button 
            onClick={goToPayment} 
            
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl transition-all font-DanaMedium text-sm"
          >
            ثبت سفارش
          </button> */}

<Link
  href="/cart"
  className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl transition-all font-DanaMedium text-sm"
>
  ثبت سفارش
</Link>
        </div>
      </>
    ) : (

      <div className="text-center py-8 font-Dana text-zinc-500">
        <p>سبد خرید شما خالی است </p>
      </div>
    )}
  </div>


</li>

                      
            </ul>
          </nav>

          <span className="w-px h-14 block bg-white/20"></span>

          <div className="flex items-center  gap-x-5 xl:gap-x-10 text-sm lg:text-xl tracking-tightest">
            {isLogin ? (
              <>
                <Link
                  href="/p-user"
                  className="font-sm bg-black/1  text-white px-1 py-1 rounded-sm text-nowrap hover:underline"
                >
                  {user.name || user.firstName}
                </Link>
                <button
                  // onClick={logout}
                     onClick={logoutHandler}
                  className="flex items-center gap-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  خروج
                  <svg className="w-5 h-5 rotate-180" fill="currentColor">
                    <use href="#arrow-left"></use>
                  </svg>
                </button>
              </>
            ) : (
              <span className="inline-block">
                <Link
                  href="/login"
                  className="text-orange-200 hover:text-orange-300"
                >
                  ورود
                </Link>
                {" | "}
                <Link
                  href="/register"
                  className="text-orange-200 hover:text-orange-300"
                >
                  ثبت نام
                </Link>
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="flex fixed z-50 top-2 right-1 left-1 rounded bg-black/40 backdrop-blur-[4px] items-center justify-between h-15 px-4 md:hidden  dark:bg-zinc-700">
        <div onClick={() => setMobileNavOpen(true)} className="cursor-pointer">
          <svg className="nav-icon w-6 h-6 text-orange-300 dark:text-white">
            <use href="#bars-3"></use>
          </svg>
        </div>
        <div >
  <img 
    src="/imges/svgs/logo3.png" 
    alt="Logo" 
    className="h-17 w-17 object-contain rounded" 
  />
        </div>



  <div onClick={() => setMobileCartOpen(true)} className="relative cursor-pointer">
    <svg className="w-6 h-6 text-orange-300">
      <use href="#shopping-cart"></use>
    </svg>
    {cart.length > 0 && (
      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-300 text-[10px] text-zinc-800 font-Dana">
        {cart.reduce((total, item) => total + item.count, 0)}
      </span>
    )}
  </div>

      </div>

      {(mobileNavOpen || mobileCartOpen) && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={handleOverlayClick}
        ></div>
      )}

      <div
        className={`nav p-3 overflow-y-auto fixed top-0 bottom-0 w-64 h-full md:hidden bg-white dark:bg-zinc-700 z-50 transition-all ${mobileNavOpen ? "right-0" : "-right-64"}`}
      >
        <div className="flex items-center justify-between pb-5 mb-6 border-b text-[#FDBA74] border-b-gray-100 dark:border-b-white/10">
    <img 
    src="/imges/svgs/logo3.png" 
    alt="Logo" 
    className="h-17 w-37 object-contain rounded" 
  />
          <div
            className="nav-CloseBtn cursor-pointer"
            onClick={() => setMobileNavOpen(false)}
          >
            <svg className="w-5 h-5 text-zinc-600 dark:text-white">
              <use href="#xmark"></use>
            </svg>
          </div>
        </div>

        {/* <a
          href="#"
          className="flex items-center gap-x-2 bg-orange-200/20 text-orange-300 pr-2.5 h-10 rounded-md mb-4"
          onClick={preventLink}
        >
          <svg className="w-5 h-5">
            <use href="#home"></use>
          </svg>
          <span>صفحه اصلی</span>
        </a> */}

<Link
  href="/"
  onClick={() => setMobileNavOpen(false)}
  className="flex items-center gap-x-2"
>
  صفحه اصلی
</Link>
<ul className=":pr-2.5 space-y-6 text-zinc-600 dark:text-white">
  <li>
    <div className="flex items-center justify-between cursor-pointer" >
      <div className="flex items-center gap-x-2">
        <svg className="w-5 h-5"><use href="#shopping-cart"></use></svg>
        <span>فروشگاه</span>
      </div>
    </div>

    
    <div className="submenu flex flex-col gap-y-4 pr-6 mt-4 border-r border-gray-200 dark:border-white/10">

    
      <div className="flex flex-col">
        <div 
          className="flex items-center justify-between hover:text-orange-300 transition-colors cursor-pointer"
          onClick={() => setIswarmMenuOpen(!iswarmMenuOpen)} // با کلیک باز و بسته می‌شود
        >
          <span className="font-DanaMedium">گرم</span>
          <svg 
            className={`w-4 h-4 transition-transform duration-300 ${iswarmMenuOpen ? "rotate-180" : "rotate-[-90deg]"}`} 
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>

     
        <div className={`flex flex-col gap-y-3 mt-3 pr-4 text-sm text-gray-500 dark:text-gray-400 overflow-hidden transition-all ${iswarmMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
          <Link href="/category?suitableFor=women" onClick={() => setMobileNavOpen(false)}>همه محصولات</Link>
          <Link href="/category?suitableFor=women&type=گرم" onClick={() => setMobileNavOpen(false)}>زنانه</Link>
          <Link href="/category?suitableFor=men&type=گرم" onClick={() => setMobileNavOpen(false)}>مردانه</Link>
        </div>
      </div>

    
          <div className="flex flex-col">
        <div 
          className="flex items-center justify-between hover:text-orange-300 transition-colors cursor-pointer"
   
          onClick={() => setIsbitterMenuOpen(!isbitterMenuOpen)}
        >
          <span className="font-DanaMedium">تلخ</span>
          <svg 
            className={`w-4 h-4 transition-transform duration-300 ${isbitterMenuOpen ? "rotate-180" : "rotate-[-90deg]"}`} 
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>

     
        <div className={`flex flex-col gap-y-3 mt-3 pr-4 text-sm text-gray-500 dark:text-gray-400 overflow-hidden transition-all ${ isbitterMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
          <Link href="/category?suitableFor=women" onClick={() => setMobileNavOpen(false)}>همه محصولات</Link>
          <Link href="/category?suitableFor=women&type=تلخ" onClick={() => setMobileNavOpen(false)}>زنانه</Link>
          <Link href="/category?suitableFor=men&type=تلخ" onClick={() => setMobileNavOpen(false)}>مردانه</Link>
        </div>
      </div>


    

<div className="flex flex-col">
  <div 
    className="flex items-center justify-between hover:text-orange-300 transition-colors cursor-pointer"
    onClick={() => setIssweetMenuOpen(!issweetMenuOpen)} 
  >
    <span className="font-DanaMedium">شیرین</span>
    <svg 
      className={`w-4 h-4 transition-transform duration-300 ${issweetMenuOpen ? "rotate-180" : "rotate-[-90deg]"}`} 
      fill="none" stroke="currentColor" viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </div>


  <div className={`flex flex-col gap-y-3 mt-3 pr-4 text-sm text-gray-500 dark:text-gray-400 overflow-hidden transition-all duration-300 ${issweetMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
    <Link href="/category?type=شیرین" onClick={() => setMobileNavOpen(false)}>همه محصولات</Link>
    <Link href="/category?suitableFor=women&type=شیرین" onClick={() => setMobileNavOpen(false)}>زنانه</Link>
    <Link href="/category?suitableFor=men&type=شیرین" onClick={() => setMobileNavOpen(false)}>مردانه</Link>
  </div>
</div>




<div className="flex flex-col">
  <div 
    className="flex items-center justify-between hover:text-orange-300 transition-colors cursor-pointer"
    onClick={() => setIscoldMenuOpen(!iscoldMenuOpen)} 
  >
    <span className="font-DanaMedium">خنک</span>
    <svg 
      className={`w-4 h-4 transition-transform duration-300 ${iscoldMenuOpen ? "rotate-180" : "rotate-[-90deg]"}`} 
      fill="none" stroke="currentColor" viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </div>


  <div className={`flex flex-col gap-y-3 mt-3 pr-4 text-sm text-gray-500 dark:text-gray-400 overflow-hidden transition-all duration-300 ${iscoldMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
    <Link href="/category?type=خنک" onClick={() => setMobileNavOpen(false)}>همه محصولات</Link>
    <Link href="/category?suitableFor=women&type=خنک" onClick={() => setMobileNavOpen(false)}>زنانه</Link>
    <Link href="/category?suitableFor=men&type=خنک" onClick={() => setMobileNavOpen(false)}>مردانه</Link>
  </div>
</div>

    </div>
  </li>

  <li>
    <Link href="/p-admin" className="flex items-center gap-x-2">
      ورود به پنل مدیریت
    </Link>
  </li>
</ul>

        <div className="flex flex-col items-start gap-y-6 text-orange-300 px-2.5 py-8 mt-8 border-t border-t-gray-100 dark:border-t-white/10">
          {isLogin ? (
            <>
              <Link
                href="/p-user/information"
                className="font-medium hover:underline text-orange-400"
              >
                {user.name || user.firstName}
              </Link>
              <button
                // onClick={logout}
                 onClick={logoutHandler}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                خروج
                <svg className="w-5 h-5 rotate-180" fill="currentColor">
                  <use href="#arrow-left"></use>
                </svg>
              </button>
            </>
          ) : (
            <span className=" xl:inline-block">
              <Link
                href="/login"
                className="text-orange-200 hover:text-orange-300"
              >
                ورود
              </Link>
              {" | "}
              <Link
                href="/register"
                className="text-orange-200 hover:text-orange-300"
              >
                ثبت نام
              </Link>
            </span>
          )}
        </div>
      </div>
      
<div
  className={`fixed top-0 bottom-0 w-72 h-full md:hidden bg-white dark:bg-zinc-700 z-50 transition-all duration-300 p-4 flex flex-col ${
    mobileCartOpen ? "left-0" : "-left-72"
  }`}
>

  <div className="flex items-center justify-between pb-5 mb-5 border-b border-b-gray-100 dark:border-b-white/10">
    <div className="cursor-pointer" onClick={() => setMobileCartOpen(false)}>
      <svg className="w-5 h-5 text-zinc-600 dark:text-white">
        <use href="#xmark"></use>
      </svg>
    </div>
    <span className="font-DanaMedium text-zinc-700 dark:text-white">سبد خرید</span>
  </div>

  {cart.length > 0 ? (
    <>
      
      <div className="flex-grow overflow-y-auto space-y-4 pr-1 custom-scrollbar">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-x-3 pb-4 border-b border-b-gray-100 dark:border-b-white/5">
            {/* <img 
              src={item.img || "/imges/products/p1.png"} 
              className="w-20 h-20 object-cover rounded-xl shrink-0" 
              alt={item.name} 
            /> */}


<img 
  src={item.image || item.img || "/imges/products/p1.png"} 
  className="w-20 h-20 object-cover rounded-xl shrink-0" 
  alt={item.name} 
  onError={(e) => { e.target.src = "/imges/products/p1.png"; }}
/>
            <div className="flex flex-col justify-between w-full font-Dana">
              <h4 className="text-zinc-700 dark:text-white text-xs font-DanaMedium line-clamp-2">
                {item.name}
              </h4>

<div className="flex items-center justify-between mt-2">
  <div className="flex flex-col">
    <span className="text-orange-300 font-bold text-sm">
      {(item.price * item.count).toLocaleString()}
    </span>
    <span className="text-[10px] text-gray-400">تومان</span>
  </div>

  <div className="flex items-center bg-gray-100 dark:bg-white/10 rounded-lg px-2 py-1 gap-x-2">
 
    <button 
      onClick={(e) => removeItem(e, item.id)} 
      className="text-gray-400 hover:text-red-500 transition-colors ml-1"
    >
حذف
    </button>

    <div className="flex items-center gap-x-3 border-r border-gray-300 dark:border-white/10 pr-2">
      <button onClick={(e) => updateCount(e, item.id, "plus")} className="text-emerald-500 font-bold">+</button>
      <span className="text-xs text-zinc-700 dark:text-white">{item.count}</span>
      <button onClick={(e) => updateCount(e, item.id, "minus")} className="text-red-500 font-bold">-</button>
    </div>
  </div>
</div>

            </div>
          </div>
        ))}
      </div>

   
      <div className="mt-auto pt-5 border-t border-t-gray-100 dark:border-t-white/10">
        <div className="flex items-center justify-between mb-5 font-Dana">
          <div className="flex flex-col">
             <span className="text-gray-400 text-[10px]">مبلغ قابل پرداخت:</span>
             <span className="text-zinc-700 dark:text-white font-bold text-lg">
               {totalPrice.toLocaleString()} <small className="text-xs font-normal">تومان</small>
             </span>
          </div>
        </div>
        {/* <button 
          onClick={goToPayment}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3.5 rounded-xl font-DanaMedium transition-colors"
        >
          ادامه فرایند خرید
        </button> */}

        <Link
  href="/cart"
  onClick={() => setMobileCartOpen(false)}
  className="block text-center w-full bg-teal-600 hover:bg-teal-700 text-white py-3.5 rounded-xl font-DanaMedium transition-colors"
>
  ادامه فرایند خرید
</Link>
      </div>
    </>
  ) : (
  
    <div className="flex flex-col items-center justify-center h-full gap-y-4 font-Dana">
      <svg className="w-16 h-16 text-gray-300"><use href="#shopping-cart"></use></svg>
      <p className="text-zinc-500 text-sm">سبد خرید شما خالی است 
      </p>
      <button 
        onClick={() => setMobileCartOpen(false)}
        className="text-orange-300 text-xs border border-orange-300 px-4 py-2 rounded-lg"
      >
        برو به فروشگاه
      </button>
    </div>
  )}
</div>

    </>
  );
}

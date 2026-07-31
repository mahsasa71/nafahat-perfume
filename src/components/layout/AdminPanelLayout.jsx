import React from "react";
import SideBar from "@/components/module/p-admin/Sidebar";
import { redirect } from "next/navigation";
import { authUser } from "@/utils/serverHelpers";

const Layout = async ({ children }) => {
  const user = await authUser();
  if (user) {
    if (user.role !== "ADMIN") {
      return redirect("/login");
    }
  } else {
    return redirect("/login");
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen" dir="rtl">
      
      <SideBar />

     
      <main className="flex-1 md:w-2/3 bg-gray-100 p-4 overflow-auto min-h-screen">
{children}   
   </main>
    </div>
  );
};

export default Layout;

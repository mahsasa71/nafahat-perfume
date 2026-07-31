
import React from "react";
import Sidebar from "@/components/module/p-user/Sidebar";
import Topbar from "@/components/module/p-user/Topbar";
import { authUser } from "@/utils/serverHelpers";
import { redirect } from "next/navigation";

const Layout = async ({ children }) => {
  const user = await authUser();
  if (!user) {
    redirect("/login-register");
  }

 
  const plainUser = JSON.parse(JSON.stringify(user));

  return (
    <div className="bg-gray-50 min-h-screen w-full font-shabnam" dir="rtl">
      <section className="flex">
       
        <Sidebar user={plainUser} />

    
        <div className="flex-1 w-full min-w-0 flex flex-col">
          {/* <Topbar user={plainUser} /> */}

         
          <main className="p-4 md:p-10">
            {children}
          </main>
        </div>
      </section>
    </div>
  );
};

export default Layout;
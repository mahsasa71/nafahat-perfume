"use client";
import { showSwal } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";

function AddToWishlist({ productID, user }) { 
  const addToWishlist = async (event) => {
    event.preventDefault();
    
    
    if (!user?._id) {
      return showSwal(
        "برای اضافه کردن به علاقه مندی‌ها لطفا ابتدا لاگین بکنین",
        "error",
        "فهمیدم"
      );
    }

    const wish = {
      user: user._id,
      product: productID,
    };

    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wish),
    });

    if (res.status === 201) {
      showSwal("محصول مورد نظر به علاقه‌مندی‌ها اضافه شد", "success", "فهمیدم");
    }
  };

  return (
    <div onClick={addToWishlist} style={{ cursor: 'pointer' }}>
      <CiHeart />
      <span>افزودن به علاقه مندی ها</span>
    </div>
  );
}
export default AddToWishlist;

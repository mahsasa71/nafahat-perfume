"use client";
import React, { useState, useEffect } from "react";
import styles from "./table.module.css";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

function AddProduct({ editProduct, onCancel }) {
  const router = useRouter();

  
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [inventory, setInventory] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [suitableFor, setSuitableFor] = useState("");
  const [smell, setSmell] = useState("");
  const [tags, setTags] = useState("");

  const [imgs, setImgs] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  
  useEffect(() => {
    if (editProduct) {
      setName(editProduct.name || "");
      setPrice(editProduct.price || "");
      setInventory(editProduct.inventory || "");
      setShortDescription(editProduct.shortDescription || "");
      setLongDescription(editProduct.longDescription || "");
      setWeight(editProduct.weight || "");
      setSuitableFor(editProduct.suitableFor || "");
      setSmell(editProduct.smell || "");
      setTags(
        Array.isArray(editProduct.tags)
          ? editProduct.tags.join(",")
          : editProduct.tags || "",
      );
    } else {
      resetFields();
    }
  }, [editProduct]);

  const resetFields = () => {
    setName("");
    setPrice("");
    setInventory("");
    setShortDescription("");
    setLongDescription("");
    setWeight("");
    setSuitableFor("");
    setSmell("");
    setTags("");
    setImgs([]);
    setFileInputKey(Date.now());
  };

  const submitHandler = async () => {
    if (!name || !price || !inventory) {
      return swal("لطفاً فیلدهای اصلی (نام، قیمت، موجودی) را وارد کنید", {
        icon: "error",
      });
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("inventory", inventory);
    formData.append("shortDescription", shortDescription);
    formData.append("longDescription", longDescription);
    formData.append("weight", weight);
    formData.append("suitableFor", suitableFor);
    formData.append("smell", smell);
    formData.append("tags", tags);

    Array.from(imgs).forEach((file) => {
      formData.append("images", file);
    });

    const url = editProduct
      ? `/api/products/${editProduct._id}`
      : "/api/products";
    const method = editProduct ? "PUT" : "POST";

    const res = await fetch(url, { method, body: formData });

    if (res.ok) {
      swal({
        title: editProduct
          ? "تغییرات با موفقیت ذخیره شد"
          : "محصول با موفقیت ایجاد شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        resetFields();
        if (onCancel) onCancel(); 
        router.refresh();
      });
    } else {
      swal("خطایی رخ داد", { icon: "error" });
    }
  };

  return (
    <section className={styles.discount}>
      <p>
        {editProduct
          ? `ویرایش محصول: ${editProduct.name}`
          : "افزودن محصول جدید"}
      </p>
      <div className={styles.discount_main}>
        <div>
          <label>نام محصول</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </div>
        <div>
          <label>مبلغ محصول</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
          />
        </div>
        <div>
          <label>موجودی انبار</label>
          <input
            value={inventory}
            onChange={(e) => setInventory(e.target.value)}
            type="number"
          />
        </div>
        <div>
          <label>توضیحات کوتاه</label>
          <input
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            type="text"
          />
        </div>
        <div>
          <label>توضیحات بلند</label>
          <input
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
            type="text"
          />
        </div>
        <div>
          <label>وزن</label>
          <input
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            type="text"
          />
        </div>
        <div>
          <label>مناسب برای:</label>
          <input
            value={suitableFor}
            onChange={(e) => setSuitableFor(e.target.value)}
            type="text"
          />
        </div>
        <div>
          <label>میزان بو</label>
          <input
            value={smell}
            onChange={(e) => setSmell(e.target.value)}
            type="text"
          />
        </div>
        <div>
          <label>تگ های محصول</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="مثال: ادکلن، عطر"
            type="text"
          />
        </div>
        <div>
          <label>
            تصاویر محصول{" "}
            {editProduct && "(فقط در صورت تغییر عکس‌های جدید انتخاب کنید)"}
          </label>
          <input
            key={fileInputKey}
            onChange={(e) => setImgs(e.target.files)}
            type="file"
            multiple
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={submitHandler} className={styles.add_btn}>
          {editProduct ? "ذخیره تغییرات" : "افزودن محصول"}
        </button>
        {editProduct && (
          <button
            onClick={onCancel}
            className={styles.delete_btn}
            style={{ marginTop: "20px" }}
          >
            انصراف
          </button>
        )}
      </div>
    </section>
  );
}

export default AddProduct;

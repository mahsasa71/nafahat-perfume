
import styles from "./latest.module.css";
import Product from "@/components/module/product/Product";

const Latest = ({ products }) => {
  return (
    <div className={styles.container}>

      <main 
        data-aos="fade-up" 
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-7 py-5"
      >
        {products.map((product) => (
          <Product key={product._id} {...product} />
        ))}
      </main>
    </div>
  );
};

export default Latest;
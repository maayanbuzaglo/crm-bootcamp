import { NavLink } from "react-router-dom";
import styles from "./ProductsTypes.module.scss";

const ProductsTypes = () => {
  return (
    <div className={styles.productsType}>
      <div className={styles.types}>
        <NavLink to="/products?productType=Breakfast">Breakfast</NavLink>
        <NavLink to="/products?productType=Brunch">Brunch</NavLink>
        <NavLink to="/products?productType=Dinner">Dinner</NavLink>
      </div>
    </div>
  );
};

export default ProductsTypes;

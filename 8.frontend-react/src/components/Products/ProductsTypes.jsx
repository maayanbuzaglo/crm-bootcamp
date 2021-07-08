import { NavLink } from "react-router-dom";
import "./ProductsTypes.scss";

const ProductsTypes = () => {
  return (
    <div className="products-type">
      <div className="types">
        <NavLink to="/products?productType=Breakfast" id="type-link">
          Breakfast
        </NavLink>
        <NavLink to="/products?productType=Brunch" id="type-link">
          Brunch
        </NavLink>
        <NavLink to="/products?productType=Dinner" id="type-link">
          Dinner
        </NavLink>
      </div>
    </div>
  );
};

export default ProductsTypes;

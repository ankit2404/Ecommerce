import React from "react";
import { Link } from "react-router-dom";
import classes from "../styles/home.module.css";
import Rating from "./Rating";
const Product = ({ product }) => {
  return (
    <div className={`${classes["single_card"]}`}>
      <div className={`${classes["box"]}`}>
        <div className={`${classes["img-box"]}`}>
          <Link to={`/product/${product._id}`}>
            <img
              src={product.image}
              alt={product.name}
              style={{ borderRadius: "10px" }}
            />
          </Link>
        </div>
        <Link to={`/product/${product._id}`} id="prod_name">
          <h2 className={`${classes["review_header"]}`}>{product.name}</h2>
        </Link>
        <div className={`${classes["detail-box"]}`}>
          <Rating
            value={product.rating}
            text={`${product.numReviwes} reviews`}
          />
          <p className={`${classes["price-para"]}`}>
            Price:
            <span>${product.price}</span>
          </p>
        </div>
        <div className={`${classes["new"]}`}>
          <span>Featured</span>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Product;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstant";
import classes from "../styles/productPage.module.css";

function CartScreen({ match, history }) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      dispatch(listProductDetails(match.params.id));
    } else {
      console.log(product);
    }
  }, [dispatch, match, product._id, product.reviews, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };
  return (
    <>
      <Meta title={product.name} />
      <main className={`${classes["container"]} `}>
        <div className={`${classes["left-column"]} `}>
          <img
            data-image="red"
            className={`${classes["active"]} `}
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className={`${classes["right-column"]}`}>
          <div className={`${classes["product-description"]} `}>
            <span>{product.category}</span>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>

          <div className={`${classes["product-configuration"]}`}>
            <div className={`${classes["product-color"]}`}>
              <span>Rating</span>
              <Rating
                value={product.rating}
                text={`${product.numReviwes} reviews`}
              />
            </div>

            <div className={`${classes["cable-config"]}`}>
              <span>
                {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
              </span>
            </div>
          </div>

          <div className={`${classes["product-price"]}`}>
            <span>${product.price}</span>
            <button
              disabled={product.countInStock === 0}
              className={`${classes["cart-btn"]}`}
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default CartScreen;

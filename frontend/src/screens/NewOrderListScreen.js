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
  // const [qty, setQty] = useState(1);
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
    }
  }, [dispatch, match, product._id, product.reviews, successProductReview]);

  const addToCartHandler = () => {
    const qty = 1;
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
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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

              <div className={`${classes["product-configuration"]} `}>
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
          {product.reviews.length === 0 && <Message>No Reviews</Message>}
          <h3 className={`${classes["review_header"]}`}>Reviews</h3>
          <div className={`${classes["review_box"]}`}>
            {product.reviews.map((review) => (
              <div className={`${classes["item"]}`} key={review._id}>
                <div className={`${classes["box"]}`}>
                  <div className={`${classes["img-box"]}`}>
                    <img
                      src="https://cdn.statically.io/img/www.celebrities-contact.com//wp-content/uploads/2019/07/mackenzie-ziegler-email-phone-contact-732.jpg"
                      alt=""
                    />
                  </div>
                  <div className={`${classes["detail-box"]}`}>
                    <div className={`${classes["client_info"]}`}>
                      <div className={`${classes["client_name"]}`}>
                        <h5 style={{ color: "white" }}>{review.name}</h5>
                      </div>
                      <Rating value={review.rating} />
                    </div>
                    <p>{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default CartScreen;

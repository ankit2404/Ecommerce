import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import classes from "../styles/placeorder.module.css";
import { toast } from "react-toastify";
import Meta from "../components/Meta";

const OrderListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  // console.log(order);
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || order._id !== orderId || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order, userInfo, history]);

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong");
    }
  }, [error]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };
  return loading ? (
    <Loader />
  ) : (
    <>
      <Meta title="AngelShop" />
      <div className={`${classes["myordercontainer"]}`}>
        <article className={`${classes["leaderboard"]}`}>
          <h2 className={`${classes["placeorder_header"]}`}>Shipping:</h2>
          <p>
            <span
              style={{
                fontWeight: "600",
                fontSize: "18px",
                color: "black",
                marginRight: "8px",
              }}
            >
              Name:
            </span>
            {order.user.name}
          </p>
          <p>
            <span
              style={{
                fontWeight: "600",
                fontSize: "18px",
                color: "black",
                marginRight: "8px",
              }}
            >
              Email:
            </span>
            <a style={{ color: "#808080" }} href={`mailto:${order.user.email}`}>
              {order.user.email}
            </a>
          </p>
          <p>
            <span
              style={{
                fontWeight: "600",
                fontSize: "18px",
                color: "black",
                marginRight: "8px",
              }}
            >
              Address:
            </span>
            {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>
          <p>
            <span
              style={{
                fontWeight: "600",
                fontSize: "18px",
                color: "black",
                marginRight: "8px",
              }}
            >
              Delievery Status:
            </span>
            {order.isDelievered ? (
              <span style={{ color: "green" }}>
                Delivered on {order.delieveredAt.substring(0, 10)}
              </span>
            ) : (
              <span style={{ color: "red" }}>Not Delivered</span>
            )}
          </p>
          <h2 className={`${classes["placeorder_header"]}`}>Payment Method:</h2>
          <p>
            <span
              style={{ fontWeight: "600", fontSize: "18px", color: "black" }}
            >
              Method:{" "}
            </span>
            Paypal
          </p>
          <p>
            <span
              style={{
                fontWeight: "600",
                fontSize: "18px",
                color: "black",
                marginRight: "8px",
              }}
            >
              Delievery Status:
            </span>
            {order.isPaid ? (
              <span style={{ color: "green" }}>
                Paid on {order.paidAt.substring(0, 10)}
              </span>
            ) : (
              <span style={{ color: "red" }}>Not Paid</span>
            )}
          </p>
          <header>
            <h1 className={`${classes["leaderboard__title"]}`}>
              <span className={`${classes["leaderboard__title--top"]}`}>
                AngelShop
              </span>
              <span className={`${classes["leaderboard__title--bottom"]}`}>
                Order Items
              </span>
            </h1>
          </header>
          {order.orderItems.length === 0 ? (
            <h2 className={`${classes["placeorder_header"]}`}>
              Your Order is empty
            </h2>
          ) : (
            <div className={`${classes["leaderboard__profiles"]} `}>
              <article
                className={`${classes["leaderboard__profile"]}  ${classes["div-flex"]} ${classes["front"]}`}
              >
                <span
                  className={`${classes["leaderboard__name"]} ${classes["user__name"]}`}
                  style={{ width: "15%" }}
                >
                  Image
                </span>
                <span
                  className={`${classes["leaderboard__name"]} ${classes["user__name"]}`}
                  style={{ width: "50%" }}
                >
                  Product Name
                </span>
                <span
                  className={`${classes["leaderboard__name"]} ${classes["user__email"]}`}
                  style={{ width: "10%" }}
                >
                  Total
                </span>
              </article>
              {order.orderItems.length === 0 ? "Your order is empty" : ""}
              {order.orderItems.map((item) => (
                <article
                  key={item.product}
                  className={`${classes["leaderboard__profile"]} ${classes["for-user"]} `}
                >
                  <img
                    src={item.image}
                    alt="Product"
                    className={`${classes["leaderboard__picture"]} ${classes["picture"]}`}
                  />
                  <span
                    className={`${classes["leaderboard__name"]} ${classes["user__name"]}`}
                  >
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </span>
                  <span
                    className={`${classes["leaderboard__name"]} ${classes["user__email"]}`}
                  >
                    {item.qty} x ${item.price} = ${item.qty * item.price}
                  </span>
                </article>
              ))}
            </div>
          )}
        </article>
        <article className={`${classes["nextBox"]}`}>
          <article className={`${classes["leaderboard__profile__new"]}`}>
            <div className={`${classes["checkout__box"]}`}>
              <h3 style={{ margin: "auto" }}>Order Summary</h3>
              <div className={`${classes["eachitem_div"]}`}>
                <div> Items Price:</div>
                <div>${order.itemsPrice}</div>
              </div>
              <div className={`${classes["eachitem_div"]}`}>
                <div> Shipping Price:</div>
                <div>${order.shippingPrice}</div>
              </div>
              <div className={`${classes["eachitem_div"]}`}>
                <div> Total Tax:</div>
                <div>${order.taxPrice}</div>
              </div>
              <div className={`${classes["eachitem_div"]}`}>
                <div> Total Price:</div>
                <div>${order.totalPrice}</div>
              </div>
              {!order.isPaid && !userInfo.isAdmin && (
                <div style={{ width: "100%" }}>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </div>
              )}
              {!order.isPaid && userInfo.isAdmin && (
                <h3 style={{ margin: "auto" }}>Payment Pending</h3>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelievered && (
                  <button
                    className={`${classes["btn"]}  ${classes["btn-primary"]}`}
                    type="button"
                    onClick={deliverHandler}
                    style={{ margin: "auto" }}
                  >
                    Mark As Delivered
                  </button>
                )}
            </div>
          </article>
        </article>
      </div>
    </>
  );
};

export default OrderListScreen;

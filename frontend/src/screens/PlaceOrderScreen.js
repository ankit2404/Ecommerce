import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
// import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";
import classes from "../styles/placeorder.module.css";
import { toast } from "react-toastify";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  if (!cart.shippingAddress.address) {
    history.push("/shipping");
  } else if (!cart.paymentMethod) {
    history.push("/payment");
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      // dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [history, success]);

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong");
    }
  }, [error]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className={`${classes["myordercontainer"]}`}>
        <article className={`${classes["leaderboard"]}`}>
          <h2 className={`${classes["placeorder_header"]}`}>Shipping:</h2>
          <p>
            <span
              style={{ fontWeight: "600", fontSize: "18px", color: "black" }}
            >
              Address:{" "}
            </span>
            {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
            {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
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
          {cart.cartItems.length === 0 ? (
            <h2 className={`${classes["placeorder_header"]}`}>
              Your cart is empty
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
              {cart.cartItems.length === 0 ? "No Product In Cart" : ""}
              {cart.cartItems.map((item) => (
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
                <div>
                  $
                  {cart.cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </div>
              </div>
              <div className={`${classes["eachitem_div"]}`}>
                <div> Shipping Price:</div>
                <div>${cart.shippingPrice}</div>
              </div>
              <div className={`${classes["eachitem_div"]}`}>
                <div> Total Tax:</div>
                <div>${cart.taxPrice}</div>
              </div>
              <div className={`${classes["eachitem_div"]}`}>
                <div> Total Price:</div>
                <div>${cart.totalPrice}</div>
              </div>
              {/* {error && <Message variant="danger">{error}</Message>} */}
              <button
                className={`${classes["btn"]}  ${classes["btn-primary"]}`}
                type="button"
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
                style={{ margin: "auto" }}
              >
                Place Order
              </button>
            </div>
          </article>
        </article>
      </div>
    </>
  );
};

export default PlaceOrderScreen;

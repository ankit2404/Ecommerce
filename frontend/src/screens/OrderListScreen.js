import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";
import classes from "../styles/myOrder.module.css";
import Meta from "../components/Meta";
import { toast } from "react-toastify";

function OrderListScreen({ history }) {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong");
    }
  }, [error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className={`${classes["myordercontainer"]}`}>
          <Meta title="All Orders" />
          <article className={`${classes["leaderboard"]}`}>
            <header>
              <h1 className={`${classes["leaderboard__title"]}`}>
                <span
                  className={`${classes["leaderboard__title--top"]}`}
                  style={{ color: "white" }}
                >
                  AngelShop
                </span>
                <span
                  className={`${classes["leaderboard__title--bottom"]}`}
                  style={{ color: "white" }}
                >
                  Customer Orders
                </span>
              </h1>
            </header>

            <div className={`${classes["leaderboard__profiles"]} `}>
              <article
                className={`${classes["leaderboard__profile"]}  ${classes["div-flex"]} ${classes["front"]}`}
              >
                <span className={`${classes["leaderboard__name"]}`}>Name</span>
                <span className={`${classes["leaderboard__name"]} `}>
                  Order Date
                </span>
                <span className={`${classes["leaderboard__name"]}`}>Price</span>
                <span className={`${classes["leaderboard__name"]}`}>
                  Delivered
                </span>
                <span className={`${classes["leaderboard__name"]}`}>
                  Details
                </span>
              </article>
              {orders.length === 0 ? "No Orders" : ""}
              {orders.map((order) => (
                <article
                  key={order._id}
                  className={`${classes["leaderboard__profile"]} ${classes["div-flex"]}`}
                >
                  <span className={`${classes["leaderboard__name"]}`}>
                    {order.user && order.user.name}
                  </span>
                  <span className={`${classes["leaderboard__name"]}`}>
                    {order.createdAt.substring(0, 10)}
                  </span>
                  <span className={`${classes["leaderboard__name"]}`}>
                    ${order.totalPrice}
                  </span>
                  <span className={`${classes["leaderboard__name"]}`}>
                    {order.isDelievered ? (
                      order.delieveredAt.substring(0, 10)
                    ) : (
                      // <i className="fas fa-times" style={{ color: "red" }}></i>
                      <p
                        className={`${classes["leaderboard__name"]}`}
                        style={{ color: "red", marginBottom: "0px" }}
                      >
                        Not Delivered
                      </p>
                    )}
                  </span>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "15px",
                    }}
                  >
                    <Link to={`/order/${order._id}`}>
                      <button
                        className={`${classes["btn"]} ${classes[""]} ${classes["btn-primary"]}`}
                        type="submit"
                        style={{ paddingLeft: "10%", paddingRight: "10%" }}
                      >
                        Details
                      </button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </article>
        </div>
      )}
    </>
  );
}

export default OrderListScreen;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails } from "../actions/userAction";
import { listMyOrders } from "../actions/orderActions";
import classes from "../styles/myOrder.module.css";
function MyOrderList({ location, history }) {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch]);
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      }
    }
  }, [dispatch, history, userInfo, user, orders]);

  return (
    <>
      {loadingOrders ? (
        <Loader />
      ) : errorOrders ? (
        <Message variant="danger">{errorOrders}</Message>
      ) : (
        <div className={`${classes["myordercontainer"]}`}>
          <article className={`${classes["leaderboard"]}`}>
            <header>
              <h1 className={`${classes["leaderboard__title"]}`}>
                <span className={`${classes["leaderboard__title--top"]}`}>
                  Myshop
                </span>
                <span className={`${classes["leaderboard__title--bottom"]}`}>
                  My Orders
                </span>
              </h1>
            </header>

            <div className={`${classes["leaderboard__profiles"]} `}>
              <article
                className={`${classes["leaderboard__profile"]}  ${classes["div-flex"]} ${classes["front"]}`}
              >
                <span className={`${classes["leaderboard__name"]}`}>
                  Product
                </span>
                <span
                  className={`${classes["leaderboard__name"]} ${classes["specific"]}`}
                >
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
              {!orders?.length && "No Orders"}
              {orders?.map((order) => (
                <article
                  key={order._id}
                  className={`${classes["leaderboard__profile"]} ${classes["div-flex"]}`}
                >
                  <img
                    src={order.orderItems[0].image}
                    alt="Elizabeth Holmes"
                    className={`${classes["leaderboard__picture"]}`}
                  />
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

export default MyOrderList;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userAction";
import classes from "../styles/myOrder.module.css";

function OrderListScreen({ history }) {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className={`${classes["myordercontainer"]}`}>
          <article className={`${classes["leaderboard"]}`}>
            <header>
              <h1 className={`${classes["leaderboard__title"]}`}>
                <span className={`${classes["leaderboard__title--top"]}`}>
                  Myshop
                </span>
                <span className={`${classes["leaderboard__title--bottom"]}`}>
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
              {users.length === 0 ? "No Orders" : ""}
              {users.map((user) => (
                <article
                  key={user._id}
                  className={`${classes["leaderboard__profile"]} ${classes["for-user"]} `}
                >
                  <span
                    className={`${classes["leaderboard__name"]} ${classes["user__name"]}`}
                  >
                    {user.name}
                  </span>
                  <span
                    className={`${classes["leaderboard__name"]} ${classes["user__email"]}`}
                  >
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </span>
                  <span
                    className={`${classes["leaderboard__name"]} ${classes["user__admin"]}`}
                  >
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </span>
                  {/* <span className={`${classes["leaderboard__name"]}`}>
                    {user.isDelievered ? (
                      user.delieveredAt.substring(0, 10)
                    ) : (
                      
                      <p
                        className={`${classes["leaderboard__name"]}`}
                        style={{ color: "red", marginBottom: "0px" }}
                      >
                        Not Delivered
                      </p>
                    )}
                  </span> */}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "15px",
                    }}
                  >
                    <Link to={`/admin/user/${user._id}/edit`}></Link>
                    <button
                      className={`${classes["btn"]} ${classes[""]} ${classes["btn-primary"]}`}
                      type="submit"
                      style={{ paddingLeft: "10%", paddingRight: "10%" }}
                      onClick={() => deleteHandler(user._id)}
                    >
                      Delete
                    </button>
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

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userAction";
import classes from "../styles/userList.module.css";

function UserListScreen({ history }) {
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
                  All Users
                </span>
              </h1>
            </header>

            <div className={`${classes["leaderboard__profiles"]} `}>
              <article
                className={`${classes["leaderboard__profile"]}  ${classes["div-flex"]} ${classes["front"]}`}
              >
                <span
                  className={`${classes["leaderboard__name"]} ${classes["user__name"]}`}
                  style={{ width: "20%" }}
                >
                  Name
                </span>
                <span
                  className={`${classes["leaderboard__name"]} ${classes["user__email"]}`}
                  style={{ width: "20%" }}
                >
                  Email ID
                </span>
                <span
                  className={`${classes["leaderboard__name"]} ${classes["user__admin"]}`}
                  style={{ width: "20%" }}
                >
                  Admin/User
                </span>
                <span
                  className={`${classes["leaderboard__name"]} ${classes["user__button_edit"]}`}
                  style={{ paddingLeft: "20px" }}
                >
                  Edit
                </span>
                <span
                  className={`${classes["leaderboard__name"]} ${classes["user__button"]}`}
                  style={{ paddingLeft: "6%" }}
                >
                  Delete
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
                      <p style={{ color: "green" }}>Admin</p>
                    ) : (
                      <p style={{ color: "red" }}>User</p>
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
                  <div className={`${classes["user__button_edit"]}`}>
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <button
                        className={`${classes["btn"]}  ${classes["btn-primary"]}`}
                        type="submit"
                        // style={{ paddingLeft: "10%", paddingRight: "10%" }}
                      >
                        Edit
                      </button>
                    </Link>
                  </div>
                  <div className={`${classes["user__button"]}`}>
                    <button
                      className={`${classes["btn"]}  ${classes["btn-primary"]}`}
                      type="submit"
                      // style={{ paddingLeft: "10%", paddingRight: "10%" }}
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

export default UserListScreen;

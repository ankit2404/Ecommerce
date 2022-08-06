import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUserPassword } from "../actions/userAction";
import Loader from "../components/Loader";
import classes from "../styles/login.module.css";
import Meta from "../components/Meta";

const ChangePassword = ({ location, history }) => {
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/myprofile");
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.info("Passwords do not match");
    } else {
      dispatch(updateUserPassword({ password, newPassword }));
    }
  };

  return (
    <div>
      <Meta title="Change Password" />
      {loading && <Loader />}
      <section className={classes["ftco-section"]}>
        <div className={classes.container}>
          <div
            className={`${classes.row} ${classes["justify-content-center"]}`}
          >
            <div className={`${classes["col-md-12"]} ${classes["col-lg-10"]}`}>
              <div className={`${classes.wrap} ${classes["d-md-flex"]}`}>
                <div
                  className={`${classes["text-wrap"]} ${classes["p-4"]} ${classes["p-lg-5"]} ${classes["text-center"]} ${classes["d-flex"]} ${classes["align-items-center"]} ${classes["order-md-last"]}`}
                >
                  <div className={`${classes["text"]} ${classes["w-100"]}`}>
                    <p
                      style={{
                        color: "#ffffff",
                        fontSize: "1.8rem",
                        fontWeight: "bold",
                      }}
                    >
                      Welcome to AngelShop
                    </p>
                    <p>Back to your profile</p>
                    <Link
                      to={"/myprofile"}
                      className={`${classes["btn"]} ${classes["btn-white"]} ${classes["btn-outline-white"]}`}
                    >
                      Go Back
                    </Link>
                  </div>
                </div>
                <div
                  className={`${classes["login-wrap"]} ${classes["p-4"]} ${classes["p-lg-5"]} `}
                >
                  <div className={`${classes["d-flex"]}`}>
                    <div>
                      <p style={{ fontSize: "1.5rem" }}>Change Password</p>
                    </div>
                  </div>
                  <Form onSubmit={submitHandler}>
                    <div
                      className={`${classes["form-group"]} ${classes["mb-3"]}`}
                    >
                      <label className={classes.label} htmlFor="password">
                        Password
                      </label>
                      <input
                        type="password"
                        className={`${classes["form-control"]}`}
                        placeholder="Enter Old Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div
                      className={`${classes["form-group"]} ${classes["mb-3"]}`}
                    >
                      <label className={classes.label} htmlFor="password">
                        New Password
                      </label>
                      <input
                        type="password"
                        className={`${classes["form-control"]}`}
                        placeholder="Enter New Password"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div
                      className={`${classes["form-group"]} ${classes["mb-3"]}`}
                    >
                      <label className={classes.label} htmlFor="password">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className={`${classes["form-control"]}`}
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className={`${classes["form-group"]}`}>
                      <button
                        type="submit"
                        className={`${classes["btn"]} ${classes["form-control"]} ${classes["btn-primary"]} ${classes["submit"]} ${classes["px-3"]}`}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChangePassword;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userAction";
// import "../styles/login.css";
import classes from "../styles/login.module.css";
const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email));
  };

  return (
    <div>
      {error && <Message variant="danger">{error}</Message>}
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
                    <p>Don't have an account?</p>
                    <Link
                      to={
                        redirect
                          ? `/register?redirect=${redirect}`
                          : "/register"
                      }
                      className={`${classes["btn"]} ${classes["btn-white"]} ${classes["btn-outline-white"]}`}
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
                <div
                  className={`${classes["login-wrap"]} ${classes["p-4"]} ${classes["p-lg-5"]} `}
                >
                  <div className={`${classes["d-flex"]}`}>
                    <div className={`${classes["w-100"]}`}>
                      <p
                        style={{ fontSize: "1rem" }}
                        className={`${classes["mb-4"]}`}
                      >
                        Forget Password
                      </p>
                    </div>
                    <div className={`${classes["w-100"]}`}>
                      <p
                        className={`${classes["d-flex"]} ${classes["social-media"]} ${classes["justify-content-end"]}`}
                      ></p>
                    </div>
                  </div>
                  <Form onSubmit={submitHandler}>
                    <div
                      className={`${classes["form-group"]} ${classes["mb-3"]}`}
                    >
                      <label className={classes.label} htmlFor="name">
                        Email
                      </label>
                      <input
                        type="email"
                        className={`${classes["form-control"]}`}
                        placeholder="Enter Email Address"
                        name="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className={`${classes["form-group"]}`}>
                      <button
                        type="submit"
                        className={`${classes["btn"]} ${classes["form-control"]} ${classes["btn-primary"]} ${classes["submit"]} ${classes["px-3"]}`}
                      >
                        Send Email
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

export default LoginScreen;

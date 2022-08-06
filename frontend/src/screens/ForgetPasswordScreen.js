import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import classes from "../styles/login.module.css";
import Meta from "../components/Meta";
const ForgetPasswordScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [mess, setMess] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/forgot-pass",
      { email },
      config
    );
    console.log({ data });
    if (data === "Email sent successfully") {
      setEmail("");
      toast.success("Email sent successfully");
    }
    setMess(data);
  };

  return (
    <div>
      <Meta title="Welcome To AngelShop" />
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
                      to="/register"
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
                  <p>{mess}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgetPasswordScreen;

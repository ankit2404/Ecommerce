import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import axios from "axios";
import classes from "../styles/login.module.css";
const ChangeForgetPassword = ({ match, history }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authkey, setAuthKey] = useState("");
  const [userid, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAuthKey(match.params.authkey);
    setUserId(match.params.userid);
  }, [match.params.authkey, match.params.userid]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/forgot-password/new-password",
        { password, userid, authkey },
        config
      );

      if (data === "Password changed Successfully") {
        toast.success("Password changed successfully");
        history.push("/login");
      } else {
        toast.error("Something went wrong");
        setLoading(false);
      }
    } else {
      toast.error("Enter password again");
      setConfirmPassword("");
      setPassword("");
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div>
        <section className={classes["ftco-section"]}>
          <div className={classes.container}>
            <div
              className={`${classes.row} ${classes["justify-content-center"]}`}
            >
              <div
                className={`${classes["col-md-12"]} ${classes["col-lg-10"]}`}
              >
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
                          Change Password
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
                          Enter Password
                        </label>
                        <input
                          type="password"
                          className={`${classes["form-control"]}`}
                          placeholder="Enter Password"
                          name="username"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div
                        className={`${classes["form-group"]} ${classes["mb-3"]}`}
                      >
                        <label className={classes.label} htmlFor="name">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className={`${classes["form-control"]}`}
                          placeholder="Confirm Password"
                          name="username"
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
    </>
  );
};

export default ChangeForgetPassword;

import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUser } from "../actions/userAction";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import classes from "../styles/form.module.css";
import { toast } from "react-toastify";

function UserEditScreen({ match, history }) {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  // console.log(userDetails)

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };
  useEffect(() => {
    if (errorUpdate) {
      toast.error("Something went wrong");
    }
  }, [errorUpdate]);

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong");
    }
  }, [error]);
  return (
    <>
      <div className={`${classes["main_container"]}`}>
        {loadingUpdate && <Loader />}
        {loading ? (
          <Loader />
        ) : (
          <div className={`${classes["review_container"]}`}>
            <div className={`${classes["content"]}`}>
              <h2 className={`${classes["review_header"]}`}>Edit User</h2>
              <div className={`${classes["user-details"]}`}>
                <Form onSubmit={submitHandler}>
                  <Form.Group
                    className={`${classes["input-box"]}`}
                    controlId="name"
                  >
                    <span className={`${classes["details"]}`}>Name</span>
                    <input
                      type="text"
                      placeholder="Enter Name"
                      disabled={true}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className={`${classes["input-box"]}`}
                    controlId="email"
                  >
                    <span className={`${classes["details"]}`}>Email</span>
                    <input
                      disabled={true}
                      type="email"
                      placeholder="Enter Name"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="isadmin">
                    <Form.Check
                      type="checkbox"
                      label="Make admin"
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    ></Form.Check>
                  </Form.Group>
                  <button className={`${classes["cart-btn"]}`} type="submit">
                    Update
                  </button>
                </Form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UserEditScreen;

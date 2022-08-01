import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";
import classes from "../styles/payment.module.css";

function PaymentScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <>
      <div className={`${classes["main_container"]}`}>
        <CheckoutSteps step1 step2 step3 />
        <div className={`${classes["review_container"]}`}>
          <div className={`${classes["content"]}`}>
            <h2 className={`${classes["review_header"]}`}>Payment Method</h2>
            <div className={`${classes["user-details"]}`}>
              <Form onSubmit={submitHandler}>
                <Form.Group
                  className={`${classes["input-box"]}`}
                  controlId="address"
                >
                  <span className={`${classes["details"]}`}>Select Method</span>
                  <Form.Check
                    type="radio"
                    label="PayPal or Credit Card"
                    id="PayPal"
                    name="paymentMethod"
                    value="PayPal"
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                </Form.Group>

                <button className={`${classes["cart-btn"]}`} type="submit">
                  Continue
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentScreen;

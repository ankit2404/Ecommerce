import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";
import classes from "../styles/productEdit.module.css";

function ShippingScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };
  return (
    <>
      <div className={`${classes["main_container"]}`}>
        <CheckoutSteps step1 step2 />
        <div className={`${classes["review_container"]}`}>
          <div className={`${classes["content"]}`}>
            <h2 className={`${classes["review_header"]}`}>Edit Product</h2>
            <div className={`${classes["user-details"]}`}>
              <Form onSubmit={submitHandler}>
                <Form.Group
                  className={`${classes["input-box"]}`}
                  controlId="address"
                >
                  <span className={`${classes["details"]}`}>Address</span>
                  <input
                    type="text"
                    placeholder="Enter address"
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>

                <Form.Group
                  className={`${classes["input-box"]}`}
                  controlId="city"
                >
                  <span className={`${classes["details"]}`}>City</span>
                  <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Form.Group>

                <Form.Group
                  className={`${classes["input-box"]}`}
                  controlId="postalCode"
                >
                  <span className={`${classes["details"]}`}>Postal Code</span>
                  <input
                    type="Number"
                    placeholder="Enter postal code"
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </Form.Group>

                <Form.Group
                  className={`${classes["input-box"]}`}
                  controlId="country"
                >
                  <span className={`${classes["details"]}`}>Country</span>
                  <input
                    type="text"
                    placeholder="Enter country"
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Form.Group>

                <button className={`${classes["cart-btn"]}`} type="submit">
                  Update
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShippingScreen;

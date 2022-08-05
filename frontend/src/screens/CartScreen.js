import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";
import classes from "../styles/cart.module.css";

function CartScreen({ match, location, history }) {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <>
      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty <Link to="/">Go Back</Link>
        </Message>
      ) : (
        <div className={`${classes["myordercontainer"]}`}>
          <article className={`${classes["leaderboard"]}`}>
            <header>
              <h1 className={`${classes["leaderboard__title"]}`}>
                <span className={`${classes["leaderboard__title--top"]}`}>
                  Myshop
                </span>
                <span className={`${classes["leaderboard__title--bottom"]}`}>
                  Shopping Cart
                </span>
              </h1>
            </header>

            <div className={`${classes["leaderboard__profiles"]} `}>
              <article
                className={`${classes["leaderboard__profile"]}  ${classes["div-flex"]} ${classes["front"]}`}
              >
                <span
                  className={`${classes["leaderboard__name"]} ${classes["user__name"]}`}
                  style={{ width: "7%" }}
                >
                  Image
                </span>
                <span
                  className={`${classes["leaderboard__name"]} ${classes["user__name"]}`}
                  style={{ width: "36%" }}
                >
                  Product Name
                </span>
                <span
                  className={`${classes["leaderboard__name"]} ${classes["user__email"]}`}
                  style={{ width: "10%" }}
                >
                  Price
                </span>
                <span
                  className={`${classes["leaderboard__name"]} ${classes["user__button_edit"]}`}
                  style={{ paddingLeft: "20px" }}
                >
                  Quantity
                </span>
                <span
                  className={`${classes["leaderboard__name"]} ${classes["user__button"]}`}
                  style={{ paddingLeft: "8%" }}
                >
                  Remove
                </span>
              </article>
              {cartItems.length === 0 ? "No Product In Cart" : ""}
              {cartItems.map((item) => (
                <article
                  key={item.product}
                  className={`${classes["leaderboard__profile"]} ${classes["for-user"]} `}
                >
                  <img
                    src={item.image}
                    alt="Product"
                    className={`${classes["leaderboard__picture"]} ${classes["picture"]}`}
                  />
                  <span
                    className={`${classes["leaderboard__name"]} ${classes["user__name"]}`}
                  >
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </span>
                  <span
                    className={`${classes["leaderboard__name"]} ${classes["user__email"]}`}
                  >
                    ${item.price}
                  </span>
                  <div className={`${classes["user__button_edit"]}`}>
                    <select
                      className={`${classes["select_items"]}`}
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={`${classes["user__button"]}`}>
                    <button
                      className={`${classes["btn"]}  ${classes["btn-primary"]}`}
                      type="submit"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </article>
          <article className={`${classes["nextBox"]}`}>
            <article className={`${classes["leaderboard__profile__new"]}`}>
              <div className={`${classes["checkout__box"]}`}>
                <h3 style={{ marginLeft: "20px" }}>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h3>
                <p>
                  Total $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </p>
                <button
                  className={`${classes["btn"]}  ${classes["btn-primary"]}`}
                  type="button"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>
              </div>
            </article>
          </article>
        </div>
      )}
    </>
  );
}

export default CartScreen;
